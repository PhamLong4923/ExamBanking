import React, { useState, useEffect } from 'react';
import { Input, Select, Button, Space, Collapse, Typography, List, Spin, Empty } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, BulbOutlined, CloseOutlined } from '@ant-design/icons';
import ConfirmationModal from '../../../components/ui/confirmModel';
import MyBreadCrumb from '../../../components/ui/breadcrumb';
import setLimit from '../../../ultils/setlimit';
import { useSelector } from 'react-redux';
import { AUTHORIZATION_ERROR_MESSAGE, SYSTEM_BANK, SYSTEM_ERROR_MESSAGE, SYSTEM_SUCCESS_MESSAGE, SYSTEM_LIMIT_MESSAGE, SYSTEM_WARNING_MESSAGE_NOSELECT } from '../../../share/constrains';
import { success, errors, warning } from '../../../components/ui/notifications';
import { getSection, addSection, updateSection, delSection, getQuestions, delQuestions, addQuestion } from '../../../services/api';
import EditModal from '../../../components/ui/editNameModel';
import QuestionModal from '../../../components/ui/createquestionmodal.jsx'
import EditQuestionModal from '../../../components/ui/editquestionmodal.jsx';
import parse from 'html-react-parser';

const { Option } = Select;
const { Panel } = Collapse;
const { Text } = Typography;

const Section = () => {
    const [filter1, setFilter1] = useState('');
    const [filter2, setFilter2] = useState('');
    const [filter3, setFilter3] = useState('');
    const [confirmationModalVisible, setConfirmationModalVisible] = useState({});
    const [confirmationModalVisible2, setConfirmationModalVisible2] = useState({});

    const [cfvisible, setCfvisible] = useState(false);

    const [isallow, setIsallow] = useState(false);
    const bankType = useSelector(state => state.bankType);
    const repoId = useSelector(state => state.repoId);

    const [secloading, setSecloading] = useState(true);
    const [quesloading, setQuesloading] = useState(true);

    const [seclimit, setSeclimit] = useState(false);
    const [queslimit, setQueslimit] = useState(false);

    const [addsecmodal, setAddSecModal] = useState(false);
    const [addquesmodal, setAddQuesModal] = useState(false);

    const [editsecmodal, setEditSecModal] = useState(false);
    const [editquesid, setEditQuesId] = useState(null);

    const [selectSec, setSelectSec] = useState(null);

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (bankType === SYSTEM_BANK) {
            setIsallow(true);
        }
    })

    const handleConfirmAction = () => {
        // Logic when action is confirmed
        setConfirmationModalVisible(false);
    };

    const handleCancelAction = () => {
        // Logic when action is cancelled
        setConfirmationModalVisible(false);
    };

    const [sections, setSections] = useState([
        // { id: 1, title: 'Item 1', description: 'Description for item 1' },


    ]);
    //==========================Section Tool Area==========================//
    useEffect(() => {
        const loadSection = async () => {
            try {
                const response = await getSection(repoId);
                setSections(response.data);

                setSeclimit(await setLimit('sec', response.data.length))
                setSecloading(false);

            } catch (error) {
                console.error('Error fetching banks:', error);
                // Handle error here
            }
        };

        loadSection();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const isSecLimitReached = await setLimit('sec', sections.length);
            setSeclimit(isSecLimitReached);
        };

        fetchData();
    }, [sections]);


    const handleAddSection = async (id, value) => {
        try {
            const response = await addSection({ secname: value, repoid: id });
            var newid = response.data;
            setSections([
                ...sections,
                {
                    secid: newid,
                    secname: value,
                },
            ]);
            setAddSecModal(false);
            success(SYSTEM_SUCCESS_MESSAGE, 2);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                errors(SYSTEM_ERROR_MESSAGE, 2);
            }
            if (error.response && error.response.status === 401) {
                errors(AUTHORIZATION_ERROR_MESSAGE, 2);
            }
        }
    }

    const handleEditSection = async (id, value) => {
        try {

            const response = await updateSection(id, value);

            if (response.data === id) {
                setSections(prev =>
                    prev.map(sections => sections.secid === id ? { ...sections, secname: value } : sections)
                );
                setEditSecModal(false);
                success(SYSTEM_SUCCESS_MESSAGE, 2);
            } else {
                errors(SYSTEM_ERROR_MESSAGE, 2);
            }
        } catch (error) {
            console.error("Đã xảy ra lỗi:", error);
            errors(SYSTEM_ERROR_MESSAGE, 2);
        }
    }

    const handleDeleleteSecion = async (secid) => {
        try {
            const response = await delSection(secid);
            var dsid = response.data;
            const updatedSec = sections.filter(s => s.secid !== dsid);
            setSections(updatedSec);
            setCfvisible(false);
            success(SYSTEM_SUCCESS_MESSAGE, 2);
        } catch (error) {
            errors(SYSTEM_ERROR_MESSAGE, 2);
            console.log(error);
        }
    }

    const handleOpenAddSecModel = (limit) => {
        if (limit === true) {
            warning(SYSTEM_LIMIT_MESSAGE, 2);
        } else {
            setAddSecModal(true);
        }
    }

    const handleOpenEditSecModal = () => {
        if (selectSec === null) {
            warning(SYSTEM_WARNING_MESSAGE_NOSELECT, 2)
        } else {
            setEditSecModal(true);
        }
    }

    const handleOpenDeleteSecModal = () => {
        if (selectSec === null) {
            warning(SYSTEM_WARNING_MESSAGE_NOSELECT, 2)
        } else {
            setCfvisible(true);
        }
    }
    //==========================End Section Tool Area==========================//


    //==========================Question Tool Area==========================//

    const loadQuestions = async (id) => {
        try {

            const response = await getQuestions(id);

            setQuestions(response.data);
            setQueslimit(await setLimit('ques', questions.length));

        } catch (error) {
            errors(SYSTEM_ERROR_MESSAGE, 2);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const isQuesLimitReached = await setLimit('sec', questions.length);
            setSeclimit(isQuesLimitReached);
        };

        fetchData();
    }, [questions]);


    const handleOpenQuesModal = () => {
        if (selectSec !== null) {
            if (queslimit) {
                warning(SYSTEM_LIMIT_MESSAGE, 2);
                return;
            }
            setAddQuesModal(true);
        } else {
            warning(SYSTEM_WARNING_MESSAGE_NOSELECT, 2);
        }

    }

    const handleCancelQuesModal = () => {
        setAddQuesModal(false);
    }

    const handleOnSaveQues = async (data) => {
        try {
            const response = await addQuestion({
                quescontent: data.content, type: parseInt(data.type), solution: data.solution,
                modeid: parseInt(data.difficulty), secid: selectSec, answers: data.answers
            });
            const newQuestion = response.data;
            console.log(newQuestion);

            // Cập nhật state questions bằng cách thêm câu hỏi mới vào mảng hiện tại
            setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error(error);
        }
    }


    const handleDeleteQuestion = async (id) => {
        try {
            const response = await delQuestions(id);
            var dqid = response.data;
            const updatedQuestions = questions.filter(question => question.quesid !== id);
            setQuestions(updatedQuestions);
            success(SYSTEM_SUCCESS_MESSAGE, 2);
            setConfirmationModalVisible(false);
        } catch (error) {
            errors(SYSTEM_ERROR_MESSAGE, 2);
        }
    };

    const handleOpenEditQuestion = (id) => {
        setEditQuesId(id);
    };

    const handleSaveEditQues = (newdata) => {
        const updatedQuestions = questions.map(question => {
            if (question.quesid === newdata.quesid) {
                return newdata; // Thay thế dữ liệu mới cho dữ liệu cũ
            } else {
                return question; // Giữ nguyên dữ liệu cũ cho các câu hỏi khác
            }
        });
        setEditQuesId(null);
        setQuestions(updatedQuestions);
        success(SYSTEM_SUCCESS_MESSAGE, 2);
    }


    //==========================End Question Tool Area==========================//




    const handleFilter1Change = (value) => {
        setFilter1(value);
        if (value === '1') {
            setFilter2('');
            setFilter3('');
        }
    };

    const handleFilter2Change = (value) => {
        setFilter2(value);
    };

    const handleFilter3Change = (value) => {
        setFilter3(value);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { id: questions.length + 1, question: '', answers: [''], solution: '' }]);
    };





    const handleItemClick = (id) => {
        setSelectSec(id === selectSec ? null : id);
        loadQuestions(id);
    };

    const handleDeleteSection = (id) => {
        const updateSection = sections.filter(s => s.id !== id);
        setSections(updateSection);
        setConfirmationModalVisible2(false);
    }



    if (editquesid !== null) {
        return (
            <>
                <EditQuestionModal qdata={questions.find(q => q.quesid === editquesid)} onCancel={() => setEditQuesId(null)} onSave={handleSaveEditQues}></EditQuestionModal>
            </>
        )
    } else {
        return (
            <>
                <MyBreadCrumb path={3}></MyBreadCrumb>
                <div style={{ display: 'flex', height: '80vh' }}>

                    {/* Phần 7/10 */}
                    <div style={{ flex: '70%', padding: '20px' }}>

                        <div style={{ marginBottom: '20px' }}>
                            <Input placeholder="Search" style={{ width: '200px', marginRight: '10px' }} />
                            <Select value={filter1} onChange={handleFilter1Change} style={{ width: '120px', marginRight: '10px' }}>
                                <Option value="1">Trắc nghiệm</Option>
                                <Option value="2">Tự luận</Option>
                                <Option value="3">Tất cả</Option>
                            </Select>
                            {filter1 === '1' && (
                                <Select value={filter2} onChange={handleFilter2Change} style={{ width: '120px', marginRight: '10px' }}>
                                    <Option value="1">Nhận biết</Option>
                                    <Option value="2">Thông hiểu</Option>
                                    <Option value="3">Vận dụng</Option>
                                    <Option value="4">Vận dụng cao</Option>
                                </Select>
                            )}
                            {filter1 === '2' && (
                                <Select value={filter3} onChange={handleFilter3Change} style={{ width: '120px', marginRight: '10px' }}>
                                    <Option value="5">Dễ</Option>
                                    <Option value="6">Trung bình</Option>
                                    <Option value="7">Khó</Option>
                                    <Option value="8">Nâng cao</Option>
                                </Select>
                            )}
                        </div>
                        <div style={{ height: '30px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
                            <Space>

                                <Button onClick={() => handleOpenQuesModal()} type="text" icon={<PlusOutlined />} style={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />

                            </Space>
                            <QuestionModal open={addquesmodal} onSave={handleOnSaveQues} onCancel={handleCancelQuesModal} secid={selectSec} ></QuestionModal>
                        </div>
                        <div style={{ height: '90%', overflowY: 'auto' }}>
                            {questions.map((question) => (
                                <Collapse key={question.quesid} style={{ marginBottom: '10px' }}>
                                    <Panel
                                        header={(
                                            <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>
                                                    <Text>{parse(question.quescontent)}</Text>
                                                </div>

                                                <Space >
                                                    <Button type="text" icon={<BulbOutlined />} />
                                                    <Button type="text" icon={<EditOutlined />} onClick={() => handleOpenEditQuestion(question.quesid)} />
                                                    <Button onClick={() => setConfirmationModalVisible(prevState => ({ ...prevState, [question.quesid]: true }))} type="text" icon={<DeleteOutlined />} />
                                                    <ConfirmationModal isvisible={confirmationModalVisible[question.quesid]} onCancel={() => setConfirmationModalVisible(prevState => ({ ...prevState, [question.quesid]: false }))} onOk={() => handleDeleteQuestion(question.quesid)} />

                                                </Space>


                                            </Space>
                                        )}
                                    >
                                        <div style={{ flex: '70%', padding: '20px', overflowY: 'auto' }}>
                                            {question.answers.map((answer, idx) => (
                                                <div key={idx}>
                                                    <Text>{parse(answer.anscontent)}</Text>
                                                </div>
                                            ))}

                                            {question.solution && (
                                                <div style={{ marginTop: '10px', maxHeight: '300px', overflowY: 'auto', backgroundColor: 'azure' }}>
                                                    <Collapse ghost>
                                                        <Panel header="Solution" key="1">
                                                            <Text>{parse(question.solution)}</Text>
                                                        </Panel>
                                                    </Collapse>
                                                </div>
                                            )}
                                        </div>

                                    </Panel>
                                </Collapse>
                            ))}
                        </div>
                    </div>
                    {/* Phần 3/10 */}
                    <div style={{ flex: '30%', padding: '20px', borderLeft: '1px solid #ccc', flexDirection: 'column' }}>
                        <div style={{ height: '30px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
                            <Space>
                                <Button onClick={() => handleOpenAddSecModel(seclimit)} type="text" icon={<PlusOutlined />} style={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                                <Button onClick={() => handleOpenEditSecModal()} type="text" icon={<EditOutlined />} style={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                                <Button onClick={() => handleOpenDeleteSecModal()} type="text" icon={<DeleteOutlined />} style={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                                <ConfirmationModal isvisible={confirmationModalVisible2[selectSec]} onCancel={() => setConfirmationModalVisible2(prevState => ({ ...prevState, [selectSec]: false }))} onOk={() => handleDeleteSection(selectSec)} />
                            </Space>
                            {/*============Modal Space============*/}
                            <EditModal
                                title={'Nhập tên bài'}
                                visible={addsecmodal}
                                onCancel={() => setAddSecModal(false)}
                                onOk={handleAddSection}
                                id={repoId}

                            />

                            <EditModal
                                title={'Nhập tên bài'}
                                visible={editsecmodal}
                                onCancel={() => setEditSecModal(false)}
                                onOk={handleEditSection}
                                id={selectSec}

                            />

                            <ConfirmationModal
                                isvisible={cfvisible}
                                onCancel={() => setCfvisible(false)}
                                onOk={() => handleDeleleteSecion(selectSec)}
                            />
                            {/*============Modal Space============*/}
                        </div>

                        <div style={{ marginBottom: '20px', overflowY: 'auto', height: '98%' }}>
                            <List
                                dataSource={sections}
                                loading={false}
                                locale={{ emptyText: <Empty description="Không có dữ liệu" /> }}
                                renderItem={item => (
                                    <Button
                                        type={selectSec === item.secid ? 'primary' : 'default'}
                                        onClick={() => handleItemClick(item.secid)}
                                        style={{ marginTop: '10px', textAlign: 'left', width: '100%' }}
                                    >
                                        <div>
                                            <Text strong>{item.secname}</Text>
                                        </div>
                                    </Button>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </>

        );
    }


};

export default Section;
