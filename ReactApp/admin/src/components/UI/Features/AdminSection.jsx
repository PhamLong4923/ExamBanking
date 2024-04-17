import { CloseCircleOutlined, DeleteOutlined, FileExcelOutlined, FileWordOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Menu, Modal, Popconfirm, Select, Space } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SystemQuestion from '../../common/SystemQuestion';

const { Option } = Select;

const AdminSection = () => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [selectedSectionId, setSelectedSectionId] = useState();
    const [isSelecting, setIsSelecting] = useState(false);
    const [isqueslimit, setIsQueslimit] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isAddQuestion, setIsAddQuestion] = useState(false);
    const [editingQuestionId, setEditingQuestionId] = useState('');
    const [editingSectionId, setEditingSectionId] = useState(null);
    const { repoId } = useParams();
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
        //   sectionId;
        // }
    ]);
    const [sections, setSections] = useState([
        {
            key: 1,
            name: "bài 1: phương trình đa thức bậc hai",
            repoId: 1,
        },
        {
            key: 2,
            name: "bài 2: phương trình bậc nhất hai ẩn",
            repoId: 1,
        },
        {
            key: 3,
            name: "bài 1: cơ bản về đồ thị",
            repoId: 2,
        },
        {
            key: 4,
            name: "bài 2: đồ thị hàm số của phương trình bậc hai",
            repoId: 2,
        },
        {
            key: 5,
            name: "Lession 1: how many peoples in your family?",
            repoId: 3,
        },
        {
            key: 6,
            name: "Lession 2: external family members",
            repoId: 3,
        },
        {
            key: 7,
            name: "Lession 1: world",
            repoId: 4,
        },
        {
            key: 8,
            name: "Lession 2: languages",
            repoId: 4,
        },
    ])

    const showModal = () => {
        form.resetFields();
        setVisible(true);
    };

    const handleClick = (key) => {
        setSelectedSectionId(parseInt(key));
    };

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

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                form.resetFields();
                if (editingSectionId !== "" && editingSectionId !== null) { // Nếu đang chỉnh sửa
                    const newData = [...sections];
                    const index = newData.findIndex((item) => editingSectionId === item.key);
                    if (index > -1) {
                        const item = newData[index];
                        newData.splice(index, 1, { ...item, ...values });
                        setSections(newData);
                        setEditingSectionId(null);
                        setVisible(false);
                    }
                } else { // Nếu thêm mới
                    const newSection = {
                        key: sections.length + 1,
                        name: values.name,
                        repoId: repoId,
                    };
                    setSections([...sections, newSection]);
                    setVisible(false);
                    if (sections.every(item => item.repoId !== newSection.repoId)) {
                        setSelectedSectionId(newSection.key);
                    }
                }
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        form.resetFields();
        setEditingSectionId(null);
        setVisible(false);
    };

    const handleEdit = (sectionId) => {
        form.setFieldsValue(sectionId);
        setEditingSectionId(sectionId);
        setVisible(true);
    };


    const handleDelete = (keyToDelete) => {
        const newData = sections.filter(item => item.key !== keyToDelete);
        const newQuestion = questions.filter(item => item.sectionId !== keyToDelete);
        for (let i = 0; i < newData.length; i++) {
            if (parseInt(newData[i].key) > parseInt(keyToDelete)) {
                for (let j = 0; j < newQuestion.length; j++) {
                    if (parseInt(newQuestion[j].sectionId) === parseInt(newData[i].key)) {
                        newQuestion[j].sectionId = (parseInt(newData[i].key) - 1);
                    }
                }
                newData[i].key = (parseInt(newData[i].key) - 1);
            }
        }

        if (newQuestion.length > 1) {
            for (let i = 0; i < newQuestion.length; i++) {
                newQuestion[i].id = "" + (i + 1);
            }
        } else if (newQuestion.length === 1) {
            newQuestion[0].id = "1";
        }
        setSections(newData);
        setQuestions(newQuestion);
        setIsToastOpen(false);
        setSelectedSectionId(null);
    };

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
        if (!sections.some(item => parseInt(item.repoId) === parseInt(repoId))) {
            toast.error("vui lòng tạo bài");
        } else if (typeof selectedSectionId !== "number") {
            toast.error("vui lòng chọn bài để add")
        }
        else {
            const newId = (questions.length + 1).toString();
            const newQuestion = {
                id: newId,
                title: '',
                answers: [
                    { id: 'answer1', content: '' },
                ],
                type: "1",
                solution: 'hướng dẫn giải',
                mode: "1",
                sectionId: selectedSectionId,
            };

            setQuestions([...questions, newQuestion]);

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
        setEditingQuestionId(null);
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
        setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
                question.id === questionId ? { ...question, type: selectedType, mode: "1" } : question
            )
        );
        if (selectedType === "2") {
            setQuestions((prevQuestions) =>
                prevQuestions.map((question) =>
                    question.id === questionId ? { ...question, answers: [], mode: "5" } : question //cho mảng question thành null
                )
            );
        }
    };

    return (
        <div style={{ display: 'flex', padding: '24px' }}>
            <div style={{ minWidth: '40%', maxWidth: '40%', marginRight: '10px', minHeight: '500px' }}>
                <Space>
                    <Flex gap="middle" style={{ width: '100%', flexWrap: 'wrap' }}>
                        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>Thêm bài</Button>
                        <Button style={{ marginLeft: 'auto', margin: 'auto' }} onClick={() => handleEdit(selectedSectionId)}>Chỉnh sửa</Button>
                        <Button style={{ marginLeft: '8px', margin: 'auto' }}>
                            <Popconfirm
                                title="Bạn có chắc chắn muốn xóa không?"
                                onConfirm={() => handleDelete(selectedSectionId)}
                                okText="Có"
                                cancelText="Không"
                            >
                                Xóa
                            </Popconfirm>
                        </Button>
                    </Flex>
                </Space>
                <Menu onClick={({ key }) => handleClick(key)}>
                    {sections.filter(item => parseInt(item.repoId) === parseInt(repoId)).map(section => (
                        <Menu.Item key={section.key}>
                            <span style={{ flex: 1 }}>
                                {section.name}
                            </span>
                        </Menu.Item>
                    ))}
                </Menu>
            </div>

            <Modal
                title={editingSectionId !== null ? "Chỉnh sửa bài" : "Tạo bài mới"}
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

            <div style={{ minWidth: '60%', maxWidth: '60%', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
                <div style={{ marginBottom: '24px', textAlign: 'right' }}>
                    {isSelecting ? (
                        <Space style={{ flexWrap: 'wrap' }}>
                            <span>Số lượng câu hỏi đã chọn: {selectedQuestions.length}</span>
                            <Button type="primary" icon={<CloseCircleOutlined />} onClick={handleClearSelection}>Bỏ chọn</Button>
                            <Button type="primary" icon={<DeleteOutlined />}>Xóa câu hỏi</Button>
                            <Button type="primary" onClick={toggleSelecting}>Thoát</Button>
                        </Space>
                    ) : (
                        <Space style={{ flexWrap: 'wrap' }}>
                            <Input placeholder="Tìm kiếm" style={{ width: '200px' }} prefix={<SearchOutlined />} />
                            <Select defaultValue="all" style={{ width: '120px' }}>
                                <Option value="all">Tất cả</Option>
                                <Option value="1">Trắc nghiệm</Option>
                                <Option value="2">Tự luận</Option>
                            </Select>
                            <Button type="primary" style={{ backgroundColor: 'white', color: 'black' }} icon={<FileExcelOutlined />}></Button>
                            <Button type="primary" style={{ backgroundColor: 'white', color: 'black' }} icon={<FileWordOutlined />}></Button>
                            <Button type="primary" style={{ backgroundColor: 'white', color: 'black' }} icon={<PlusOutlined />} onClick={handleAddQuestion}>Thêm câu hỏi</Button>
                            <Button type="primary" style={{ backgroundColor: 'white', color: 'black' }} icon={<UploadOutlined />} onClick={toggleSelecting}>Chọn câu hỏi</Button>
                        </Space>
                    )}
                </div>
                {/* Render the SystemQuestion component */}
                {
                    (
                        selectedSectionId ?
                            questions.filter(item => parseInt(item.sectionId) === parseInt(selectedSectionId))
                            : questions
                    ).map((question, index) => (
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
        </div>
    );
};

export default AdminSection;
