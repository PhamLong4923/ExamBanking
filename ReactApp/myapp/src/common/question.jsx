import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { IoIosArrowDropdown, IoIosArrowDropdownCircle } from "react-icons/io";
import { getLocalStorageItem } from '../services/LocalStorage';
import MyEditor from './MyEditor';
import './Style/question.css';
import ConvertTextTagToHTML from './convertTextTagToHTML';

const Question = ({
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
        <div onClick={() => handleSelectQuestion(question.id)}>
            <React.Fragment>
                {editingQuestionId === question.id && (
                    <div className="modal" style={{ display: modalIsOpen ? 'block' : 'none' }}>
                        <div className="modal-content">
                            <span className="close" onClick={() => setModalIsOpen(false)}>&times;</span>
                            <div className='editquestion-head'>
                                <div className='editquestion-title'>
                                    <label htmlFor={`editTitle_${question.id}`}>Đề:</label>
                                    <div className='myeditor-ck'>
                                        <MyEditor type="title" quesid={question.id} ansid="" value={question.title} onChange={handleEditorDataChange} />
                                    </div>
                                </div>
                                <div className='question-select-option'>
                                    {isAddQuestion === true && (
                                        <select className='cursor-icon' value={question.type} onChange={(e) => handleQuestionTypeChange(question.id, e.target.value)}>
                                            <option value='1'>
                                                Trắc nghiệm
                                            </option>
                                            <option value='2'>
                                                Tự luận
                                            </option>
                                        </select>
                                    )}
                                    {question.type == 1 ? (
                                        <select className='cursor-icon' defaultValue={question.mode} onChange={(e) => handleQuestionModeChange(question.id, e.target.value)}>
                                            <option value='1'>
                                                Nhận biết
                                            </option>
                                            <option value='2'>
                                                Thông hiểu
                                            </option>
                                            <option value='3'>
                                                Vận dụng
                                            </option>
                                            <option value='4'>
                                                Vận dụng cao
                                            </option>
                                        </select>
                                    ) : (
                                        <select className='cursor-icon' defaultValue={question.mode} onChange={(e) => handleQuestionModeChange(question.id, e.target.value)}>
                                            <option value='5'>
                                                Dễ
                                            </option>
                                            <option value='6'>
                                                Thường
                                            </option>
                                            <option value='7'>
                                                Khó
                                            </option>
                                            <option value='8'>
                                                Anh hùng
                                            </option>
                                        </select>
                                    )}
                                </div>
                            </div>
                            <table className="edit-answers">
                                {question.type == 1 && (
                                    <>
                                        <thead>
                                            <tr>
                                                <th>Đáp án</th>
                                                <th>Nội dung đáp án</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {question.answers.map((answer, index2) => (
                                                <tr key={answer.id}>
                                                    <th>Đáp án {index2 + 1}</th>
                                                    <td>
                                                        <div className='editanswer-each'>
                                                            <div className='myeditor-ck'>
                                                                <MyEditor type="answer" quesid={question.id} ansid={index2} value={answer.content} onChange={handleEditorDataChange} />
                                                            </div>
                                                            <i className="deleteanswer-icon" onClick={() => deleteAnswer(question.id, answer.id)}><FaTrash className='cursor-icon'></FaTrash></i>
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
                                            <MyEditor type="solution" quesid={question.id} ansid="" value={question.solution} onChange={handleEditorDataChange} />
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <div className='addquestion-savebutton'>
                                {question.type === '1' && (
                                    <button onClick={() => addAnswer(question.id)}>Thêm đáp án</button>
                                )}
                                <button onClick={() => handleSaveEdit()}>
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <table className={`addquestion-table ${isSelected ? 'selected' : ''}`}>
                    <thead>
                        <td className="row-head">
                            <span className="left-row">Câu hỏi {question.id} - {question.type === '1' ? 'Trắc nghiệm' : 'Tự luận'}</span>
                            {bankType === '0' ? (<></>) : (<span className="right-row">
                                <button title="Chỉnh sửa" onClick={() => handleEditQuestion(question.id)}><i className="fa-solid fa-pen-to-square"></i>Chỉnh sửa</button>
                            </span>)}

                        </td>
                    </thead>
                    <tr>
                        <td className='ckeditor-result'>
                            <label htmlFor={question.title}>Đề: </label>
                            <ConvertTextTagToHTML htmlContent={question.title}></ConvertTextTagToHTML>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {question.answers.map((answer, answerIndex) => (
                                <div className='ckeditor-result' key={answer.id}>
                                    <label htmlFor={`answer${answerIndex + 1}`}>Đáp án {answerIndex + 1}: </label>
                                    <ConvertTextTagToHTML htmlContent={answer.content} />
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
            </React.Fragment>
        </div>
    );
};

export default Question;
