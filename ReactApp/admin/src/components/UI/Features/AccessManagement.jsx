import { CloseOutlined, PlusOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Popconfirm, Table } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const AccessManagement = () => {
    const [visible, setVisible] = useState(false);
    const { bankId } = useParams();
    const userTestData = [
        {
            key: '1',
            name: 'Phạm Hồng Long',
            email: 'LongPHHE170159@fpt.edu.vn',
        },
        {
            key: '2',
            name: 'Nguyễn Ngọc Việt',
            email: 'VietNNHE172276@fpt.edu.vn',
        },
        {
            key: '3',
            name: 'Lê Quang Trung',
            email: 'TrungLQHE171802@fpt.edu.vn',
        },
        {
            key: '4',
            name: 'Nguyễn Thảo Hiền',
            email: 'HienNTHE176172@fpt.edu.vn',
        },
    ];
    const userTestDataColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => (
                <div>
                    <Button onClick={() => handleAddUser(record)} icon={<UserAddOutlined style={{ color: 'green' }} />}></Button>
                </div>
            ),
        },
    ];
    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            bankId: 1,
            email: 'john@example.com',
        },
        {
            key: '2',
            bankId: 1,
            email: 'jane@example.com',
        },
        {
            key: '3',
            bankId: 2,
            email: 'jack@example.com',
        },
        {
            key: '4',
            bankId: 2,
            email: 'july@example.com',
        },
    ]);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <div>
                    <Popconfirm
                        title="Are you sure to delete this user?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<CloseOutlined style={{ color: 'red' }} />}></Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleDelete = (keyToDelete) => {
        const newData = dataSource.filter(item => item.key !== keyToDelete);
        setDataSource(newData);
    };

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const handleAddUser = (selectedUser) => {
        const newUser = {
            key: (dataSource.length + 1).toString(),
            bankId: parseInt(bankId),
            email: selectedUser.email,
        };
        setDataSource([...dataSource, newUser]);
        setVisible(false);
    };


    const filteredUsers = userTestData.filter(user =>
        user.email.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                Add User
            </Button>
            <br /><br />
            <Table dataSource={dataSource.filter(item => parseInt(item.bankId) === parseInt(bankId))} columns={columns} pagination={{ pageSize: 8 }} />
            <Modal
                title={"Add user"}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input.Search
                    placeholder="Search email"
                    enterButton="Search"
                    size="large"
                    onSearch={handleSearch}
                />
                <br /><br />
                <Table
                    dataSource={filteredUsers}
                    columns={userTestDataColumns}
                    pagination={false}
                />
            </Modal>
        </div>
    );
};

export default AccessManagement;
