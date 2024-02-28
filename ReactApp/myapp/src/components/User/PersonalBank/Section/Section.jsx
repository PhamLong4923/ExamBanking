import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import MyEditor from '../../../../common/MyEditor';
import ConvertTextTagToHTML from '../../../../common/convertTextTagToHTML';
import '../Section/Section.css';
import { IoIosArrowForward } from 'react-icons/io';
import { FaPlus } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { FaRegFileWord, FaRegFileExcel, FaEdit } from "react-icons/fa";

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
  const [modalIsOpen, setModalIsOpen] = useState(false); // State để kiểm soát hiển thị 
  const [questions, setQuestions] = useState([
    {
      id: '1',
      title: 'Đề ở đây',
      answers: [
        { id: 'answer1', content: 'Đáp án ở đây' },
        // { id: 'answer2', content: 'Đáp án ở đây' },
        // { id: 'answer3', content: 'Đáp án ở đây' },
        // { id: 'answer4', content: 'Đáp án ở đây' }
      ]
    }
  ]);
  const [editingQuestionId, setEditingQuestionId] = useState(null);

  const handleEditorDataChange = (data, type, quesid, ansid) => {
    console.log('Data from CKEditor:', data);
    console.log("type:", type);
    console.log("quesid:", quesid);
    console.log("ansid:", ansid);
    if (type === "title") {
      handleEditTitle(quesid, data);
      console.log("đổi title thành công");
    } else if (type === "answer") {
      handleEditAnswer(quesid, ansid, data);
      console.log("đổi answer thành công");
    }
    // Thực hiện xử lý với dữ liệu nhận được từ CKEditor ở đây
    // setEditorData(data);
  };

  const handleAddQuestion = () => {
    const newId = (questions.length + 1).toString();
    setQuestions([
      ...questions,
      {
        id: newId,
        title: 'Đề ở đây',
        answers: [
          { id: 'answer1', content: 'Đáp án ở đây' },
          // { id: 'answer2', content: 'Đáp án ở đây' },
          // { id: 'answer3', content: 'Đáp án ở đây' },
          // { id: 'answer4', content: 'Đáp án ở đây' }
        ],
      },
    ]);
    setEditingQuestionId(newId);
    setModalIsOpen(true);
  };

  const handleEditQuestion = (questionId) => {
    setEditingQuestionId(questionId);
    setModalIsOpen(true); // Mở modal khi bắt đầu chỉnh sửa câu hỏi
    // Thực hiện các xử lý khác nếu cần
  };

  const handleEditAnswer = (questionId, answerIndex, newAnswer) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId ?
          {
            ...question, answers: question.answers.map((answer, index) =>
              index === answerIndex ? { ...answer, content: newAnswer } : answer
            )
          } : question
      )
    );
    console.log("mảng mới sau edit answer:", questions)
  };
  // const addAnswer = (questionId) => {
  //   setQuestions(() =>
  //     questions.map((question) =>
  //       question.id === questionId
  //         ? { ...question, answers: [...question.answers, { id: `answer${question.answers.length}`, content: 'Đáp án ở đây' }] }
  //         : question
  //     )
  //   );
  //   console.log("mảng mới sau khi thêm đáp án:", questions);
  // };


  const handleSaveEdit = () => {
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

  const addAnswer = (questionId) => {
    setQuestions(() =>
      questions.map((question) =>
        question.id === questionId
          ? { ...question, answers: [...question.answers, { id: `answer${question.answers.length}`, content: 'Đáp án ở đây' }] }
          : question
      )
    );
    console.log("mảng mới sau khi thêm đáp án:", questions);
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

  //filter

  const handleQuestypeChange = (e) => {
    setQuestype(e.target.value);
  };

  return (
    <>
      <div className="pathlink">
        <NavLink className="link" to='/qbank'>Ngân hàng câu hỏi</NavLink>
        <IoIosArrowForward></IoIosArrowForward>
        <NavLink className="link" to='/pbank'>Ngân hàng câu hỏi cá nhân</NavLink>
        <IoIosArrowForward></IoIosArrowForward>
        <NavLink className="link" to='/repo'>ToanCD</NavLink>
        <IoIosArrowForward></IoIosArrowForward>
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
              <span className='tool-item' onClick={() => unSelect()}><FaXmark /></span>
              <span className='selectedq'>{selectedQuestions.length} được chọn</span>
      
              <span className='tool-item' onClick={deleteQuestions}><FaRegTrashCan></FaRegTrashCan></span>
              <span className='tool-item' onClick={handleAddQuestion}><FaPlus></FaPlus></span>
              <span className='tool-item' onClick={open2}><FaRegFileWord></FaRegFileWord></span>
              <span className='tool-item' onClick={open1}><FaRegFileExcel></FaRegFileExcel></span>
            </div>

            <div className='qlistitem'>
              {questions.map((question, index) => (
                <div onClick={() => handleSelectSection(1)}>
                  <React.Fragment key={index}>
                    {editingQuestionId === question.id && (
                      <div className="modal" style={{ display: modalIsOpen ? 'block' : 'none' }}>
                        <div className="modal-content">
                          <span className="close" onClick={() => setModalIsOpen(false)}>&times;</span>
                          <label htmlFor={`editTitle_${question.id}`}>Đề:</label>
                          <div className='myeditor-ck'>
                            <MyEditor type="title" quesid={question.id} ansid="" value={questions[index].title} onChange={handleEditorDataChange} />
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
                                        <MyEditor type="answer" quesid={question.id} ansid={index2} value={questions[index].answers[index2].content} onChange={handleEditorDataChange} />
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
                          <span className="left-row"> <i className="fa-solid fa-circle-question"></i> Câu hỏi {index + 1}</span>
                          <span className="right-row">
                            <button title="Chỉnh sửa" onClick={() => handleEditQuestion(question.id)}><i className="fa-solid fa-pen-to-square"></i>Chỉnh sửa</button>
                          </span>
                        </td>
                      </thead>
                      <tr>
                        <td className='ckeditor-result'>
                          <label htmlFor={questions[index].title}>Đề: </label>
                          <ConvertTextTagToHTML htmlContent={questions[index].title}></ConvertTextTagToHTML>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {questions[index].answers.map((answer, answerIndex) => (
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
              ))}
              {showModal1 && (
                <div className="modal-background">
                  <div className="modal-content">
                    <div className="modal-header">
                      <div className='header-left'>
                        <div className="header-icon">
                          <i class="fa-solid fa-table fa-2xl"></i>
                        </div>
                        <div>
                          <h5>Nhập câu hỏi từ excel</h5>
                          <div className="modal-subtitle">Vui lòng tải lên bảng tính excel theo mẫu</div>
                        </div>
                      </div>
                      <i class="fa-solid fa-xmark fa-2xl" onClick={close1}></i>
                    </div>
                    <div className="modal-body">
                      <MyEditor type="excel" quesid="" ansid="" onChange={handleEditorDataChange} />
                    </div>
                    <div className="modal-footer">
                      <button>Tải về mẫu</button>
                      <button onClick={close1}>Close</button>
                    </div>
                  </div>
                </div>
              )}

              {showModal2 && (
                <div className="modal-background">
                  <div className="modal-content">
                    <div className="modal-header">
                      <div className='header-left'>
                        <div className="header-icon">
                          <i class="fa-regular fa-file-word fa-2xl"></i>
                        </div>
                        <div>
                          <h5>Nhập câu hỏi từ Word</h5>
                          <div className="modal-subtitle">Vui lòng tải lên Word theo định dạng mẫu</div>
                        </div>
                      </div>
                      <i class="fa-solid fa-xmark fa-2xl" onClick={close2}></i>
                    </div>
                    <div className="modal-body">
                      <MyEditor type="word" quesid="" ansid="" onChange={handleEditorDataChange} />
                    </div>
                    <div className="modal-footer">
                      <button>Tải về mẫu</button>
                      <button onClick={close2}>Close</button>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

          <div className='section-leftside'>
            <div className='section-tool'>
              <span className='tool-item'><FaPlus></FaPlus></span>
              <span className='tool-item'><FaEdit></FaEdit></span>
              <span className='tool-item' onClick={deleteQuestions}><FaRegTrashCan></FaRegTrashCan></span>
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