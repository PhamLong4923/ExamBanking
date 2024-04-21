import { CloseCircleOutlined, DeleteOutlined, FileExcelOutlined, FileWordOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Menu, Modal, Popconfirm, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addSection, delSection, getSection, updateSection } from '../../../services/Api';
import SystemQuestion from '../../common/SystemQuestion';

const { Option } = Select;

const AdminSection = () => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
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
        // {
        //     secid: 1,
        //     secname: "bài 1: phương trình đa thức bậc hai",
        //     repoid: 1,
        // },
        // {
        //     secid: 2,
        //     secname: "bài 2: phương trình bậc nhất hai ẩn",
        //     repoid: 1,
        // },
        // {
        //     secid: 3,
        //     secname: "bài 1: cơ bản về đồ thị",
        //     repoid: 2,
        // },
        // {
        //     secid: 4,
        //     secname: "bài 2: đồ thị hàm số của phương trình bậc hai",
        //     repoid: 2,
        // },
        // {
        //     secid: 5,
        //     secname: "Lession 1: how many peoples in your family?",
        //     repoid: 3,
        // },
        // {
        //     secid: 6,
        //     secname: "Lession 2: external family members",
        //     repoid: 3,
        // },
        // {
        //     secid: 7,
        //     secname: "Lession 1: world",
        //     repoid: 4,
        // },
        // {
        //     secid: 8,
        //     secname: "Lession 2: languages",
        //     repoid: 4,
        // },
    ])

    useEffect(() => {
        const loadRepos = async () => {
            try {
                const response = await getSection(parseInt(repoId));
                setSections(response.data);
                setLoading(false);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setSections([]);
                    setLoading(false);
                    // errors("Nguyễn Ngọc Việt", 2);
                } else {
                    // errors(SYSTEM_ERROR_MESSAGE, 2);
                    console.log(error);
                }
            }
        };
        loadRepos();
    }, []);

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

    const handleOk = async () => {
        try {
            form
                .validateFields()
                .then((values) => {
                    form.resetFields();
                    if (editingSectionId !== "" && editingSectionId !== null) { // Nếu đang chỉnh sửa
                        const newData = [...sections];
                        const index = newData.findIndex((item) => editingSectionId === item.secid);
                        if (index > -1) {
                            const fakeData = async () => {
                                const item = newData[index];
                                const res = await updateSection(editingSectionId, values.secname);
                                newData.splice(index, 1, { ...item, ...values });
                                setSections(newData);
                                setEditingSectionId('');
                                setVisible(false);
                            }
                            fakeData();
                        }
                    } else { // Nếu thêm 
                        let newid;
                        const fakeData = async () => {
                            const res = await addSection({ secname: values.secname, repoid: repoId });
                            newid = res.data;
                            setSections([...sections, { ...values, secid: newid, repoid: repoId }]);
                            setVisible(false);
                        }
                        fakeData();
                        // const newItem = sections.find(item => item.secid == newid);
                        // if (newItem && !sections.some(item => item.repoid == newItem.repoid)) {
                        //     setSelectedSectionId(parseInt(newid));
                        // }
                    }
                })
                .catch((info) => {
                    console.log('Validate Failed:', info);
                });
        } catch (error) {
            console.error(error);
        }
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


    const handleDelete = async (keyToDelete) => {
        try {
            const res = await delSection(keyToDelete);
            const did = res.data;
            const newData = sections.filter(item => item.secid !== keyToDelete);
            setSections(newData);
            setSelectedSectionId(null);
        } catch (error) {
            console.error(error);
        }
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

    const handleAddQuestion = async () => {
        try {
            if (!sections.some(item => parseInt(item.repoid) === parseInt(repoId))) {
                toast.error("vui lòng tạo bài");
            } else if (typeof selectedSectionId !== "number") {
                toast.error("vui lòng chọn bài để add")
            }
            else {
                // const res = await
                // const newid = res.data
                const newId = (questions.length + 1).toString();
                const newQuestion = {
                    quesid: newId,
                    quescontent: '',
                    answers: [
                        { ansid: 1, anscontent: '' },
                    ],
                    type: "1",
                    solution: 'hướng dẫn giải',
                    modeid: "1",
                    sectionId: selectedSectionId,
                };

                setQuestions([...questions, newQuestion]);

                setEditingQuestionId(newId);
                setModalIsOpen(true);
                setIsAddQuestion(true);
            }
        } catch (error) {
            console.error(error)
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
                question.quesid === questionId ?
                    {
                        ...question, answers: question.answers.map((answer, index) =>
                            index === answerIndex ? { ...answer, anscontent: newAnswer } : answer
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
                question.quesid === questionId ? { ...question, quescontent: newTitle } : question
            )
        );
    };

    const handleEditSolution = (questionId, newSolution) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
                question.quesid === questionId ? { ...question, solution: newSolution } : question
            )
        );
    };

    const handleQuestionModeChange = (questionId, newMode) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
                question.quesid === questionId ? { ...question, modeid: newMode } : question
            )
        );
    };

    const handleDeleteQuestion = (questionId) => {
        const updatedQuestions = questions.filter((question) => question.quesid !== questionId);
        setQuestions(updatedQuestions);
        setEditingQuestionId(null);
    };

    const deleteAnswer = (questionId, answerId) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
                question.quesid === questionId
                    ? { ...question, answers: question.answers.filter((answer) => answer.quesid !== answerId) }
                    : question
            )
        );
    };

    const addAnswer = (questionId) => {
        setQuestions(() =>
            questions.map((question) =>
                question.quesid === questionId
                    ? { ...question, answers: [...question.answers, { ansid: question.answers.length, anscontent: '' }] }
                    : question
            )
        );
        console.log("mảng mới sau khi thêm đáp án:", questions);
    };

    const handleQuestionTypeChange = (questionId, selectedType) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
                question.quesid === questionId ? { ...question, type: selectedType, modeid: "1" } : question
            )
        );
        if (selectedType === "2") {
            setQuestions((prevQuestions) =>
                prevQuestions.map((question) =>
                    question.quesid === questionId ? { ...question, answers: [], modeid: "5" } : question //cho mảng question thành null
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
                <Menu
                    onClick={({ key }) => handleClick(key)}
                >
                    {sections.filter(item => parseInt(item.repoid) === parseInt(repoId)).map(section => (
                        <Menu.Item key={section.secid}>
                            <span style={{ flex: 1 }}>
                                {section.secname}
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
                    <Form.Item label="Tên" name="secname" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
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
                            isSelected={selectedQuestions.includes(question.quesid)}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default AdminSection;
