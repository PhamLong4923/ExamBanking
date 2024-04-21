import React, { useState, useEffect } from 'react';
import { Select, Button, Table, Space } from 'antd';
import { DeleteOutlined, PlusOutlined, ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import Ckeditor from '../tool/ckeditor';
import { errors, warning } from './notifications';
import { SYSTEM_ERROR_MESSAGE, SYSTEM_WARNING_MESSAGE_NOSELECT } from '../../share/constrains';
import { uploadImageToFirebase } from '../tool/uploader';
import { addAnswer, updateAns, updateQMode, updateQuestion, updateSolution } from '../../services/api';

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
            updateQmodef(qdata.quesid, data.qmode);
        }
        if (comparedata.quescontent !== data.quescontent) {
            updateQuestionf(qdata.quesid, data.quescontent);
            console.log(data.quescontent);
        }
        for (let i = 0; i < data.answers.length; i++) {
            const newAnswer = data.answers[i];
            const correspondingOldAnswer = comparedata.answers.find(oldAnswer => oldAnswer.ansid === newAnswer.ansid);

            if (correspondingOldAnswer) {
                // If the answer exists in the old data, check if content has changed
                if (correspondingOldAnswer.anscontent !== newAnswer.anscontent) {
                    // Call edit answer
                    updateAnsf(newAnswer.ansid, newAnswer.anscontent);
                }
            } else {
                // If the answer doesn't exist in the old data, it's a new answer
                // Call add Answer
                addAnsf(qdata.quesid, newAnswer.anscontent);
            }
        }
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

    const updateQmodef = async (qid, mode) => {
        try {
            const response = await updateQMode(qid, mode);
            //qdata.solution = response.data;
        } catch (error) {
            console.log("Cannot update Qmode", error);
        }
    }

    const updateAnsf = async (aid, ct) => {
        try {
            const response = await updateAns(aid, ct);
            //qdata.solution = response.data;
        } catch (error) {
            console.log("Cannot update Ans", error);
        }
    }

    const addAnsf = async (qid, acontent) => {
        try {
            const response = await addAnswer({ quesid: qid, content: acontent, ansstatus: 0 });
            //qdata.solution = response.data;
        } catch (error) {
            console.log("Cannot update Ans", error);
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
            console.log('[kk==' + updatedQcontent);
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
                quesid: qdata.quesid,
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
                console.log('news:' + newSrc);
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
                    <Option value="0">Trắc nhiệm</Option>
                    <Option value="1">Tự luận</Option>
                </Select>

                <Select
                    style={{ width: '130px', marginBottom: '16px' }}
                    placeholder="Chọn mức độ"
                    onChange={(value) => setDifficultyLevel(value)} // Set difficultyLevel on change
                    value={"" + difficultyLevel}
                >
                    {questionType === 1 ? (
                        <>
                            <Option value="0" >Nhận biết</Option>
                            <Option value="1">Thông hiểu</Option>
                            <Option value="2">Vận dụng</Option>
                            <Option value="3">Vận dụng cao</Option>
                        </>
                    ) : questionType === 2 ? (
                        <>
                            <Option value="4">Dễ</Option>
                            <Option value="5">Trung bình</Option>
                            <Option value="6">Khó</Option>
                            <Option value="7">Nâng cao</Option>
                        </>
                    ) : null}
                </Select>

                <Ckeditor title={'Câu hỏi'} dataOnChange={getEditorData} editorId={'question_editor'} cdata={qcontent} />

                {questionType === 0 && (
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
