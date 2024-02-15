import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import axios, { all } from 'axios'
import '../Section/Section.css';

import Question from '../Question/Question';

const Section = () => {
  // Sử dụng useParams để trích xuất tham số bid từ URL
  const { bid } = useParams();
  const [data, setData] = useState([]);
  const [section, setSection] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [questype, setQuestype] = useState('3');
  const [selectedSection, setSelectedSection] = useState();

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
            </div>

            <div className='qlistitem'>
              {data.map((question) => (
                <div className={`qcontainer ${selectedQuestions.includes(question.questionId) ? 'selected' : ''}`} key={question.questionId} onClick={() => selectQuestionsHandle(question.questionId)}><Question props={question}></Question></div>

              ))}

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
                <div key={sec.sectionId} className={`sectionitem ${selectedSection === sec.sectionId ? 'selected' : ''}`} onClick={()=>handleSelectSection(sec.sectionId)}>
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