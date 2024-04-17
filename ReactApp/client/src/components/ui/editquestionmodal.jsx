import React, { useState, useEffect } from 'react';
import { Select, Button, Table, Space } from 'antd';
import { DeleteOutlined, PlusOutlined, ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import Ckeditor from '../tool/ckeditor';
import { errors, warning } from './notifications';
import { SYSTEM_ERROR_MESSAGE, SYSTEM_WARNING_MESSAGE_NOSELECT } from '../../share/constrains';
import { uploadImageToFirebase } from '../tool/uploader';
import { updateQuestion, updateSolution } from '../../services/api';

const { Option } = Select;

const EditQuestionModal = ({ onCancel, onSave, qdata }) => {
    const [questionType, setQuestionType] = useState(qdata.type);
    const [qcontent, setQcontent] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState();
    const [solutionData, setSolutionData] = useState('');
    const [answers, setAnswers] = useState();

    const [comparedata, setCompareData] = useState(qdata);

    useEffect(() => {
        setQcontent(qdata.quescontent);
        setDifficultyLevel(qdata.modeid);
        setSolutionData(qdata.solution);
        setAnswers(qdata.answers.map((ans, index) => ({ key: index, ...ans })));
        console.log(qdata);
    }, [qdata]);

    const handleAddAnswer = () => {
        const newAnswer = { key: Date.now(), ansid: Date.now(), anscontent: '' };
        setAnswers([...answers, newAnswer]);
    };

    const handleAnswerChange = (data, id) => {
        const updatedAnswers = answers.map(answer => {
            if (answer.ansid === id) {
                return { ...answer, anscontent: data };
            }
            return answer;
        });
        setAnswers(updatedAnswers);

    };

    const handleRemoveAnswer = (id) => {
        const newAnswers = answers.filter((item) => item.ansid !== id);
        setAnswers(newAnswers);
    };

    const handleSaveEditQuestion = async (data) => {
        if (comparedata.modeid !== data.modeid) {

        }
        if (comparedata.quescontent !== data.quescontent) {
            updateQuestionf(qdata.quesid, data.quescontent);
            console.log(qdata.quescontent);
        }
        // for (let i = 0; i < answers.length; i++) {
        //     if (answers[i].ansid !== comparedata.answers[i].ansid) {
        //         //call add Answer
        //     } else if (answers[i].anscontent !== comparedata.answers[i].anscontent) {
        //         //call edit answer
        //     }

        // }
        if (comparedata.solution !== data.solution) {
            updateSolutionf(qdata.quesid, data.solution);
        }
    };

    const updateSolutionf = async (qid, nsol) => {
        try {
            const response = await updateSolution(qid, nsol);
            //qdata.solution = response.data;
        } catch (error) {
            console.log("Cannot update solution", error);
        }
    }

    const updateQuestionf = async (qid, qcontent) => {
        try {
            const response = await updateQuestion(qid, qcontent);
            //qdata.solution = response.data;
        } catch (error) {
            console.log("Cannot update question", error);
        }
    }



    const columns = [
        {
            title: 'Đáp án',
            dataIndex: 'anscontent',
            key: 'anscontent',
            render: (text, record) => (
                <div style={{ width: "90%", overflowY: "auto" }}>
                    <Ckeditor
                        dataOnChange={(data) => handleAnswerChange(data, record.ansid)}
                        editorId={`answer_${record.ansid}`}
                        cdata={record.anscontent}
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
                        onClick={() => handleRemoveAnswer(record.ansid)}
                        danger
                    />
                </Space>
            ),
        },
    ];

    const getEditorData = (data) => {

        setQcontent(data);
        console.log(qcontent);
    };

    const getSolutionData = (data) => {
        setSolutionData(data);
    };

    const handleSave = async () => {

        try {
            // Check and upload images in question content
            const updatedQcontent = await uploadImagesInContent(qcontent);
            // Check and upload images in solution content
            const updatedSolutionData = await uploadImagesInContent(solutionData);

            // Check and upload images in answer contents
            const updatedAnswers = await Promise.all(answers.map(async (answer) => {
                return {
                    ...answer,
                    anscontent: await uploadImagesInContent(answer.anscontent)
                };
            }));

            const newData = {
                qtype: parseInt(questionType), // Set qtype here
                quescontent: updatedQcontent,
                qmode: parseInt(difficultyLevel),
                solution: updatedSolutionData,
                answers: updatedAnswers
            };

            handleSaveEditQuestion(newData);

            onSave(newData);
            onCancel();
        } catch (error) {
            errors(SYSTEM_ERROR_MESSAGE, 2);
        }
    };

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
        console.log(updatedContent);

        return updatedContent;
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}>
                <Button onClick={() => onCancel()} icon={<ArrowLeftOutlined />}>Quay lại</Button>
                <div>
                    <Button key="save" type="primary" onClick={() => handleSave()} icon={<SaveOutlined />}>Lưu</Button>
                </div>
            </div>


            <div style={{ height: '95%', overflow: 'auto', margin: '10px', borderTop: '1px solid black', padding: '5px' }}>
                <Select
                    style={{ width: '130px', marginBottom: '16px' }}
                    placeholder="Chọn loại câu hỏi"
                    disabled
                    value={"" + questionType}
                >
                    <Option value="1">Trắc nhiệm</Option>
                    <Option value="2">Tự luận</Option>
                </Select>

                <Select
                    style={{ width: '130px', marginBottom: '16px' }}
                    placeholder="Chọn mức độ"
                    onChange={(value) => setDifficultyLevel(value)} // Set difficultyLevel on change
                    value={"" + difficultyLevel}
                >
                    {questionType === 1 ? (
                        <>
                            <Option value="1" >Nhận biết</Option>
                            <Option value="2">Thông hiểu</Option>
                            <Option value="3">Vận dụng</Option>
                            <Option value="4">Vận dụng cao</Option>
                        </>
                    ) : questionType === 2 ? (
                        <>
                            <Option value="5">Dễ</Option>
                            <Option value="6">Trung bình</Option>
                            <Option value="7">Khó</Option>
                            <Option value="8">Nâng cao</Option>
                        </>
                    ) : null}
                </Select>

                <Ckeditor title={'Câu hỏi'} dataOnChange={getEditorData} editorId={'question_editor'} cdata={qcontent} />

                {questionType === 1 && (
                    <>
                        <Table
                            dataSource={answers}
                            columns={columns}
                            pagination={false}
                            rowKey={(record) => record.ansid}
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

                <Ckeditor title={'Hướng dẫn giải'} dataOnChange={getSolutionData} editorId={'solution_editor'} cdata={solutionData} />



            </div>
        </>

    );
};

export default EditQuestionModal;
