import { Button, DatePicker, Form, Input, Modal, Select, Table } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;

const SystemBank = () => {
    const [visible, setVisible] = useState(false);

    const dataSource = [
        {
            key: '1',
            name: 'Bank 1',
            subject: 'Toán',
            date: '01/01/2023',
        },
        {
            key: '2',
            name: 'Bank 2',
            subject: 'Anh',
            date: '01/01/2023',
        },
        // More banks...
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <a href={`/bank/${record.key}`}>{text}</a>, // Render name as a link
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button onClick={() => handleEdit(record)}>Edit</Button>
            ),
        },
    ];

    const handleEdit = (record) => {
        // Handle edit action
        console.log('Edit', record);
    };

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Add bank
            </Button>
            <Table dataSource={dataSource} columns={columns} />

            <Modal
                title="Add bank"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form layout="vertical">
                    <Form.Item label="Name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Subject">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Date">
                        <DatePicker />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default SystemBank;