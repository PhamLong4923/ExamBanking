import { Button, Flex, Form, Input, Modal, Popconfirm, Table } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminRepository = () => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [isToastOpen, setIsToastOpen] = useState(false);
    const { bankId } = useParams();

    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            name: 'Chương 1',
            description: 'Hàm số',
            bankId: 1,
            date: moment().format('DD/MM/YYYY'),
        },
        {
            key: '2',
            name: 'Chương 2',
            description: 'Đồ thị',
            bankId: 1,
            date: moment().format('DD/MM/YYYY'),
        },
        {
            key: '3',
            name: 'Chapter 1',
            description: 'Family',
            bankId: 2,
            date: moment().format('DD/MM/YYYY'),
        },
        {
            key: '4',
            name: 'Chapter 2',
            description: 'Country',
            bankId: 2,
            date: moment().format('DD/MM/YYYY'),
        },
    ]);

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <a href={`/system_bank/${bankId}/system_repo/${record.key}/system_section`}>{text}</a>,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
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
                </Flex>
            ),
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
                    setDataSource([...dataSource, { ...values, key: (dataSource.length + 1).toString(), date: moment().format('DD/MM/YYYY'), bankId: bankId }]);
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
                    Thêm kho
                </Button>
                <br /><br />
                <Table dataSource={dataSource.filter(item => parseInt(item.bankId) === parseInt(bankId))} columns={columns} pagination={{ pageSize: 8 }} />

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
                        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Hãy nhập vào tên!' }]}>
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
        </div>
    );
};

export default AdminRepository;
