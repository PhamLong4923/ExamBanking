import { EditOutlined } from '@ant-design/icons';
import { Button, Modal, Select } from 'antd';
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { IoIosArrowDropdown, IoIosArrowDropdownCircle } from "react-icons/io";
import { getLocalStorageItem } from '../../services/LocalStorage';
import MyEditor from './MyEditor';
import './Style/question.css';
import ConvertTextTagToHTML from './convertTextTagToHTML';

const { Option } = Select;

const SystemQuestion = ({
    question,
    handleEditQuestion,
    deleteQuestion,
    handleEditAnswer,
    deleteAnswer,
    addAnswer,
    handleSaveEdit,
    editingQuestionId,
    modalIsOpen,
    handleEditorDataChange,
    setModalIsOpen,
    handleQuestionTypeChange,
    handleEditSolution,
    isAddQuestion,
    handleQuestionModeChange,
    handleSelectQuestion,
    isSelected,
}) => {

    const bankType = getLocalStorageItem('bankType') || '-1';

    const [solutionVisible, setSolutionVisible] = useState(false);

    const toggleSolution = () => {
        setSolutionVisible(!solutionVisible);
    };

    return (
        <div onClick={() => handleSelectQuestion(question.quesid)}>
            {editingQuestionId === question.quesid && (
                <Modal
                    title="Chỉnh sửa câu hỏi"
                    open={modalIsOpen}
                    onCancel={() => setModalIsOpen(false)}
                    footer={null}
                    width={1000}
                >
                    <div className='question-select-option'>
                        {isAddQuestion === true && (
                            <Select
                                className='cursor-icon'
                                value={"" + question.type}
                                onChange={(value) => handleQuestionTypeChange(question.quesid, value)}
                            >
                                <Option value="1">Trắc nghiệm</Option>
                                <Option value="2">Tự luận</Option>
                            </Select>
                        )}
                        <Select
                            className='cursor-icon'
                            value={"" + question.modeid}
                            onChange={(value) => handleQuestionModeChange(question.quesid, value)}
                        >
                            {question.type === "1" ? (
                                <>
                                    <Option value="1">Nhận biết</Option>
                                    <Option value="2">Thông hiểu</Option>
                                    <Option value="3">Vận dụng</Option>
                                    <Option value="4">Vận dụng cao</Option>
                                </>
                            ) : (
                                <>
                                    <Option value="5">Dễ</Option>
                                    <Option value="6">Thường</Option>
                                    <Option value="7">Khó</Option>
                                    <Option value="8">Anh hùng</Option>
                                </>
                            )}
                        </Select>
                    </div>
                    <div className='editquestion-head'>
                        <div className='editquestion-title'>
                            <label htmlFor={`editTitle_${question.quesid}`}>Đề:</label>
                            <div className='myeditor-ck'>
                                <MyEditor type="title" quesid={question.quesid} ansid="" value={question.quescontent} onChange={handleEditorDataChange} />
                            </div>
                        </div>
                    </div>
                    <table className="edit-answers">
                        {question.type === "1" && (
                            <>
                                <thead>
                                    <tr>
                                        <th>Đáp án</th>
                                        <th>Nội dung đáp án</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {question.answers.map((answer, index2) => (
                                        <tr key={answer.quesid}>
                                            <th>Đáp án {index2 + 1}</th>
                                            <td>
                                                <div className='editanswer-each'>
                                                    <div className='myeditor-ck'>
                                                        <MyEditor type="answer" quesid={question.quesid} ansid={index2} value={answer.anscontent} onChange={handleEditorDataChange} />
                                                    </div>
                                                    <i className="deleteanswer-icon" onClick={() => deleteAnswer(question.quesid, answer.ansid)}><FaTrash className='cursor-icon'></FaTrash></i>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </>
                        )}
                        <tr className='edit-solution'>
                            <th>Hướng dẫn giải</th>
                            <td>
                                <div className='myeditor-ck'>
                                    <MyEditor type="solution" quesid={question.quesid} ansid="" value={question.solution} onChange={handleEditorDataChange} />
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div className='addquestion-savebutton'>
                        {question.type === '1' && (
                            <Button onClick={() => addAnswer(question.quesid)}>Thêm đáp án</Button>
                        )}
                        <Button type="primary" onClick={() => handleSaveEdit()}>
                            Lưu
                        </Button>
                    </div>
                </Modal>
            )}

            <table className={`addquestion-table ${isSelected ? 'selected' : ''}`}>
                <thead>
                    <td className="row-head">
                        <span className="left-row">Câu hỏi {question.quesid} - {question.type === '1' ? 'Trắc nghiệm' : 'Tự luận'}</span>
                        {bankType === '0' ? (<></>) : (<span className="right-row">
                            <Button title="Chỉnh sửa" onClick={() => handleEditQuestion(question.quesid)} icon={<EditOutlined />}>Chỉnh sửa</Button>
                        </span>)}
                    </td>
                </thead>
                <tr>
                    <td className='ckeditor-result'>
                        <label htmlFor={question.quescontent}>Đề: </label>
                        <ConvertTextTagToHTML htmlContent={question.quescontent}></ConvertTextTagToHTML>
                    </td>
                </tr>
                <tr>
                    <td>
                        {question.answers.map((answer, answerIndex) => (
                            <div className='ckeditor-result' key={answer.ansid}>
                                <label htmlFor={`answer${answerIndex + 1}`}>Đáp án {answerIndex + 1}: </label>
                                <ConvertTextTagToHTML htmlContent={answer.anscontent} />
                            </div>
                        ))}
                    </td>
                </tr>
                <tr onClick={e => e.stopPropagation()}>
                    {solutionVisible ? (
                        <>
                            <IoIosArrowDropdownCircle className="cursor-icon" onClick={toggleSolution} />
                        </>
                    ) : (
                        <>
                            <IoIosArrowDropdown className="cursor-icon" onClick={toggleSolution} />
                        </>
                    )}
                </tr>
                <tr className={`solution ${solutionVisible ? '' : 'hidden'}`}>
                    <td>Hướng dẫn giải:
                        <ConvertTextTagToHTML htmlContent={question.solution} />
                    </td>
                </tr>
            </table>
            <br /><br />
        </div>
    );
};

export default SystemQuestion;