import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Modal } from 'react-bootstrap';
import MyEditor from '../../components/MyEditor';
import Footer from '../../components/UI/Footer';
import Header from '../../components/UI/Header';
import Sidebar from '../../components/UI/Sidebar';
import './AddQuestion.css';
class AddQuestion extends React.Component {

    // componentDidMount() {
    //     ckeditorConfig(); // Gọi hàm cấu hình CKEditor khi modal được mount
    // }

    constructor(props) {
        super(props);
        this.state = {
            questions: [
                {
                    id: '1', title: ' Đề ở đây', answer1: ' đáp án ở đây', answer2: ' đáp án ở đây',
                    answer3: ' đáp án ở đây', answer4: ' đáp án ở đây', checkbox: ''
                },
            ],

            editingQuestionId: null,

        };
    }

    // handleDocxFileSelection = () => {
    //     const ckfinder = new CKFinder();
    //     ckfinder.selectFile().then(file => {
    //         console.log('Selected file:', file);
    //         // Xử lý file đã chọn ở đây
    //         this.setState({ docxFile: file });
    //     }).catch(error => {
    //         console.error('Error selecting file:', error);
    //     });
    // }

    close1 = () => {
        this.setState({ showModal1: false });
    }

    open1 = () => {
        this.setState({ showModal1: true });
    }
    close2 = () => {
        this.setState({ showModal2: false });
    }

    open2 = () => {
        this.setState({ showModal2: true });
    }

    handleAddQuestion = () => {
        const { questions } = this.state;
        const newId = (questions.length + 1).toString();

        this.setState({
            questions: [
                ...questions,
                {
                    id: newId, title: 'Đề ở đây', answer1: 'Đáp án ở đây', answer2: 'Đáp án ở đây',
                    answer3: 'đáp án ở đây', answer4: 'đáp án ở đây', checkbox: ''
                },
            ],
        });
    }

    handleEditQuestion = (questionId) => {
        this.setState({ editingQuestionId: questionId });
        // Thực hiện các xử lý khác nếu cần
    }

    handleEditAnswer = (questionId, answerIndex, newAnswer) => {
        // Cập nhật đáp án của câu hỏi đang được chỉnh sửa
        this.setState((prevState) => ({
            questions: prevState.questions.map((question) =>
                question.id === questionId
                    ? {
                        ...question,
                        [`answer${answerIndex + 1}`]: newAnswer,
                    }
                    : question
            ),
        }));
    };

    handleSaveEdit = (questionId) => {
        // Thực hiện lưu chỉnh sửa cho câu hỏi
        console.log('Lưu chỉnh sửa cho câu hỏi có ID:', questionId);

        // Đặt trạng thái chỉnh sửa về mặc định
        this.setState({ editingQuestionId: null });
    };

    handleEditTitle = (questionId, newTitle) => {
        // Cập nhật tiêu đề của câu hỏi đang được chỉnh sửa
        this.setState((prevState) => ({
            questions: prevState.questions.map((question) =>
                question.id === questionId
                    ? { ...question, title: newTitle }
                    : question
            ),
        }));
    };

    handleDeleteQuestion = (questionId) => {
        const updatedQuestions = this.state.questions.filter((question) => question.id !== questionId);

        this.setState({
            questions: updatedQuestions,
            editingQuestionId: null, // Đặt editingQuestionId về null nếu câu hỏi đang được chỉnh sửa bị xóa
        });
    };

    render() {
        console.log(MyEditor);
        return (
            <>
                <Header></Header>
                <div className="addquestion">
                    <div className="back-link">Home/My bank/Input question</div>
                    <h2 className='center-addquestion'>Add question</h2>
                    <div className="menu">
                        <span className="left-row">{this.state.questions.length} câu hỏi</span>
                        <span className="right-row">
                            <button><i class="fa-solid fa-floppy-disk"></i> Lưu</button>
                            <button onClick={this.handleAddQuestion}><i class="fa-solid fa-circle-plus"></i> Thêm câu hỏi</button>
                        </span>
                    </div>

                    {/* Render tables dynamically */}
                    {this.state.questions.map((question, index) => (
                        <React.Fragment key={index}>
                            {this.state.editingQuestionId === question.id ? (
                                /* Hiển thị nội dung chỉnh sửa */
                                <div className="edit-question" key={index}>
                                    <label htmlFor={`editTitle_${question.id}`}>Đề:</label>
                                    <input
                                        type="text"
                                        id={`editTitle_${question.id}`}
                                        value={question.title}
                                        onChange={(e) => this.handleEditTitle(question.id, e.target.value)}
                                    />

                                    <table className="edit-answers">
                                        <thead>
                                            <tr>
                                                <th>Đáp án</th>
                                                <th>Nội dung đáp án</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {['answer1', 'answer2', 'answer3', 'answer4'].map((answerKey, answerIndex) => (
                                                <tr key={answerIndex}>
                                                    <td>Đáp án {answerIndex + 1}:</td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            id={`editAnswer_${question.id}_${answerIndex + 1}`}
                                                            value={question[answerKey]}
                                                            onChange={(e) => this.handleEditAnswer(question.id, answerIndex, e.target.value)}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {/* Thêm các trường chỉnh sửa khác cho câu hỏi ở đây */}

                                    <button onClick={() => this.handleSaveEdit(question.id)}>
                                        Lưu chỉnh sửa
                                    </button>
                                </div>
                            ) : (

                                <table className="addquestion-table">
                                    <thead>
                                        <td className="row-head">
                                            <span className="left-row"> <i class="fa-solid fa-circle-question"></i> Câu hỏi {index + 1}</span>
                                            <span className="right-row">
                                                <button title="Chỉnh sửa" onClick={() => this.handleEditQuestion(question.id)}><i class="fa-solid fa-pen-to-square"></i>Chỉnh sửa</button>
                                                <button title="Nhân đôi câu hỏi này"><i class="fa-solid fa-copy"></i></button>
                                                <button title="Xóa câu hỏi này" onClick={() => this.handleDeleteQuestion(question.id)}><i class="fa-solid fa-trash-can"></i></button>
                                            </span>
                                        </td>
                                    </thead>
                                    <tr>
                                        <td>
                                            Đề: {this.state.questions[index].title}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className="text-over-border">lựa chọn trả lời</span>
                                            <div>
                                                <input type="checkbox" id="answer1" title="đánh dấu đáp án đúng" />
                                                <label htmlFor="answer1">Đáp án 1: </label>
                                                <label htmlFor="answer1">{this.state.questions[index].answer1}</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" id="answer2" title="đánh dấu đáp án đúng" />
                                                <label htmlFor="answer2">Đáp án 2: </label>
                                                <label htmlFor="answer2">{this.state.questions[index].answer2}</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" id="answer3" title="đánh dấu đáp án đúng" />
                                                <label htmlFor="answer3">Đáp án 3: </label>
                                                <label htmlFor="answer3">{this.state.questions[index].answer3}</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" id="answer4" title="đánh dấu đáp án đúng" />
                                                <label htmlFor="answer4">Đáp án 4: </label>
                                                <label htmlFor="answer4">{this.state.questions[index].answer4}</label>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            )}
                            <br /><br />
                        </React.Fragment>
                    ))}

                    <div className="center-addquestion">
                        <div>
                            Nhập câu hỏi
                        </div>
                        <button title="Nhập từ excel" onClick={this.open1}><i class="fa-solid fa-table"></i> Excel</button>
                        <button title="Nhập từ word" onClick={this.open2}><i class="fa-solid fa-file-word"></i> Word</button>
                        <Modal show={this.state.showModal1} onHide={this.close1} className="excel-modal">
                            <Modal.Header closeButton className="modal-header">
                                <div className="header-icon">
                                    <i class="fa-solid fa-table fa-2xl"></i>
                                </div>
                                <div>
                                    <h5>Nhập câu hỏi từ excel</h5>
                                    <div className="modal-subtitle">Vui lòng tải lên bảng tính excel theo mẫu</div>
                                </div>
                            </Modal.Header>
                            <Modal.Body>

                                <MyEditor />

                            </Modal.Body>
                            <Modal.Footer>
                                <button>Tải về mẫu</button>
                                <button onClick={this.close1}>Close</button>
                            </Modal.Footer>
                        </Modal>
                        <Modal show={this.state.showModal2} onHide={this.close2}>
                            <Modal.Header closeButton>
                                <div className="header-icon">
                                    <i class="fa-regular fa-file-word fa-2xl"></i>
                                </div>
                                <div>
                                    <h5>Nhập câu hỏi từ Word</h5>
                                    <div className="modal-subtitle">Vui lòng tải lên Word theo định dạng mẫu</div>
                                </div>
                            </Modal.Header>
                            <Modal.Body>

                                <MyEditor />

                            </Modal.Body>
                            <Modal.Footer>
                                <button>Tải về mẫu</button>
                                <button onClick={this.close2}>Close</button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
                <Sidebar>

                </Sidebar>

                <Footer></Footer>
            </>
        );
    }
}

export default AddQuestion; 