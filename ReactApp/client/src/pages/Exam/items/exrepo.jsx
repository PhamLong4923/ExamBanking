import React, { useEffect, useState } from 'react';
import { Button, List } from 'antd';
import { CloseOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import ExConfig from './exconfig';
import ExMyBreadCrumb from '../../../components/ui/exbreadcrumb';

const ExRepo = () => {
    const exBank = useSelector(state => state.exBank); // Lấy state exBank từ Redux

    const [repoList, setRepoList] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [next, setNext] = useState(false);

    useEffect(() => {
        // Gọi API để load danh sách repo của exBank tại đây
        // Cập nhật repoList khi nhận được dữ liệu từ API
        // Ví dụ sử dụng dữ liệu mẫu
        const sampleRepoData = [
            { id: 1, name: 'Repo 1' },
            { id: 2, name: 'Repo 2' },
            { id: 3, name: 'Repo 3' },
            { id: 4, name: 'Repo 4' },
            { id: 5, name: 'Repo 5' },
            // Thêm các repo khác nếu cần
        ];
        setRepoList(sampleRepoData);
    }, [exBank]);

    const handleRowClick = (record) => {
        const { id } = record;
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(item => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
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
            <div>
                <Button type="text" icon={<ArrowLeftOutlined />} onClick={handleBack}>Back</Button>
                <ExConfig selectedIds={selectedIds} />
            </div>
        );
    }


    return (
        <>
            <ExMyBreadCrumb path={2}></ExMyBreadCrumb>
            <div style={{ padding: '20px' }}>
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
                            style={{ backgroundColor: selectedIds.includes(item.id) ? '#f0f0f0' : 'inherit', cursor: 'pointer' }}
                        >
                            {item.name}
                        </List.Item>
                    )}
                />
            </div>
        </>

    );
};

export default ExRepo;
