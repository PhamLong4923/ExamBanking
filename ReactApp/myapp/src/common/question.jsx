import React from 'react';
import MyEditor from './MyEditor';
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
    handleEditorDataChange
}) => {
    return (
        <div onClick={() => handleSelectSection(1)}>
            <React.Fragment>
                {editingQuestionId === question.id && (
                    <div className="modal" style={{ display: modalIsOpen ? 'block' : 'none' }}>
                        <div className="modal-content">
                            <span className="close" onClick={() => setModalIsOpen(false)}>&times;</span>
                            <label htmlFor={`editTitle_${question.id}`}>Đề:</label>
                            <div className='myeditor-ck'>
                                <MyEditor type="title" quesid={question.id} ansid="" value={question.title} onChange={handleEditorDataChange} />
                            </div>
                            <table className="edit-answers">
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
                                                    <i className="fa-solid fa-trash-can deleteanswer-icon" onClick={() => deleteAnswer(question.id, answer.id)}></i>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className='addquestion-savebutton'>
                                <button onClick={() => addAnswer(question.id)}>Thêm đáp án</button>
                                <button onClick={() => handleSaveEdit()}>
                                    Lưu chỉnh sửa
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

                </table>
                <br></br>
            </React.Fragment>
        </div>
    );
};

export default Question;
