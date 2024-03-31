import React, { useState, useEffect } from 'react';
import { Input, Select, Button, Space, Collapse, Typography, List, Spin, Empty } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, BulbOutlined } from '@ant-design/icons';
import ConfirmationModal from '../../../components/ui/confirmModel';
import MyBreadCrumb from '../../../components/ui/breadcrumb';
import setLimit from '../../../ultils/setlimit';
import { useSelector } from 'react-redux';
import { AUTHORIZATION_ERROR_MESSAGE, SYSTEM_BANK, SYSTEM_ERROR_MESSAGE, SYSTEM_SUCCESS_MESSAGE, SYSTEM_LIMIT_MESSAGE, SYSTEM_WARNING_MESSAGE_NOSELECT } from '../../../share/constrains';
import { success, errors, warning } from '../../../components/ui/notifications';
import { getSection, addSection, updateSection, delSection, getQuestions } from '../../../services/api';
import EditModal from '../../../components/ui/editNameModel';

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

    const [selectSec, setSelectSec] = useState(null);

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

                setSeclimit(setLimit('sec', sections.length))
                setSecloading(false);

            } catch (error) {
                console.error('Error fetching banks:', error);
                // Handle error here
            }
        };

        loadSection();
    }, []);

    useEffect(() => {
        setSeclimit(setLimit('sec', sections.length));
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
    useEffect(() => {
        const loadQuestions = async () => {
            try {
                if (selectSec === null) {

                }
                const response = await getQuestions(selectSec);

                setQuestions(response.data);
                setQueslimit(setLimit('ques', questions.length));

            } catch (error) {
                errors(SYSTEM_ERROR_MESSAGE, 2);
            }
        };

        loadQuestions();
    }, [selectSec]);


    //==========================End Question Tool Area==========================//

    const [questions, setQuestions] = useState([
        {
            id: 1,
            question: 'What is your favorite color? What is your favorite color? What is your favorite color? What is your favorite color? What is your favorite color?',
            answers: ['Red', 'Blue', 'Green'],
            solution: 'The solution for the favorite color question is to choose the color that you like the most.',
        },
        {
            id: 2,
            question: 'Which programming language do you prefer?',
            answers: ['JavaScript', 'Python', 'Java', 'C++'],
            solution: 'It depends on the project and personal preference. Each programming language has its strengths and weaknesses.',
        },
        {
            id: 3,
            question: 'Which programming language do you prefer?',
            answers: ['JavaScript', 'Python', 'Java', 'C++'],
            solution: 'It depends on the project and personal preference. Each programming language has its strengths and weaknesses.',
        },
        {
            id: 4,
            question: 'Which programming language do you prefer?',
            answers: ['JavaScript', 'Python', 'Java', 'C++'],
            solution: 'It depends on the project and personal preference. Each programming language has its strengths and weaknesses.',
        },
        {
            id: 5,
            question: 'Which programming language do you prefer?',
            answers: ['JavaScript', 'Python', 'Java', 'C++'],
            solution: 'It depends on the project and personal preference. Each programming language has its strengths and weaknesses.',
        },
        {
            id: 6,
            question: 'Which programming language do you prefer?',
            answers: ['JavaScript', 'Python', 'Java', 'C++'],
            solution: 'It depends on the project and personal preference. Each programming language has its strengths and weaknesses.',
        },
        {
            id: 7,
            question: 'Which programming language do you prefer?',
            answers: ['JavaScript', 'Python', 'Java', 'C++'],
            solution: 'It depends on the project and personal preference. Each programming language has its strengths and weaknesses.',
        },
        {
            id: 8,
            question: 'Which programming language do you prefer?',
            answers: ['JavaScript', 'Python', 'Java', 'C++'],
            solution: 'It depends on the project and personal preference. Each programming language has its strengths and weaknesses.',
        },
        {
            id: 9,
            question: 'Which programming language do you prefer?',
            answers: ['JavaScript', 'Python', 'Java', 'C++'],
            solution: 'It depends on the project and personal preference. Each programming language has its strengths and weaknesses.',
        },

    ]);

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

    const handleDeleteQuestion = (id) => {
        const updatedQuestions = questions.filter(question => question.id !== id);
        setQuestions(updatedQuestions);
        setConfirmationModalVisible(false);
    };

    const handleEditQuestion = (id) => {
        // Handle edit question logic here
    };

    const handleItemClick = (id) => {
        setSelectSec(id === selectSec ? null : id); // Nếu item đã được chọn thì bỏ chọn, ngược lại chọn item mới
    };

    const handleDeleteSection = (id) => {
        const updateSection = sections.filter(s => s.id !== id);
        setSections(updateSection);
        setConfirmationModalVisible2(false);
    }

    return (
        <>
            <MyBreadCrumb path={3}></MyBreadCrumb>
            <div style={{ display: 'flex', height: '80vh' }}>

                {/* Phần 7/10 */}
                <div style={{ flex: '70%', padding: '20px' }}>

                    <div style={{ marginBottom: '20px' }}>
                        <Input placeholder="Search" style={{ width: '200px', marginRight: '10px' }} />
                        <Select value={filter1} onChange={handleFilter1Change} style={{ width: '120px', marginRight: '10px' }}>
                            <Option value="1">Filter 1A</Option>
                            <Option value="2">Filter 1B</Option>
                            <Option value="3">All</Option>
                        </Select>
                        {filter1 === '1' && (
                            <Select value={filter2} onChange={handleFilter2Change} style={{ width: '120px', marginRight: '10px' }}>
                                <Option value="A">Filter 2A</Option>
                                <Option value="B">Filter 2B</Option>
                            </Select>
                        )}
                        {filter1 === '2' && (
                            <Select value={filter3} onChange={handleFilter3Change} style={{ width: '120px', marginRight: '10px' }}>
                                <Option value="X">Filter 3X</Option>
                                <Option value="Y">Filter 3Y</Option>
                            </Select>
                        )}
                    </div>
                    {/* <div style={{ height: '30px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
                    <Space>
                        <Button type="text" icon={<CloseOutlined />} style={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                        <Tag color="blue" style={{ fontSize: '16px' }}>{selectedCount} selected</Tag>
                        <Button type="text" icon={<PlusOutlined />} style={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                        <Button type="text" icon={<DeleteOutlined />} style={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                    </Space>
                </div> */}
                    <div style={{ height: '100%', overflowY: 'auto' }}>
                        {questions.map((question) => (
                            <Collapse key={question.id} style={{ marginBottom: '10px' }}>
                                <Panel
                                    header={(
                                        <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div>
                                                <Text>{question.question}</Text>
                                            </div>

                                            <Space >
                                                <Button type="text" icon={<BulbOutlined />} />
                                                <Button type="text" icon={<EditOutlined />} onClick={() => handleEditQuestion(question.id)} />
                                                <Button onClick={() => setConfirmationModalVisible(prevState => ({ ...prevState, [question.id]: true }))} type="text" icon={<DeleteOutlined />} />
                                                <ConfirmationModal isvisible={confirmationModalVisible[question.id]} onCancel={() => setConfirmationModalVisible(prevState => ({ ...prevState, [question.id]: false }))} onOk={() => handleDeleteQuestion(question.id)} />

                                            </Space>


                                        </Space>
                                    )}
                                >
                                    <div style={{ flex: '70%', padding: '20px', overflowY: 'auto' }}>
                                        {question.answers.map((answer, idx) => (
                                            <div key={idx}>
                                                <Text>{answer}</Text>
                                            </div>
                                        ))}

                                        {question.solution && (
                                            <div style={{ marginTop: '10px', maxHeight: '300px', overflowY: 'auto', backgroundColor: 'azure' }}>
                                                <Collapse ghost>
                                                    <Panel header="Solution" key="1">
                                                        <Text>{question.solution}</Text>
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
                            loading={false} // Hiển thị Spin khi đang tải dữ liệu
                            locale={{ emptyText: <Empty description="Không có dữ liệu" /> }} // Hiển thị thông báo khi không có dữ liệu
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
};

export default Section;
