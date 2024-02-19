import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';
import MyEditor from '../../../MyEditor';
import '../Section/Section.css';


const Section = (props) => {
  // Sử dụng useParams để trích xuất tham số bid từ URL
  const { bid } = useParams();
  const [data, setData] = useState([]);
  const [section, setSection] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [questype, setQuestype] = useState('3');
  const [selectedSection, setSelectedSection] = useState();
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [questions, setQuestions] = useState([
    {
      id: '1',
      title: 'Đề ở đây',
      answer1: 'Đáp án ở đây',
      answer2: 'Đáp án ở đây',
      answer3: 'đáp án ở đây',
      answer4: 'đáp án ở đây',
      checkbox: ''
    }
  ]);
  const [editingQuestionId, setEditingQuestionId] = useState(null);

  const handleAddQuestion = () => {
    const newId = (questions.length + 1).toString();
    setQuestions([
      ...questions,
      {
        id: newId,
        title: 'Đề ở đây',
        answer1: 'Đáp án ở đây',
        answer2: 'Đáp án ở đây',
        answer3: 'đáp án ở đây',
        answer4: 'đáp án ở đây',
        checkbox: ''
      },
    ]);
  };

  const handleEditQuestion = (questionId) => {
    setEditingQuestionId(questionId);
    // Thực hiện các xử lý khác nếu cần
  };

  const handleEditAnswer = (questionId, answerIndex, newAnswer) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId ? { ...question, [`answer${answerIndex + 1}`]: newAnswer } : question
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

  const handleDeleteQuestion = (questionId) => {
    const updatedQuestions = questions.filter((question) => question.id !== questionId);
    setQuestions(updatedQuestions);
    setEditingQuestionId(null); // Đặt editingQuestionId về null nếu câu hỏi đang được chỉnh sửa bị xóa
  };

  const close1 = () => {
    setShowModal1(false);
  };

  const open1 = () => {
    setShowModal1(true);
  };

  const close2 = () => {
    setShowModal2(false);
  };

  const open2 = () => {
    setShowModal2(true);
  };
  const fetchDataFromApi = async () => {
    try {
      const resq = await axios.post('https://localhost:7064/api/Bank/vquestions', {
        // Data you want to send in the POST request body
        // For example: { key1: 'value1', key2: 'value2' }
      });

      setData(resq.data);

      const ress = await axios.post('https://localhost:7064/api/Bank/vsection', {
        // Data you want to send in the POST request body
        // For example: { key1: 'value1', key2: 'value2' }
      });

      setSection(ress.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);



  const selectQuestionsHandle = (qid) => {
    setSelectedQuestions((prevQuestions) => {
      // Kiểm tra xem câu hỏi đã được chọn chưa
      const isSelected = prevQuestions.includes(qid);

      // Nếu chưa được chọn, thêm vào mảng
      if (!isSelected) {
        return [...prevQuestions, qid];
      } else {
        // Nếu đã được chọn, loại bỏ khỏi mảng
        return prevQuestions.filter((id) => id !== qid);
      }

    });

  };


  const deleteQuestions = async () => {
    if (selectedQuestions.length > 0) {
      const confirmDelete = window.confirm('Bạn có muốn xóa những câu hỏi đã chọn không?');
      console.log('id', selectedQuestions)
      if (confirmDelete) {
        try {
          // Gọi API để xóa câu hỏi
          //await axios.post('https://localhost:7064/api/DeleteQuestions', { questionIds: selectedQuestions });

          // Sau khi xóa thành công, cập nhật danh sách câu hỏi
          fetchDataFromApi();

          // Đặt lại mảng câu hỏi được chọn
          setSelectedQuestions([]);
        } catch (error) {
          console.error('Error deleting questions:', error);
        }
      }
    } else {
      alert('Vui lòng chọn ít nhất một câu hỏi để xóa.');
    }
  };

  //tool

  const unSelect = () => {
    setSelectedQuestions([]);
  }

  const handleSelectSection = (secid) => {
    setSelectedSection(secid);
  }


  //filter

  const handleQuestypeChange = (e) => {
    setQuestype(e.target.value);
  };

  return (
    <>
      <div className="pathlink">
        <NavLink className="link" to='/qbank'>Ngân hàng câu hỏi</NavLink>
        <i class="fa-solid fa-caret-right"></i>
        <NavLink className="link" to='/pbank'>Ngân hàng câu hỏi cá nhân</NavLink>
        <i class="fa-solid fa-caret-right"></i>
        <NavLink className="link" to='/repo'>ToanCD</NavLink>
        <i class="fa-solid fa-caret-right"></i>
        <NavLink className="link" to='/sec/1'>Chương I</NavLink>
      </div>
      <div className="section-container">

        <div className='qfilter'>

          <form className="filterform">
            <div className="searcher">
              <input type="search" placeholder="Search" class="search-field" />
              {/* <img src="/search.png" alt='search icon' className='searchicon'/> */}
            </div>


            <select className="filter" name="questype" value={questype} onChange={handleQuestypeChange}>
              <option value="1">Trắc nghiệm</option>
              <option value="2">Tự luận</option>
              <option value="3">Tất cả</option>
            </select>

            {questype === '1' && (
              <select className="filter" name="mutitype">
                <option value="mercedes">Nhận biết</option>
                <option value="volvo">Thông hiểu</option>
                <option value="saab">Vận dụng</option>
                <option value="audi">Tất cả</option>
              </select>
            )}

            {questype === '2' && (
              <select className="filter" name="essaytype">
                <option value="mercedes">Dễ</option>
                <option value="volvo">Trung bình</option>
                <option value="saab">Nâng cao</option>
                <option value="audi">Tất cả</option>
              </select>
            )}
          </form>

          {/* <div className='addSection'><i class="fa-solid fa-plus fa-xl"></i></div> */}

        </div>



        <div className='qshow'>

          <div className='section-rightside'>
            <div className='question-tool'>
              <span className='tool-item' onClick={() => unSelect()}><i className="fa-solid fa-xmark"></i></span>
              <span className='selectedq'>{selectedQuestions.length} được chọn</span>
              <span className='tool-item'><i className="fa-solid fa-pen-to-square"></i></span>
              <span className='tool-item' onClick={deleteQuestions}><i className="fa-solid fa-trash-can"></i></span>
              <span className='tool-item' onClick={handleAddQuestion}><i class="fa-solid fa-plus"></i></span>
              <span className='tool-item' onClick={open2}><i class="fa-regular fa-file-word"></i></span>
              <span className='tool-item' onClick={open1}><i class="fa-regular fa-file-excel"></i></span>
            </div>

            <div className='qlistitem'>
              {questions.map((question, index) => (
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
                          {['answer1', 'answer2', 'answer3', 'answer4'].map((answerKey, answerIndex) => (
                            <tr key={answerIndex}>
                              <td>Đáp án {answerIndex + 1}:</td>
                              <td>
                                <input
                                  type="text"
                                  id={`editAnswer_${question.id}_${answerIndex + 1}`}
                                  value={question[answerKey]}
                                  onChange={(e) => handleEditAnswer(question.id, answerIndex, e.target.value)}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {/* Thêm các trường chỉnh sửa khác cho câu hỏi ở đây */}

                      <button onClick={() => handleSaveEdit(question.id)}>
                        Lưu chỉnh sửa
                      </button>
                    </div>
                  ) : (

                    <table className="addquestion-table">
                      <thead>
                        <td className="row-head">
                          <span className="left-row"> <i class="fa-solid fa-circle-question"></i> Câu hỏi {index + 1}</span>
                          <span className="right-row">
                            <button title="Chỉnh sửa" onClick={() => handleEditQuestion(question.id)}><i class="fa-solid fa-pen-to-square"></i>Chỉnh sửa</button>
                            <button title="Nhân đôi câu hỏi này"><i class="fa-solid fa-copy"></i></button>
                            <button title="Xóa câu hỏi này" onClick={() => handleDeleteQuestion(question.id)}><i class="fa-solid fa-trash-can"></i></button>
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
                            <input type="checkbox" id="answer1" title="đánh dấu đáp án đúng" />
                            <label htmlFor="answer1">Đáp án 1: </label>
                            <label htmlFor="answer1">{questions[index].answer1}</label>
                          </div>
                          <div>
                            <input type="checkbox" id="answer2" title="đánh dấu đáp án đúng" />
                            <label htmlFor="answer2">Đáp án 2: </label>
                            <label htmlFor="answer2">{questions[index].answer2}</label>
                          </div>
                          <div>
                            <input type="checkbox" id="answer3" title="đánh dấu đáp án đúng" />
                            <label htmlFor="answer3">Đáp án 3: </label>
                            <label htmlFor="answer3">{questions[index].answer3}</label>
                          </div>
                          <div>
                            <input type="checkbox" id="answer4" title="đánh dấu đáp án đúng" />
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
              <Modal show={showModal1} onHide={close1} className="excel-modal">
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
                  <button onClick={close1}>Close</button>
                </Modal.Footer>
              </Modal>
              <Modal show={showModal2} onHide={close2}>
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
                  <button onClick={close2}>Close</button>
                </Modal.Footer>
              </Modal>
            </div>

          </div>

          <div className='section-leftside'>
            <div className='section-tool'>
              <span className='tool-item'><i class="fa-solid fa-plus"></i></span>
              <span className='tool-item'><i className="fa-solid fa-pen-to-square"></i></span>
              <span className='tool-item' onClick={deleteQuestions}><i className="fa-solid fa-trash-can"></i></span>
            </div>

            <div className="section-list">
              {section.map((sec) => (
                <div key={sec.sectionId} className={`sectionitem ${selectedSection === sec.sectionId ? 'selected' : ''}`} onClick={() => handleSelectSection(sec.sectionId)}>
                  {sec.secTitle}
                </div>
              ))}
            </div>

          </div>


        </div>
      </div>
    </>
  );
};

export default Section;