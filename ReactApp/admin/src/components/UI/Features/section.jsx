import { Button, Flex, Form, Input, Modal, Select, Table } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const { Option } = Select;

const Section = () => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            name: 'Chương 1',
            description: 'Toán',
            date: moment().format('DD/MM/YYYY'),
        },
        {
            key: '2',
            name: 'Chương 2',
            description: 'Anh',
            date: moment().format('DD/MM/YYYY'),
        },
    ]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <a href={`/bank/${record.key}`}>{text}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Flex gap="middle">
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button onClick={() => toastVerifyDelete(record.key)}>Delete</Button>
                </Flex>
            )
        },
    ];

    const handleEdit = (record) => {
        form.setFieldsValue({
            name: '',
            description: '',
            date: '',
            ...record,
        });
        setEditingKey(record.key);
        setVisible(true);
    };

    const toastVerifyDelete = (key) => {
        setVisible(false);
        if (!isToastOpen) {
            const id = toast.info(
                <div>
                    Are you sure want to delete?
                    <div className='toast-buttons'>
                        <Flex gap="middle">
                            <Button onClick={() => {
                                toast.dismiss(id);
                                setIsToastOpen(false);
                            }}>
                                Cancel
                            </Button>
                            <Button onClick={() => handleDelete(key, id)}>
                                Yes
                            </Button>
                        </Flex>
                    </div>
                </div>,
                { onClose: () => setIsToastOpen(false) }
            );
            setIsToastOpen(true);
        }
    };

    const handleDelete = (keyToDelete, toastId) => {
        const newData = dataSource.filter(item => item.key !== keyToDelete);
        // Giảm key của các phần tử sau phần tử được xóa
        for (let i = 0; i < newData.length; i++) {
            if (parseInt(newData[i].key) > parseInt(keyToDelete)) {
                newData[i].key = (parseInt(newData[i].key) - 1).toString();
            }
        }
        setDataSource(newData);
        toast.dismiss(toastId);
        setIsToastOpen(false);
    };


    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                form.resetFields();
                if (editingKey !== '') { // Nếu đang chỉnh sửa
                    const newData = [...dataSource];
                    const index = newData.findIndex((item) => editingKey === item.key);
                    if (index > -1) {
                        const item = newData[index];
                        newData.splice(index, 1, { ...item, ...values });
                        setDataSource(newData);
                        setEditingKey('');
                        setVisible(false);
                    }
                } else { // Nếu thêm mới
                    setDataSource([...dataSource, { ...values, key: (dataSource.length + 1).toString(), date: moment().format('DD/MM/YYYY') }]);
                    setVisible(false);
                }
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };


    const handleCancel = () => {
        form.resetFields();
        setEditingKey('');
        setVisible(false);
    };

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Add repository
            </Button>
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 8 }} />

            <Modal
                title="Add repository"
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        // description: 'abc',
                    }}
                >
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Date" name="date">
                        <Input disabled initialValues={moment().format('DD/MM/YYYY')} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Section;
