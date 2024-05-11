import React, { useEffect, useState } from 'react';
import { Button, List } from 'antd';
import { CloseOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import ExConfig from './exconfig';
import ExMyBreadCrumb from '../../../components/ui/exbreadcrumb';
import { getRepository } from '../../../services/api';

const ExRepo = () => {
    const exBank = useSelector(state => state.exBank); // Lấy state exBank từ Redux

    const [repoList, setRepoList] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [next, setNext] = useState(false);

    useEffect(() => {
        const fetchRepoList = async () => {
            try {
                // Gọi API để lấy danh sách repo của exBank
                const response = await getRepository(parseInt(exBank)); // Gọi API với tham số exBank
                const data = response.data; // Giả sử dữ liệu trả về từ API là một mảng các đối tượng repo

                // Cập nhật repoList với dữ liệu từ API
                setRepoList(data);
            } catch (error) {
                console.error('Error fetching repo list:', error);
            }
        };


        if (exBank) {
            fetchRepoList();
        }
    }, [exBank]);

    const handleRowClick = (record) => {
        const { repoid } = record; // Truy cập trực tiếp vào repoid của mỗi mục
        if (selectedIds.includes(repoid)) {
            setSelectedIds(selectedIds.filter(item => item !== repoid));
        } else {
            setSelectedIds([...selectedIds, repoid]);
        }
    };

    const handleClearSelection = () => {
        setSelectedIds([]);
    };

    const handleNext = () => {
        setNext(true);
    };

    const handleBack = () => {
        setNext(false);
    };

    if (next) {
        return (
            <div style={{ height: '98%' }}>
                <Button type="text" icon={<ArrowLeftOutlined />} onClick={handleBack}>Back</Button>
                <ExConfig selectedIds={selectedIds} />
            </div>
        );
    }


    return (
        <>
            <ExMyBreadCrumb path={2}></ExMyBreadCrumb>
            <div style={{ padding: '20px', height: '90vh', overflow: 'auto' }}>
                {/* Thanh tool */}
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #d9d9d9', borderRadius: '5px', padding: '5px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button type="text" icon={<CloseOutlined />} onClick={handleClearSelection} />
                        <span>{selectedIds.length} được chọn</span>
                    </div>
                    <Button type="primary" icon={<ArrowRightOutlined />} disabled={selectedIds.length === 0} onClick={handleNext}>Tiếp tục</Button>
                </div>

                {/* Danh sách repo */}
                <List
                    bordered
                    dataSource={repoList}
                    renderItem={item => (
                        <List.Item
                            onClick={() => handleRowClick(item)}
                            style={{ backgroundColor: selectedIds.includes(item.repoid) ? '#f0f0f0' : 'inherit', cursor: 'pointer' }}
                        >
                            {item.reponame}
                        </List.Item>
                    )}
                />
            </div>
        </>

    );
};

export default ExRepo;
