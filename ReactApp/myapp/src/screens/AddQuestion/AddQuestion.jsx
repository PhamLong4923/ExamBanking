import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Modal } from 'react-bootstrap';
import Footer from '../../components/UI/Footer';
import Header from '../../components/UI/Header';
import Sidebar from '../../components/UI/Sidebar';
import './AddQuestion.css';

class AddQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [
                {
                    id: '1', title: 'Đề ở đây', answer1: 'Đáp án ở đây', answer2: 'Đáp án ở đây',
                    answer3: 'đáp án ở đây', answer4: 'đáp án ở đây', checkbox: ''
                },
            ],
            showModal1: false,
            showModal2: false,
        };
    }
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

    // handleFileChange = (event) => {
    //     const selectedFile = event.target.files[0];

    //     if (selectedFile) {
    //         // Xử lý tệp tin ở đây, ví dụ: đọc nội dung tệp tin
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             const fileContent = e.target.result;
    //             console.log("Nội dung tệp tin:", fileContent);
    //         };

    //         reader.readAsText(selectedFile); // Đọc nội dung tệp tin với định dạng văn bản
    //     }
    // };
    // handleDrop = (event) => {
    //     event.preventDefault();

    //     const droppedFile = event.dataTransfer.files[0];

    //     if (droppedFile) {
    //         this.setState({ draggedFileName: droppedFile.name });

    //         // Xử lý tệp tin ở đây, ví dụ: đọc nội dung tệp tin
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             const fileContent = e.target.result;
    //             console.log("Nội dung tệp tin:", fileContent);
    //         };

    //         reader.readAsText(droppedFile); // Đọc nội dung tệp tin với định dạng văn bản
    //     }
    // };
    render() {
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
                        <>
                            <table className="question" key={index}>
                                <thead>
                                    <td className="row-head">
                                        <span className="left-row"> <i class="fa-solid fa-circle-question"></i> Câu hỏi {index + 1}</span>
                                        <span className="right-row">
                                            <button title="Chỉnh sửa"><i class="fa-solid fa-pen-to-square"></i>Chỉnh sửa</button>
                                            <button title="Nhân đôi câu hỏi này"><i class="fa-solid fa-copy"></i></button>
                                            <button title="Xóa câu hỏi này"><i class="fa-solid fa-trash-can"></i></button>
                                        </span>
                                    </td>
                                </thead>
                                <tr>
                                    <td>
                                        Đề:...............................................
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="text-over-border">lựa chọn trả lời</span>
                                        <div>
                                            <input type="checkbox" id="answer1" title="đánh dấu đáp án đúng" />
                                            <label htmlFor="answer1">Đáp án 1: </label>
                                            <label htmlFor="answer1">Đáp án ở đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây đây </label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="answer2" title="đánh dấu đáp án đúng" />
                                            <label htmlFor="answer2">Đáp án 2: </label>
                                            <label htmlFor="answer2">Đáp án ở đây </label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="answer3" title="đánh dấu đáp án đúng" />
                                            <label htmlFor="answer3">Đáp án 3: </label>
                                            <label htmlFor="answer3">Đáp án ở đây </label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="answer4" title="đánh dấu đáp án đúng" />
                                            <label htmlFor="answer4">Đáp án 4: </label>
                                            <label htmlFor="answer4">Đáp án ở đây </label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <br /><br />
                        </>
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
                                <input
                                    type="file"
                                    // onChange={this.handleFileChange}
                                    accept=".xlsx, .xlsm" // (Optional) Chỉ chấp nhận các loại file nhất định
                                />
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
                                <input
                                    type="file"
                                    accept=".docx" // (Optional) Chỉ chấp nhận các loại file nhất định
                                />
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