import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { IoIosArrowDropdown, IoIosArrowDropdownCircle } from "react-icons/io";
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
    handleSelectSection,
    setModalIsOpen,
    handleQuestionTypeChange,
    handleEditSolution,
}) => {
    const [solutionVisible, setSolutionVisible] = useState(false);

    const toggleSolution = () => {
        setSolutionVisible(!solutionVisible);
    };

    return (
        <div onClick={() => handleSelectSection}>
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
                                <div>
                                    <select defaultValue={question.type} onChange={(e) => handleQuestionTypeChange(question.id, e.target.value)}>
                                        <option value='1'>
                                            Trắc nghiệm
                                        </option>
                                        <option value='2'>
                                            Tự luận
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <table className="edit-answers">
                                {question.type === '1' && (
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
                                                            <i className="deleteanswer-icon" onClick={() => deleteAnswer(question.id, answer.id)}><FaTrash></FaTrash></i>
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

                <table className="addquestion-table">
                    <thead>
                        <td className="row-head">
                            <span className="left-row"> <i className="fa-solid fa-circle-question"></i> Câu hỏi {question.id}</span>
                            <span className="right-row">
                                <button title="Chỉnh sửa" onClick={() => handleEditQuestion(question.id)}><i className="fa-solid fa-pen-to-square"></i>Chỉnh sửa</button>
                            </span>
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
                    <tr>
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
