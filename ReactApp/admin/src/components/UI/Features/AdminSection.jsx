import { CloseCircleOutlined, DeleteOutlined, FileExcelOutlined, FileWordOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space } from 'antd';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SystemQuestion from '../../common/SystemQuestion';

const { Option } = Select;

const AdminSection = () => {
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [isSelecting, setIsSelecting] = useState(false);
    const [isqueslimit, setIsQueslimit] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isAddQuestion, setIsAddQuestion] = useState(false);
    const [editingQuestionId, setEditingQuestionId] = useState(null);

    const toggleSelecting = () => {
        setIsSelecting(!isSelecting);
    };

    const handleSelectQuestion = (questionId) => {
        if (isSelecting) {
            const selectedIndex = selectedQuestions.indexOf(questionId);
            if (selectedIndex === -1) {
                setSelectedQuestions([...selectedQuestions, questionId]);
            } else {
                const updatedSelection = [...selectedQuestions];
                updatedSelection.splice(selectedIndex, 1);
                setSelectedQuestions(updatedSelection);
            }
        }
    };

    const handleClearSelection = () => {
        setSelectedQuestions([]);
    };

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
        if (isqueslimit) {
            toast.error("Đã đạt giới hạn");
        } else {
            const newId = (questions.length + 1).toString();
            setQuestions([
                ...questions,
                {
                    id: newId,
                    title: '',
                    answers: [
                        { id: 'answer1', content: '' },
                    ],
                    type: "1",
                    solution: 'hướng dẫn giải',
                    mode: "1",
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

    const deleteAnswer = (questionId, answerId) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
                question.id === questionId
                    ? { ...question, answers: question.answers.filter((answer) => answer.id !== answerId) }
                    : question
            )
        );
    };

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
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '24px', textAlign: 'right' }}>
                {isSelecting ? (
                    <Space>
                        <span>Số lượng câu hỏi đã chọn: {selectedQuestions.length}</span>
                        <Button type="primary" icon={<CloseCircleOutlined />} onClick={handleClearSelection}>Bỏ chọn</Button>
                        <Button type="primary" icon={<DeleteOutlined />}>Xóa câu hỏi</Button>
                        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddQuestion}>Thêm câu hỏi</Button>
                    </Space>
                ) : (
                    <Space>
                        <Input placeholder="Tìm kiếm" style={{ width: '200px' }} prefix={<SearchOutlined />} />
                        <Select defaultValue="all" style={{ width: '120px' }}>
                            <Option value="all">Tất cả</Option>
                            <Option value="1">Trắc nghiệm</Option>
                            <Option value="2">Tự luận</Option>
                        </Select>
                        <Button type="primary" icon={<FileExcelOutlined />}>Import Excel</Button>
                        <Button type="primary" icon={<FileWordOutlined />}>Import Word</Button>
                        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddQuestion}>Thêm câu hỏi</Button>
                        <Button type="primary" icon={<UploadOutlined />} onClick={toggleSelecting}>Chọn câu hỏi</Button>
                    </Space>
                )}
            </div>
            {/* Render the SystemQuestion component */}
            {questions.map((question, index) => (
                <SystemQuestion
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
                    // handleSelectSection={handleSelectSection}
                    handleQuestionTypeChange={handleQuestionTypeChange}
                    handleEditSolution={handleEditSolution}
                    isAddQuestion={isAddQuestion}
                    handleQuestionModeChange={handleQuestionModeChange}
                    handleSelectQuestion={handleSelectQuestion}
                    isSelected={selectedQuestions.includes(question.id)}
                />
            ))
            }
        </div>
    );
};

export default AdminSection;
