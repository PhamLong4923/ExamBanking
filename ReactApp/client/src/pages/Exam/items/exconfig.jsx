import React, { useState, useEffect } from "react";
import { Table, Input, Button, Checkbox, Radio } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from "axios";
import Export from "./export";
import { ADA, ADV, APP, COMP, EASY, ESS, HARD, MCQ, NOR, REG } from "../../../share/constrains";
import { configExam, exportExam } from "../../../services/api";

export default function ExamConfig({ selectedIds }) {
    const [data, setData] = useState([]);
    const [qdata, setQdata] = useState();
    const [dataConfig, setDataConfig] = useState([]);
    const [rowSpanArr, setRowSpanArr] = useState([]);
    const [submit, setSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadRepoData = async () => {
            try {
                const response = await configExam(selectedIds);
                setData(response.data);
                setIsLoading(false);
            } catch (error) {

            }
        }

        loadRepoData();

    }, []);

    const handleInputChange = (sectionId, type, mode, value, max) => {

        const existingIndex = dataConfig.findIndex(item => item.sectionId === sectionId && item.type === type && item.mode === mode);
        if (value > max) {
            value = max;
        }
        if (value < 0) {
            value = 0;
        }
        if (existingIndex !== -1) {
            const updatedData = [...dataConfig];
            updatedData[existingIndex].count = value;
            setDataConfig(updatedData);
        } else {
            setDataConfig(prevState => [...prevState, { sectionId, type, mode, count: value }]);
        }
    };

    useEffect(() => {
        console.log(dataConfig);
    }, [dataConfig]);

    const handleSubmit = async () => {
        try {
            console.log(dataConfig);
            const response = await exportExam(dataConfig);
            setQdata(response.data);
            setSubmit(true);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }

        // const dataToSend = dataConfig.filter(item => item.count !== '' && item.count !== '0');
        // console.log(dataToSend);
        // axios.post('url_to_your_backend_api', dataToSend)
        //     .then(response => {
        //         // Handle response from backend if needed
        //     })
        //     .catch(error => {
        //         // Handle errors if any
        //     });
    };

    const generateMockData = () => {
        const mockData = [];
        data.forEach(repo => {
            if (repo.secs.length !== 0) {
                repo.secs.forEach(sec => {
                    mockData.push({
                        repoid: repo.repoid,
                        reponame: repo.reponame,
                        secid: sec.secid,
                        secname: sec.secname,
                        total: sec
                    });
                });
            }
        });

        return mockData;
    };




    useEffect(() => {
        const calculateRowSpanArr = () => {
            const newRowSpanArr = [];
            data.forEach(({ secs }) => {
                newRowSpanArr.push(secs.length);
                for (let i = 1; i < secs.length; i++) {
                    newRowSpanArr.push(0);
                }
            });
            setRowSpanArr(newRowSpanArr);
        };

        calculateRowSpanArr();
    }, [data]);

    const columns = [
        {
            title: 'Chương',
            dataIndex: 'reponame',
            key: 'repoid',
            render: (_, record, index) => {
                return {
                    children: record.reponame,
                    props: {
                        rowSpan: rowSpanArr[index++],
                    },
                };
            },
        },
        {
            title: 'Bài',
            dataIndex: 'secname',
            key: 'secname',
            render: (_, record) => record.secname,
        },
        {
            title: 'Trắc nghiệm',
            children: [
                {
                    title: 'Nhận biết',
                    dataIndex: 'nbiet',
                    key: 'nbiet',
                    render: (_, record) => (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Input type="number" max={record.total.multi[REG].count} min={0} onChange={(e) => handleInputChange(record.secid, MCQ, REG, e.target.value, e.target.max)} />
                            <Input type="number" disabled value={record.total.multi[REG].count} />
                        </div>
                    ),
                },
                {
                    title: 'Thông hiểu',
                    dataIndex: 'thong_hieu',
                    key: 'thong_hieu',
                    render: (_, record) => (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Input type="number" max={record.total.multi[COMP].count} min={0} onChange={(e) => handleInputChange(record.secid, MCQ, COMP, e.target.value, e.target.max)} />
                            <Input type="number" disabled value={record.total.multi[COMP].count} />
                        </div>
                    ),
                },
                {
                    title: 'Vận dụng',
                    dataIndex: 'van_dung',
                    key: 'van_dung',
                    render: (_, record) => (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Input type="number" max={record.total.multi[APP].count} min={0} onChange={(e) => handleInputChange(record.secid, MCQ, APP, e.target.value, e.target.max)} />
                            <Input type="number" disabled value={record.total.multi[APP].count} />
                        </div>
                    ),
                },
                {
                    title: 'Vận dụng cao',
                    dataIndex: 'van_dung_cao',
                    key: 'van_dung_cao',
                    render: (_, record) => (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Input type="number" max={record.total.multi[ADA].count} min={0} onChange={(e) => handleInputChange(record.secid, MCQ, ADA, e.target.value, e.target.max)} />
                            <Input type="number" disabled value={record.total.multi[ADA].count} />
                        </div>
                    ),
                },
                {
                    title: 'Tổng',
                    dataIndex: 'tong1',
                    key: 'tong1',
                },
            ],
        },
        {
            title: 'Tự luận',
            dataIndex: 'tu_luan',
            key: 'tu_luan',
            children: [
                {
                    title: 'Dễ',
                    dataIndex: 'de',
                    key: 'de',
                    render: (_, record) => (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Input type="number" max={record.total.text[0].count} min={0} onChange={(e) => handleInputChange(record.secid, ESS, EASY, e.target.value, e.target.max)} />
                            <Input type="number" disabled value={record.total.text[0].count} />
                        </div>
                    ),
                },
                {
                    title: 'Trung bình',
                    dataIndex: 'trung_binh',
                    key: 'trung_binh',
                    render: (_, record) => (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Input type="number" max={record.total.text[1].count} min={0} onChange={(e) => handleInputChange(record.secid, ESS, NOR, e.target.value, e.target.max)} />
                            <Input type="number" disabled value={record.total.text[1].count} />
                        </div>
                    ),
                },
                {
                    title: 'Khó',
                    dataIndex: 'kho',
                    key: 'kho',
                    render: (_, record) => (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Input type="number" max={record.total.text[2].count} min={0} onChange={(e) => handleInputChange(record.secid, ESS, HARD, e.target.value, e.target.max)} />
                            <Input type="number" disabled value={record.total.text[2].count} />
                        </div>
                    ),
                },
                {
                    title: 'Nâng cao',
                    dataIndex: 'nang_cao',
                    key: 'nang_cao',
                    render: (_, record) => (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Input type="number" max={record.total.text[3].count} min={0} onChange={(e) => handleInputChange(record.secid, ESS, ADV, e.target.value, e.target.max)} />
                            <Input type="number" disabled value={record.total.text[3].count} />
                        </div>
                    ),
                },
                {
                    title: 'Tổng',
                    dataIndex: 'tong2',
                    key: 'tong2',
                },
            ],
        },
    ];

    if (submit) {
        return (
            <div style={{ overflow: 'auto', height: '99%' }}>
                <Export qdata={qdata}></Export>
            </div>

        )

    }

    return (
        <>
            <div style={{ width: '98%', height: '550px', overflowY: 'scroll', borderBottom: '2px solid black', borderTop: '2px solid black' }}>
                <Table
                    columns={columns}
                    dataSource={generateMockData()}
                    bordered
                    pagination={false}
                    loading={isLoading}

                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '90%', height: 'fit-content', marginTop: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingRight: '10px' }}>
                    <span style={{ marginRight: '5px' }}>Số câu trắc nhiệm:</span>
                    <Input type="number" style={{ marginRight: '20px', width: '60px' }} readOnly />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', paddingRight: '10px' }}>
                    <span style={{ marginRight: '5px' }}>Số câu tự luận:</span>
                    <Input type="number" style={{ marginRight: '20px', width: '60px' }} readOnly />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', borderRight: '1px solid #000', }}>
                    <span>Tổng:</span>
                    <Input type="number" style={{ marginRight: '5px', width: '60px' }} readOnly />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', borderRight: '1px solid #000', paddingRight: '10px' }}>
                    <Radio.Group defaultValue="chon-lan" style={{ marginRight: '10px' }}>
                        <Radio.Button value="chon-lan">Trộn lẫn</Radio.Button>
                        <Radio.Button value="tach-doi">Tách đôi</Radio.Button>
                    </Radio.Group>
                    <Checkbox style={{ marginRight: '10px' }}>Lấy đáp án</Checkbox>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        type="primary"
                        onClick={handleSubmit}
                        loading={isLoading}
                    >
                        Bắt đầu khởi tạo
                    </Button>
                </div>
            </div>
        </>
    );
}
