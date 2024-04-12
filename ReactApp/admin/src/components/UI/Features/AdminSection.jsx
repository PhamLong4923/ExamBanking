import { CloseCircleOutlined, DeleteOutlined, FileExcelOutlined, FileWordOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Menu, Modal, Select, Space } from 'antd';
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
        // }
    ]);
    const [sections, setSections] = useState([
        {
            key: 1,
            name: "bài 1: phương trình đa thức bậc hai",
            repoId: 1,
            questions: [],
        },
        {
            key: 2,
            name: "bài 2: phương trình bậc nhất hai ẩn",
            repoId: 1,
            questions: [],
        },
        {
            key: 3,
            name: "bài 1: cơ bản về đồ thị",
            repoId: 2,
            questions: [],
        },
        {
            key: 4,
            name: "bài 2: đồ thị hàm số của phương trình bậc hai",
            repoId: 2,
            questions: [],
        },
        {
            key: 5,
            name: "Lession 1: how many peoples in your family?",
            repoId: 3,
            questions: [],
        },
        {
            key: 6,
            name: "Lession 2: external family members",
            repoId: 3,
            questions: [],
        },
        {
            key: 7,
            name: "Lession 1: world",
            repoId: 4,
            questions: [],
        },
        {
            key: 8,
            name: "Lession 2: languages",
            repoId: 4,
            questions: [],
        },
    ])

    const showModal = () => {
        form.resetFields();
        setVisible(true);
    };

    const handleClick = (key) => {
        setSelectedSectionId(key);
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
                        questions: [],
                    };
                    setSections([...sections, newSection]);
                    setVisible(false);
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

    const handleEdit = (record) => {
        form.setFieldsValue(record);
        setEditingSectionId(record.key);
        setVisible(true);
    };

    const toastVerifyDelete = (key) => {
        setVisible(false);
        if (!isToastOpen) {
            const id = toast.info(
                <div>
                    Are you sure want to delete?
                    <div className='toast-buttons'>
                        <Flex gap="middle">
                            <Button onClick={() => {
                                toast.dismiss(id);
                                setIsToastOpen(false);
                            }}>
                                Cancel
                            </Button>
                            <Button onClick={() => handleDelete(key, id)}>
                                Yes
                            </Button>
                        </Flex>
                    </div>
                </div>,
                { onClose: () => setIsToastOpen(false) }
            );
            setIsToastOpen(true);
        }
    };

    const handleDelete = (keyToDelete, toastId) => {
        const newData = sections.filter(item => item.key !== keyToDelete);
        for (let i = 0; i < newData.length; i++) {
            if (parseInt(newData[i].key) > parseInt(keyToDelete)) {
                newData[i].key = (parseInt(newData[i].key) - 1).toString();
            }
        }
        setSections(newData);
        toast.dismiss(toastId);
        setIsToastOpen(false);
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
        if (sections.length < selectedSectionId) {
            toast.error("vui lòng tạo và chọn bài trước");
        } else {
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

            const updatedSections = [...sections];
            updatedSections[selectedSectionId - 1].questions.push(newId);
            setSections(updatedSections);

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

        const updatedSections = [...sections];
        updatedSections.forEach((section) => {
            section.questions = section.questions.filter((id) => id !== questionId);
        });
        setSections(updatedSections);

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
            <div style={{ flex: '40%', marginRight: '10px', minHeight: '500px' }}>
                <Space>
                    <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>Thêm bài</Button>
                </Space>
                <Menu onClick={({ key }) => handleClick(key)} defaultSelectedKeys={[selectedSectionId]}>
                    {sections.filter(item => parseInt(item.repoId) === parseInt(repoId)).map(section => (
                        <Menu.Item key={section.key}>
                            <Flex gap="middle" style={{ width: '100%' }}>
                                <span style={{ flex: 1 }}>
                                    {section.name}
                                </span>
                                <Button style={{ marginLeft: 'auto', margin: 'auto' }} onClick={() => handleEdit(section)}>Edit</Button>
                                <Button style={{ marginLeft: '8px', margin: 'auto' }} onClick={() => toastVerifyDelete(section.key)}>Delete</Button>
                            </Flex>
                        </Menu.Item>
                    ))}
                </Menu>
            </div>

            <Modal
                title={editingSectionId !== null ? "Edit User" : "Add User"}
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the name!' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

            <div style={{ flex: '60%', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
                <div style={{ marginBottom: '24px', textAlign: 'right' }}>
                    {isSelecting ? (
                        <Space>
                            <span>Số lượng câu hỏi đã chọn: {selectedQuestions.length}</span>
                            <Button type="primary" icon={<CloseCircleOutlined />} onClick={handleClearSelection}>Bỏ chọn</Button>
                            <Button type="primary" icon={<DeleteOutlined />}>Xóa câu hỏi</Button>
                            <Button type="primary" onClick={toggleSelecting}>Thoát</Button>
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
