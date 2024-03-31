import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

const { Column, ColumnGroup } = Table;

const ExConfig = ({ selectedIds, onBack }) => {
    const [sections, setSections] = useState([]);

    useEffect(() => {
        // Tạo một số dữ liệu mẫu cho sections
        const sampleSections = [
            { id: 1, name: 'Bài 1: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint obcaecati culpa animi facilis quis sunt, perferendis non veniam maxime libero aspernatur quasi, excepturi minus nihil, debitis dicta provident autem eaque!', nhận_biết: 3, thông_hiểu: 2, vận_dụng: 3, vận_dụng_cao: 5, tổng1: 5, dễ: 3, trung_bình: 2, khó: 3, nâng_cao: 5, tổng2: 5, trắc_nghiệm: 1, tự_luận: 2 },
            { id: 2, name: 'Bài 2', nhận_biết: '', thông_hiểu: '', vận_dụng: '', vận_dụng_cao: '', tổng1: '', dễ: '', trung_bình: '', khó: '', nâng_cao: '', tổng2: '', trắc_nghiệm: '', tự_luận: '' },
            // Thêm các section khác nếu cần
        ];
        setSections(sampleSections);
    }, []);

    const handleInputChange = (record, column, value) => {
        // Xử lý logic khi người dùng thay đổi input
    };

    const data = [
        {
            key: '1',
            repo: 'Repo1',
            sections: [
                { name: 'Section1', nb: 0, th: 0, vd: 0, vdc: 0, de: 0, tb: 0, kho: 0, nc: 0 },
                { name: 'Section2', nb: 0, th: 0, vd: 0, vdc: 0, de: 0, tb: 0, kho: 0, nc: 0 },
                { name: 'Section3', nb: 0, th: 0, vd: 0, vdc: 0, de: 0, tb: 0, kho: 0, nc: 0 }
            ]
        },
        {
            key: '2',
            repo: 'Repo2',
            sections: [
                { name: 'Section4', nb: 0, th: 0, vd: 0, vdc: 0, de: 0, tb: 0, kho: 0, nc: 0 },
                { name: 'Section5', nb: 0, th: 0, vd: 0, vdc: 0, de: 0, tb: 0, kho: 0, nc: 0 },
                { name: 'Section6', nb: 0, th: 0, vd: 0, vdc: 0, de: 0, tb: 0, kho: 0, nc: 0 }
            ]
        }
    ];

    return (
        <Table dataSource={data} bordered>
            <ColumnGroup title="Repo" dataIndex="repo" key="repo">
                <Column
                    title="Section"
                    dataIndex={['sections', 'name']}
                    key="name"
                    render={(text) => (
                        <b>{text}</b>
                    )}
                />
                <ColumnGroup title="Trắc nhiệm">
                    <Column title="NB" dataIndex={['sections', 'nb']} key="nb" />
                    <Column title="TH" dataIndex={['sections', 'th']} key="th" />
                    <Column title="VD" dataIndex={['sections', 'vd']} key="vd" />
                    <Column title="VDC" dataIndex={['sections', 'vdc']} key="vdc" />
                </ColumnGroup>
                <ColumnGroup title="Tự luận">
                    <Column title="Dễ" dataIndex={['sections', 'de']} key="de" />
                    <Column title="TB" dataIndex={['sections', 'tb']} key="tb" />
                    <Column title="Khó" dataIndex={['sections', 'kho']} key="kho" />
                    <Column title="NC" dataIndex={['sections', 'nc']} key="nc" />
                </ColumnGroup>
            </ColumnGroup>
        </Table>
    );
};

export default ExConfig;
