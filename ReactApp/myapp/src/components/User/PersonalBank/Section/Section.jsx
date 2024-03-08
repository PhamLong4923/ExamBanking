import React, { useEffect, useState } from 'react';
import { FaEdit, FaRegFileExcel, FaRegFileWord } from "react-icons/fa";
import { FaPlus, FaRegTrashCan, FaXmark } from "react-icons/fa6";
import { IoIosArrowForward } from 'react-icons/io';
import { NavLink, useParams } from 'react-router-dom';
import ImportModal from '../../../../common/importModal';
import Question from '../../../../common/question';
import '../Section/Section.css';
import ToastMessage from '../../../Toast/toast';
import HashLoader from "react-spinners/HashLoader";

const Section = (props) => {

  const [loading, setLoading] = useState();
  const [isEndOfPage, setIsEndOfPage] = useState(false);


  const [data, setData] = useState([]);
  const [section, setSection] = useState([]);
  const [selectedSection, setSelectedSection] = useState();

  
  const [questype, setQuestype] = useState('3');
  
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [isAddQuestion, setIsAddQuestion] = useState(false);

  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [questions, setQuestions] = useState([
    {
      id: '1',
      title: 'Đề ở đây',
      answers: [
        // { id: 'answer1', content: 'Đáp án ở đây' },
        // { id: 'answer2', content: 'Đáp án ở đây' },
        // { id: 'answer3', content: 'Đáp án ở đây' },
        // { id: 'answer4', content: 'Đáp án ở đây' }
      ],
      type: '1',
      solution: 'Hướng dẫn giải',
      mode: 'dễ',
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
    } else if (type === "solution") {
      handleEditSolution(quesid, data)
      console.log("chỉnh sửa hướng dẫn giải thành công");
    }
  };

  const handleAddQuestion = () => {
    const newId = (questions.length + 1).toString();
    setQuestions([
      ...questions,
      {
        id: newId,
        title: '',
        answers: [
          { id: 'answer1', content: '' },
        ],
        type: '1',
        solution: 'hướng dẫn giải',
        mode: 'dễ',
      },
    ]);
    setEditingQuestionId(newId);
    setModalIsOpen(true);
    setIsAddQuestion(true);
  };

  const handleEditQuestion = (questionId) => {
    setEditingQuestionId(questionId);
    setModalIsOpen(true); // Mở modal khi bắt đầu chỉnh sửa câu hỏi
    setIsAddQuestion(false);
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

  const handleEditSolution = (questionId, newSolution) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId ? { ...question, solution: newSolution } : question
      )
    );
  };

  const handleQuestionModeChange = (questionId, newMode) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId ? { ...question, mode: newMode } : question
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

  //load section
  useEffect(() => {
    try {
      
      //call getSection api (repoid) -> list of sections

      // setSection(ress.data);

      //useState , set secid, selectSection
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  //load question
  useEffect(() =>{
    //load question by secid which are selected
  })

  useEffect(() =>{
    //load question if secid change
  },[])

  useEffect(() =>{
    //load 10 question first
  })

  useEffect(() => {
    const qlistitemElement = document.querySelector('.qlistitem');
    qlistitemElement.addEventListener('scroll', handleScroll);
    
    return () => {
      qlistitemElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isEndOfPage) {
      // Gọi hàm để load thêm câu hỏi ở đây
      loadMoreQuestions();
    }
  }, [isEndOfPage]);

  const loadMoreQuestions = async () => {
    try {
      // Gọi API để lấy thêm câu hỏi
      const response = await fetch('API_URL');
      const data = await response.json();
  
      // Cập nhật state questions bằng cách thêm câu hỏi mới vào mảng questions hiện có
      setQuestions(prevQuestions => [...prevQuestions, ...data.questions]);
    } catch (error) {
      console.error('Error loading more questions:', error);
    }
  };
  
  
  
  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const scrolledToBottom = Math.ceil(scrollTop + windowHeight) >= documentHeight;
    
    if (scrolledToBottom) {
      setIsEndOfPage(true);
    } else {
      setIsEndOfPage(false);
    }
  };


  const handleSelectQuestion = (qid) => {
    setSelectedQuestions((prevQuestions) => {
      const isSelected = prevQuestions.includes(qid);

      if (!isSelected) {
        return [...prevQuestions, qid];
      } else {
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
    // useState, set selectSection
  }

  const addAnswer = (questionId) => {
    setQuestions(() =>
      questions.map((question) =>
        question.id === questionId
          ? { ...question, answers: [...question.answers, { id: `answer${question.answers.length}`, content: '' }] }
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

  const handleQuestionTypeChange = (questionId, selectedType) => {
    // Cập nhật giá trị question.type khi thay đổi loại câu hỏi
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId ? { ...question, type: selectedType } : question
      )
    );
    if (selectedType === '2') {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === questionId ? { ...question, answers: [] } : question
        )
      );
    }
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
                <Question
                  key={index}
                  question={question}
                  handleEditQuestion={handleEditQuestion}
                  deleteQuestion={handleDeleteQuestion}
                  handleEditAnswer={handleEditAnswer}
                  deleteAnswer={deleteAnswer}
                  addAnswer={addAnswer}
                  handleSaveEdit={handleSaveEdit}
                  editingQuestionId={editingQuestionId}
                  modalIsOpen={modalIsOpen}
                  handleEditorDataChange={handleEditorDataChange}
                  setModalIsOpen={setModalIsOpen}
                  handleSelectSection={handleSelectSection}
                  handleQuestionTypeChange={handleQuestionTypeChange}
                  handleEditSolution={handleEditSolution}
                  isAddQuestion={isAddQuestion}
                  handleQuestionModeChange={handleQuestionModeChange}
                  handleSelectQuestion={handleSelectQuestion}
                  isSelected={selectedQuestions.includes(question.id)}
                />
              ))}

              {loading }

              <ImportModal
                showModal={showModal1 || showModal2}
                closeModal={showModal1 ? close1 : close2}
                handleEditorDataChange={handleEditorDataChange}
                modalType={showModal1 ? 'excel' : 'word'}
              />

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