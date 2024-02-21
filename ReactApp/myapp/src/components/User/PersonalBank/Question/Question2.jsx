import React, { useState } from 'react';
import '../Question/Question.css';


const Question2 = ({ props }) => {
    const [solutionVisible, setSolutionVisible] = useState(false);

    const toggleSolution = () => {
        setSolutionVisible(!solutionVisible);
    };

    const [selectedSection, setSelectedSection] = useState();
    const [questions, setQuestions] = useState([
        {
            id: '1',
            title: 'Đề ở đây',
            answers: [
                { id: 'answer1', content: 'Đáp án ở đây' },
                { id: 'answer2', content: 'Đáp án ở đây' },
                { id: 'answer3', content: 'Đáp án ở đây' },
                { id: 'answer4', content: 'Đáp án ở đây' }
            ]
        }
    ]);

    const [editingQuestionId, setEditingQuestionId] = useState(null);

    const handleEditQuestion = (questionId) => {
        setEditingQuestionId(questionId);
        // Thực hiện các xử lý khác nếu cần
    };

    const handleEditAnswer = (questionId, answerId, newAnswer) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
                question.id === questionId
                    ? {
                        ...question,
                        answers: question.answers.map((answer) =>
                            answer.id === answerId ? { ...answer, content: newAnswer } : answer
                        )
                    }
                    : question
            )
        );
    };


    const handleSaveEdit = (questionId) => {
        // Thực hiện lưu chỉnh sửa cho câu hỏi
        console.log('Lưu chỉnh sửa cho câu hỏi có ID:', questionId);

        // Đặt trạng thái chỉnh sửa về mặc định
        setEditingQuestionId(null);
    };

    const handleEditTitle = (questionId, newTitle) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
                question.id === questionId ? { ...question, title: newTitle } : question
            )
        );
    };

    const addAnswer = (questionId) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
                question.id === questionId
                    ? { ...question, answers: [...question.answers, { id: `answer${question.answers.length + 1}`, content: '' }] }
                    : question
            )
        );
    };

    const deleteAnswer = (questionId, answerId) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
                question.id === questionId
                    ? { ...question, answers: question.answers.filter((answer) => answer.id !== answerId) }
                    : question
            )
        );
    };


    return (
        <>
            {questions.map((question, index) => ( //bỏ dòng này hoặc không tạo for ở nơi import
                // <div className={`qcontainer ${selectedQuestions.includes(question.questionId) ? 'selected' : ''}`} key={question.questionId} onClick={() => selectQuestionsHandle(question.questionId)}><Question props={question}></Question></div>
                <React.Fragment key={index}>
                    {editingQuestionId === question.id ? (
                        /* Hiển thị nội dung chỉnh sửa */
                        <div className="edit-question" key={index}>
                            <label htmlFor={`editTitle_${question.id}`}>Đề:</label>
                            <input
                                type="text"
                                id={`editTitle_${question.id}`}
                                value={question.title}
                                onChange={(e) => handleEditTitle(question.id, e.target.value)}
                            />

                            <table className="edit-answers">
                                <thead>
                                    <tr>
                                        <th>Đáp án</th>
                                        <th>Nội dung đáp án</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {question.answers.map((answer, index2) => (
                                        <tr>
                                            <th>
                                                Đáp án {index2 + 1}
                                            </th>
                                            <th>
                                                <div key={answer.id}>
                                                    <input
                                                        type="text"
                                                        value={answer.content}
                                                        onChange={(e) => handleEditAnswer(question.id, answer.id, e.target.value)}
                                                    />
                                                    <i className="fa-solid fa-trash-can" onClick={() => deleteAnswer(question.id, answer.id)}></i>
                                                </div>
                                            </th>
                                        </tr>
                                    ))}
                                    <div>
                                        <button onClick={() => addAnswer(question.id)}>Thêm đáp án</button>
                                    </div>
                                </tbody>
                            </table>

                            {/* Thêm các trường chỉnh sửa khác cho câu hỏi ở đây */}
                            <div>
                                <button onClick={() => handleSaveEdit(question.id)}>
                                    Lưu chỉnh sửa
                                </button>
                            </div>
                        </div>
                    ) : (

                        <table className="addquestion-table">
                            <thead>
                                <td className="row-head">
                                    <span className="left-row"> <i class="fa-solid fa-circle-question"></i> Câu hỏi {index + 1}</span>
                                    <span className="right-row">
                                        <button title="Chỉnh sửa" onClick={() => handleEditQuestion(question.id)}><i class="fa-solid fa-pen-to-square"></i>Chỉnh sửa</button>
                                        {/* <button title="Nhân đôi câu hỏi này"><i class="fa-solid fa-copy"></i></button>
                                        <button title="Xóa câu hỏi này" onClick={() => handleDeleteQuestion(question.id)}><i class="fa-solid fa-trash-can"></i></button> */}
                                    </span>
                                </td>
                            </thead>
                            <tr>
                                <td>
                                    Đề: {questions[index].title}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {/* <span className="text-over-border">lựa chọn trả lời</span> */}
                                    <div>
                                        <label htmlFor="answer1">Đáp án 1: </label>
                                        <label htmlFor="answer1">{questions[index].answer1}</label>
                                    </div>
                                    <div>
                                        <label htmlFor="answer2">Đáp án 2: </label>
                                        <label htmlFor="answer2">{questions[index].answer2}</label>
                                    </div>
                                    <div>
                                        <label htmlFor="answer3">Đáp án 3: </label>
                                        <label htmlFor="answer3">{questions[index].answer3}</label>
                                    </div>
                                    <div>
                                        <label htmlFor="answer4">Đáp án 4: </label>
                                        <label htmlFor="answer4">{questions[index].answer4}</label>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    )}
                    <br /><br />
                </React.Fragment>
            ))}
        </>
    );
};

export default Question2;
