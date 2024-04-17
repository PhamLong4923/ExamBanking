import { Button, Flex, Form, Input, Modal, Popconfirm, Select, Table } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
const { Option } = Select;

const SystemBank = () => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [isToastOpen, setIsToastOpen] = useState(false);

    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            name: 'Toán 9',
            subject: 'Toán',
            date: moment().format('DD/MM/YYYY'),
        },
        {
            key: '2',
            name: 'Anh 9',
            subject: 'Anh',
            date: moment().format('DD/MM/YYYY'),
        },
    ]);

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <a href={`/system_bank/${record.key}/system_repo`}>{text}</a>
        },
        {
            title: 'Môn học',
            dataIndex: 'subject',
            key: 'subject',
        },
        {
            title: 'Ngày lập',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (record) => (
                <Flex gap="middle">
                    <Button onClick={() => handleEdit(record)}>Chỉnh sửa</Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa không?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button>Xóa</Button>
                    </Popconfirm>
                    <Button href={`/system_bank/${record.key}/access_management`}>Quản lý truy cập</Button>
                </Flex>
            ),
        },
    ];

    const handleEdit = (record) => {
        form.setFieldsValue({
            name: '',
            subject: '',
            date: '',
            ...record,
        });
        setEditingKey(record.key);
        setVisible(true);
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

            <div>
                <Button type="primary" onClick={showModal}>
                    Thêm ngân hàng
                </Button>
                <br /><br />
                <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 8 }} />

                <Modal
                    title="Add bank"
                    open={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{
                            // subject: 'Toán',
                        }}
                    >
                        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the name!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Subject" name="subject" rules={[{ required: true, message: 'Please input subject!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Date" name="date">
                            <Input disabled initialValues={moment().format('DD/MM/YYYY')} />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>

        </div>
    );
};

export default SystemBank;
