import React, { useState, useEffect } from 'react';
import { Modal, Select, Button, Table, Space } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import Ckeditor from '../tool/ckeditor';
import { errors, warning } from './notifications';
import { ESS, MCQ, SYSTEM_ERROR_MESSAGE, SYSTEM_WARNING_MESSAGE_NOSELECT } from '../../share/constrains';
import { uploadImageToFirebase } from '../tool/uploader';

const { Option } = Select;

const QuestionModal = ({ open, onCancel, onSave, secid }) => {
    const [questionType, setQuestionType] = useState('');
    const [qdata, setQdata] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState('');
    const [solutionData, setSolutionData] = useState('');
    const [answers, setAnswers] = useState([{ key: '1', id: Date.now(), content: '' }]);

    const handleAddAnswer = () => {
        const newAnswer = { key: Date.now(), id: Date.now(), content: '' };
        setAnswers([...answers, newAnswer]);
    };

    const handleAnswerChange = (data, id) => {
        const updatedAnswers = answers.map(answer => {
            if (answer.id === id) {
                return { ...answer, content: data };
            }
            return answer;
        });
        setAnswers(updatedAnswers);
    };

    const handleRemoveAnswer = (id) => {
        const newAnswers = answers.filter((item) => item.id !== id);
        setAnswers(newAnswers);
    };

    const columns = [
        {
            title: 'Đáp án',
            dataIndex: 'content',
            key: 'content',
            render: (text, record) => (
                <div style={{ width: "90%", overflowY: "auto" }}>
                    <Ckeditor
                        dataOnChange={(data) => handleAnswerChange(data, record.id)}
                        editorId={`answer_${record.id}`}
                        cdata={''}
                    />
                </div>

            ),
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveAnswer(record.id)}
                        danger
                    />
                </Space>
            ),
        },
    ];

    const getEditorData = (data) => {
        setQdata(data);
    };

    const getSolutionData = (data) => {
        setSolutionData(data);
    };

    //Save use firebase
    const handleSave = async () => {
        if (questionType === '' || difficultyLevel === '') {
            warning(SYSTEM_WARNING_MESSAGE_NOSELECT, 2);
        } else {
            try {
                // Kiểm tra và tải lên ảnh trong nội dung của qdata
                const updatedQdata = await uploadImagesInContent(qdata);

                // Kiểm tra và tải lên ảnh trong nội dung của solutionData
                const updatedSolutionData = await uploadImagesInContent(solutionData);

                // Kiểm tra và tải lên ảnh trong nội dung của các đáp án
                const updatedAnswers = await Promise.all(answers.map(async (answer) => {
                    return {
                        ...answer,
                        content: await uploadImagesInContent(answer.content)
                    };
                }));

                const question = {
                    type: questionType,
                    content: updatedQdata,
                    difficulty: difficultyLevel,
                    solution: updatedSolutionData,
                    answers: updatedAnswers.map(answer => answer.content)
                };
                console.log(question);
                onSave(question);
                onCancel();
            } catch (error) {
                errors(SYSTEM_ERROR_MESSAGE, 2);
            }
        }
    };

    // Hàm kiểm tra và tải lên ảnh trong nội dung
    const uploadImagesInContent = async (content) => {
        const imgTags = content.match(/<img[^>]+>/g);
        if (!imgTags || imgTags.length === 0) {
            return content;
        }

        let updatedContent = content;
        for (const imgTag of imgTags) {
            const src = imgTag.match(/src="([^"]+)"/)[1];
            const newSrc = await uploadImageToFirebase(src);
            if (newSrc) {
                updatedContent = updatedContent.replace(src, newSrc);
            }
        }

        return updatedContent;
    };

    //End save use firebase

    useEffect(() => {
        if (!open) {
            setQuestionType('');
            setQdata('');
            setDifficultyLevel('');
            setSolutionData('');
            setAnswers([{ key: '1', id: Date.now(), content: '' }]);
        }
    }, [open]);

    return (
        <Modal
            title="Tạo câu hỏi"
            visible={open}
            onCancel={onCancel}
            onOk={handleSave}
            footer={[
                <Button key="cancel" onClick={onCancel}>Cancel</Button>,
                <Button key="save" type="primary" onClick={handleSave}>Save</Button>,
            ]}
            destroyOnClose={true}
            width={'60%'}
        >
            <Select
                style={{ marginBottom: '16px' }}
                placeholder="Chọn loại câu hỏi"
                onChange={(value) => setQuestionType(value)}
            >
                <Option value='1'>Tự luận</Option>
                <Option value='0'>Trắc nhiệm</Option>
            </Select>

            {questionType && (
                <Select
                    style={{ marginBottom: '16px' }}
                    placeholder="Chọn mức độ"
                    onChange={(value) => setDifficultyLevel(value)}
                >
                    {questionType === '0' ? (
                        <>
                            <Option value="1">Nhận biết</Option>
                            <Option value="2">Thông hiểu</Option>
                            <Option value="3">Vận dụng</Option>
                            <Option value="4">Vận dụng cao</Option>
                        </>
                    ) : questionType === '1' ? (
                        <>
                            <Option value="5">Dễ</Option>
                            <Option value="6">Trung bình</Option>
                            <Option value="7">Khó</Option>
                            <Option value="8">Nâng cao</Option>
                        </>
                    ) : <></>}
                </Select>
            )}

            <Ckeditor title={'Câu hỏi'} dataOnChange={getEditorData} editorId={'question_editor'} cdata={''} />

            {questionType === '0' && (
                <>
                    <Table
                        dataSource={answers}
                        columns={columns}
                        pagination={false}
                        rowKey={(record) => record.id}

                    />
                    <Button
                        onClick={handleAddAnswer}
                        icon={<PlusOutlined />}
                        style={{ width: '100%', marginTop: '10px' }}
                    >
                        Thêm đáp án
                    </Button>
                </>
            )}

            <Ckeditor title={'Hướng dẫn giải'} dataOnChange={getSolutionData} editorId={'solution_editor'} cdata={''} />
        </Modal>
    );
};

export default QuestionModal;
