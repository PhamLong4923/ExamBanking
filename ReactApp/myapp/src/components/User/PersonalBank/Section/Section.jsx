import React, { useEffect, useState } from 'react';
import { FaEdit, FaRegFileExcel, FaRegFileWord } from "react-icons/fa";
import { FaPlus, FaRegTrashCan, FaXmark } from "react-icons/fa6";
import { IoIosArrowForward } from 'react-icons/io';
import { TiWarningOutline } from "react-icons/ti";
import { NavLink } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import { toast } from 'react-toastify';
import ImportModal from '../../../../common/importModal';
import Question from '../../../../common/question';
import '../Section/Section.css';
import { MoonLoader } from 'react-spinners';
import { GoInbox } from "react-icons/go";
import { getQuestions, getSection } from '../../../../services/Api';
import PopupCreateModel from '../../../EditPopup/popupcreate';
import checkLimit from '../../../../share/ultils/checklimit';
import { useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5";
import { addSection, delSection, updateSection, addQuestion } from '../../../../services/Api';

const Section = () => {
  const [openconfirm, setOpenConfirm] = useState(false);
  const [bankType, setBankType] = useState(useSelector(state => state.bankType));
  const repoid = useSelector(state => state.repoId);

  const [loading, setLoading] = useState(true);
  const [qloading, setQloading] = useState(true);

  const [isEndOfPage, setIsEndOfPage] = useState(false);

  const [section, setSection] = useState([]);
  const [secid, setSecid] = useState(-1);

  const [isactive, setIsactive] = useState(false);
  const [islimit, setIslimit] = useState(false);

  const [isqueslimit, setIsQueslimit] = useState(false);

  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [isAddQuestion, setIsAddQuestion] = useState(false);

  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const [questions, setQuestions] = useState([
    // {
    //   id: 1,
    //   title: 'Đề ở đây',
    //   answers: [
    //     // { id: 'answer1', content: 'Đáp án ở đây' },
    //     // { id: 'answer2', content: 'Đáp án ở đây' },
    //     // { id: 'answer3', content: 'Đáp án ở đây' },
    //     // { id: 'answer4', content: 'Đáp án ở đây' }
    //   ],
    //   type: 1,
    //   solution: 'Hướng dẫn giải',
    //   mode: 2,
    // }

  ]);

  const [intitle, setIntitle] = useState('');
  const [open, setOpen] = useState(false);

  const handleSuccess = (itemid, value) => {
    handleUpdateSecion(itemid, value);
    setOpen(false);
  }


  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpenConfirm(false);
  }

  //Section handle
  //load section
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSection(repoid);
        setSection(response.data);
        if (section.length !== 0) {
          setSecid(section[0].secid);
        } else {
          setSecid(-1);
        }
        setIslimit(checkLimit('sec', section.length))
        setLoading(false);
        setIsactive(true);

      } catch (error) {
        console.error('Error fetching banks:', error);
        // Handle error here
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setIslimit(checkLimit('sec', section.length));
  }, [section]);
  //end load section
  //add section
  const handleAddSecion = async (value) => {
    try {
      console.log(repoid);
      const response = await addSection({ secname: value, repoid: repoid });
      var newid = response.data;
      setSection([
        ...section,
        {
          secid: newid,
          secname: value,
        },
      ]);
      toast.success("Thêm thành công");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Thực hiện thất bại");
      }
    }
  }
  //end add section

  //del section
  const handleDelSecion = async (secid) => {
    try {
      const response = await delSection(secid);
      setOpenConfirm(false);
      var dsid = response.data;
      const updatedSec = section.filter(s => s.secid !== dsid);
      setSection(updatedSec);
      toast.success("Xóa thành công");
    } catch (error) {
      toast.error("Xóa không thành công");
      console.log(error);
    }
  }
  //end del section

  //edit section
  const handleUpdateSecion = async (secid, newname) => {
    try {

      const response = await updateSection(secid, newname);

      if (response.data === secid) {
        setSection(prev =>
          prev.map(section => section.secid === secid ? { ...section, secname: newname } : section)
        );
        toast.success("Chỉnh sửa thành công");
      } else {
        toast.error("Có lỗi xảy ra khi cập nhật ngân hàng");
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
      toast.error("Lỗi hệ thống");
    }
  }
  //end edit section

  //section tool
  const unSelect = () => {
    setSelectedQuestions([]);
  }

  const handleSelectSection = (secid) => {
    setSecid(secid);
  }
  //End section tool
  //End Section handle

  //Question handle
  //load question
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getQuestions(secid);
        if (secid !== -1) {
          setQloading(false);
        }
        setQuestions(response.data);
        setIsQueslimit(checkLimit('ques', questions.length));

      } catch (error) {
        console.error('Error fetching banks:', error);
        // Handle error here
      }
    };

    fetchData();
  }, [secid])
  //End Question handle

  //filter
  const [qlfilter, setQlfilter] = useState(questions);
  const [qtypef, setQtypef] = useState(0);
  const [qmodef, setQmodef] = useState(0);
  const [qsearch, setQsearch] = useState('');

  const handleChangeQtypef = (value) => {
    setQtypef(value);
    setQmodef(0);
  }

  useEffect(() => {

    let filteredQuestions = questions;

    if (qsearch.length !== 0) {
      const searchQuery = qsearch.toLowerCase();
      filteredQuestions = filteredQuestions.filter(q => q.title.toLowerCase().includes(searchQuery));
    }

    if (qtypef !== 0) {
      filteredQuestions = filteredQuestions.filter(q => q.type === qtypef);
      if (qmodef !== 0) {
        filteredQuestions = filteredQuestions.filter(q => q.mode === qmodef);
      }
    }

    setQlfilter(filteredQuestions);


  }, [qtypef, qmodef, qsearch, questions]);

  //end filter

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

  const handleAddQuestion = async () => {
    if (isqueslimit) {
      toast.error("Đã đạt giới hạn");
    } else {
      const newId = await addQuestion();
      setQuestions([
        ...questions,
        {
          id: newId,
          title: '',
          answers: [
            { id: 'answer1', content: '' },
          ],
          type: 1,
          solution: 'hướng dẫn giải',
          mode: 1,
        },
      ]);

      setEditingQuestionId(newId);
      setModalIsOpen(true);
      setIsAddQuestion(true);
    }


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
    setModalIsOpen(false);
    setIsAddQuestion(false);
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








  // useEffect(() => {
  //   //load 10 question first
  // })

  // useEffect(() => {
  //   const qlistitemElement = document.querySelector('.qlistitem');
  //   qlistitemElement.addEventListener('scroll', handleScroll);

  //   return () => {
  //     qlistitemElement.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (isEndOfPage) {
  //     // Gọi hàm để load thêm câu hỏi ở đây
  //     loadMoreQuestions();
  //   }
  // }, [isEndOfPage]);

  // const loadMoreQuestions = async () => {
  //   try {
  //     // Gọi API để lấy thêm câu hỏi
  //     const response = await fetch('API_URL');
  //     const data = await response.json();

  //     // Cập nhật state questions bằng cách thêm câu hỏi mới vào mảng questions hiện có
  //     setQuestions(prevQuestions => [...prevQuestions, ...data.questions]);
  //   } catch (error) {
  //     console.error('Error loading more questions:', error);
  //   }
  // };



  // const handleScroll = () => {
  //   const windowHeight = window.innerHeight;
  //   const documentHeight = document.documentElement.scrollHeight;
  //   const scrollTop = window.scrollY;
  //   const scrolledToBottom = Math.ceil(scrollTop + windowHeight) >= documentHeight;

  //   if (scrolledToBottom) {
  //     setIsEndOfPage(true);
  //   } else {
  //     setIsEndOfPage(false);
  //   }
  // };


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
              <input type="search" placeholder="Search" className="search-field" onChange={(event) => setQsearch(event.target.value)} name="search" />
              {/* <img src="/search.png" alt='search icon' className='searchicon'/> */}
            </div>

            <select className="filter" name="questype" onChange={(event) => handleChangeQtypef(parseInt(event.target.value))}>
              <option value='0'>Tất cả</option>
              <option value='1'>Trắc nghiệm</option>
              <option value='2'>Tự luận</option>
            </select>

            {qtypef === 1 && (
              <select className="filter" name="mutitype" onChange={(event) => setQmodef(parseInt(event.target.value))}>
                <option value='0'>Tất cả</option>
                <option value='1'>Nhận biết</option>
                <option value='2'>Thông hiểu</option>
                <option value='3'>Vận dụng</option>
              </select>
            )}

            {qtypef === 2 && (
              <select className="filter" name="essaytype" onChange={(event) => setQmodef(parseInt(event.target.value))}>
                <option value='0'>Tất cả</option>
                <option value='4'>Dễ</option>
                <option value='5'>Trung bình</option>
                <option value='6'>Nâng cao</option>
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
              {bankType === '0' ? (<><span className='tool-item'><TiWarningOutline /></span></>) : qloading ? (
                <>
                  <span className='tool-item' ><FaRegTrashCan></FaRegTrashCan></span>
                  <span className='tool-item' ><FaPlus></FaPlus></span>
                  <span className='tool-item' ><FaRegFileWord></FaRegFileWord></span>
                  <span className='tool-item' ><FaRegFileExcel></FaRegFileExcel></span>
                </>
              ) : (
                <>
                  <span className='tool-item' onClick={deleteQuestions}><FaRegTrashCan></FaRegTrashCan></span>
                  <span className='tool-item' onClick={handleAddQuestion}><FaPlus></FaPlus></span>
                  <span className='tool-item' onClick={open2}><FaRegFileWord></FaRegFileWord></span>
                  <span className='tool-item' onClick={open1}><FaRegFileExcel></FaRegFileExcel></span>
                </>

              )}

            </div>


            <div className='qlistitem'>
              {qloading ? (
                <div style={{ marginTop: '30px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><HashLoader color='#282cc0' /></div>
              ) :
                qlfilter.length === 0 ?
                  (
                    <div style={{ marginTop: '30px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <GoInbox />
                      <span>Không có dữ liệu</span>
                    </div>
                  ) : (
                    qlfilter.map((question, index) => (
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
                    ))
                  )}

              {/* Hiển thị loading khi đang tải dữ liệu */}
              {/* {loading && <HashLoader />} */}

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
              {bankType === '0' ?
                (<><span style={{ textAlign: 'center', width: '100%', fontWeight: '600' }}>Bạn không có quyền chỉnh sửa nội dung này</span></>) :
                (
                  <>
                    <PopupCreateModel isactive={isactive} islimit={islimit} title={'Thêm bài'} handlesuccess={handleAddSecion} buttonstyle={<span className='tool-item'><FaPlus></FaPlus></span>}></PopupCreateModel>
                    <span className='tool-item' onClick={() => handleOpen()}><FaEdit></FaEdit></span>
                    {open && (
                      <div className="popup-model">
                        <div className="popup-container">

                          <div className="popup-title">
                            <span className="title">Chỉnh sửa tên hiển thị</span>
                            <div className="popup-close" onClick={() => setOpen(false)}><IoClose /></div>
                          </div>

                          <div className="popup-edit">
                            <span className="popup-edit-title"><span style={{ color: "red" }}>*</span>Tên hiển thị</span>
                            <input type="text" className="popup-edit-input" required onChange={(e) => setIntitle(e.target.value)} />
                          </div>
                          <div className="popup-finish">
                            <div className="popup-cancel" onClick={() => handleClose()}>Hủy</div>
                            {
                              intitle.length !== 0
                                ? (<div className="popup-success" onClick={() => handleSuccess(secid, intitle)}>Thêm</div>)
                                : (<div className="popup-success" style={{ backgroundColor: 'rgb(156, 161, 165)' }}>Thêm</div>)
                            }

                          </div>
                        </div>
                      </div>
                    )}

                    <span className='tool-item' onClick={() => setOpenConfirm(true)}><FaRegTrashCan></FaRegTrashCan></span>
                    {
                      openconfirm &&
                      <div className="fixed z-9 inset-0 flex items-center justify-center">
                        <div className="absolute rounded-lg p-8 border border-gray-300 shadow-md" style={{ backgroundColor: '#f3f4f6', backdropFilter: 'blur(4px)' }}>
                          <p>Bạn có muốn tiếp tục ? Tất cả dữ liệu liên quan sẽ bị xóa !</p>
                          <div className="mt-4 flex justify-center">
                            <button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => {
                              handleDelSecion(secid);
                            }}>Có</button>
                            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" onClick={() => handleClose()}>Không</button>
                          </div>
                        </div>
                      </div>
                    }
                  </>
                )}

            </div>

            <div className="section-list">
              {loading ? (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
                  <MoonLoader color="hsla(224, 100%, 46%, 1)" size={50} />
                </div>
              ) : (
                section.length === 0 ? (
                  <div style={{ marginTop: '30px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <GoInbox />
                    <span>Không có dữ liệu</span>
                  </div>
                ) : (
                  section.map((sec) => (
                    <div key={sec.secid} className={`sectionitem ${secid === sec.secid ? 'selected' : ''}`} onClick={() => handleSelectSection(sec.secid)}>
                      {sec.secname}
                    </div>
                  ))
                )
              )}
            </div>


          </div>
        </div>
      </div>
    </>
  );
};

export default Section;