import React, { useState, useEffect } from "react";
import { Table, Input, Button, Checkbox, Radio } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from "axios";
import Export from "./export";

export default function ExamConfig({ seclectedIds }) {
    const [data, setData] = useState([]);
    const [dataConfig, setDataConfig] = useState([]);
    const [rowSpanArr, setRowSpanArr] = useState([]);
    const [submit, setSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Mock data for sections
        const mockData = [

            {
                repoid: 3, reponame: 'Chuong tes',
                secs: [
                    {
                        secid: 4, secname: 'Bai 4', count: [
                            { essay: [{ easy: 20, normal: 20, hard: 20, advanced: 20 }] },
                            { mcq: [{ recognition: 20, comprehension: 20, application: 30, advanced: 50 }] }
                        ]
                    },
                    {
                        secid: 5, secname: 'Bai 5', count: [
                            { essay: [{ easy: 20, normal: 20, hard: 20, advanced: 20 }] },
                            { mcq: [{ recognition: 20, comprehension: 20, application: 30, advanced: 40 }] }
                        ]
                    }]
            }
        ];
        setData(mockData);
    }, []);

    const handleInputChange = (sectionId, type, mode, value) => {
        const existingIndex = dataConfig.findIndex(item => item.sectionId === sectionId && item.type === type && item.mode === mode);

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

    const handleSubmit = () => {
        setSubmit(true);

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
            repo.secs.forEach(sec => {

                mockData.push({
                    repoid: repo.repoid,
                    reponame: repo.reponame,
                    secid: sec.secid,
                    secname: sec.secname,
                    total: sec.count
                });
            });
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
            console.log(rowSpanArr);
            setRowSpanArr(newRowSpanArr);
        };

        calculateRowSpanArr();
    }, [data]);

    const countRowSpan = (data, repoid) => {
        const chapter = data.find(item => item.repoid === repoid);
        return chapter ? chapter.secs.length : 0;
    };

    let index = 0;

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
                            <Input type="number" onChange={(e) => handleInputChange(record.sectionId, record.type, record.mode, e.target.value)} />
                            <Input disabled='true' value={record.total[1].mcq[0].recognition} />
                        </div>
                    ),
                },
                {
                    title: 'Thông hiểu',
                    dataIndex: 'thong_hieu',
                    key: 'thong_hieu',
                    render: (_, record) => (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Input type="number" onChange={(e) => handleInputChange(record.sectionId, record.type, record.mode, e.target.value)} />
                            <Input disabled='true' value={record.total[1].mcq[0].comprehension} />
                        </div>
                    ),
                },
                {
                    title: 'Vận dụng',
                    dataIndex: 'van_dung',
                    key: 'van_dung',
                    render: (_, record) => (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Input type="number" onChange={(e) => handleInputChange(record.sectionId, record.type, record.mode, e.target.value)} />
                            <Input disabled='true' value={record.total[1].mcq[0].application} />
                        </div>
                    ),
                },
                {
                    title: 'Vận dụng cao',
                    dataIndex: 'van_dung_cao',
                    key: 'van_dung_cao',
                    render: (_, record) => (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Input type="number" onChange={(e) => handleInputChange(record.sectionId, record.type, record.mode, e.target.value)} />
                            <Input disabled='true' value={record.total[1].mcq[0].advanced} />
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
                            <Input type="number" onChange={(e) => handleInputChange(record.sectionId, record.type, record.mode, e.target.value)} />
                            <Input disabled='true' value={record.total[0].essay[0].easy} />
                        </div>
                    ),
                },
                {
                    title: 'Trung bình',
                    dataIndex: 'trung_binh',
                    key: 'trung_binh',
                    render: (_, record) => (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Input type="number" onChange={(e) => handleInputChange(record.sectionId, record.type, record.mode, e.target.value)} />
                            <Input disabled='true' value={record.total[0].essay[0].normal} />
                        </div>
                    ),
                },
                {
                    title: 'Khó',
                    dataIndex: 'kho',
                    key: 'kho',
                    render: (_, record) => (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Input type="number" onChange={(e) => handleInputChange(record.sectionId, record.type, record.mode, e.target.value)} />
                            <Input disabled='true' value={record.total[0].essay[0].hard} />
                        </div>
                    ),
                },
                {
                    title: 'Nâng cao',
                    dataIndex: 'nang_cao',
                    key: 'nang_cao',
                    render: (_, record) => (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Input type="number" onChange={(e) => handleInputChange(record.sectionId, record.type, record.mode, e.target.value)} />
                            <Input disabled='true' value={record.total[0].essay[0].advanced} />
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
            <Export></Export>
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
                    scroll={{ y: 400 }}
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
