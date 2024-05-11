import { Button, Flex, Form, Input, Modal, Popconfirm, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addRepository, delRepository, getRepository, updateRepository } from '../../../services/Api';

const AdminRepository = () => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [loading, setLoading] = useState(false);
    const { bankId } = useParams();

    const [dataSource, setDataSource] = useState([
        // {
        //     repoid: '1',
        //     reponame: 'Chương 1',
        //     bankId: 1,
        // },
        // {
        //     repoid: '2',
        //     reponame: 'Chương 2',
        //     bankId: 1,
        // },
        // {
        //     repoid: '3',
        //     reponame: 'Chapter 1',
        //     bankId: 2,
        // },
        // {
        //     repoid: '4',
        //     reponame: 'Chapter 2',
        //     bankId: 2,
        // },
    ]);

    useEffect(() => {
        const loadRepos = async () => {
            try {
                const response = await getRepository(parseInt(bankId));
                setDataSource(response.data);
                setLoading(false);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setDataSource([]);
                    setLoading(false);
                    // errors("Nguyễn Ngọc Việt", 2);
                } else {
                    // errors(SYSTEM_ERROR_MESSAGE, 2);
                    console.log(error);
                }
            }
        };
        loadRepos();
    }, []);

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'reponame',
            key: 'reponame',
            render: (text, record) => <a href={`/system_bank/${bankId}/system_repo/${record.repoid}/system_section`}>{text}</a>,
        },
        {
            title: 'Hành động',
            key: 'action',
            width: '20%',
            render: (record) => (
                <Flex gap="middle" justifyContent="flex-end">
                    <Button onClick={() => handleEdit(record)}>Chỉnh sửa</Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa không?"
                        onConfirm={() => handleDelete(record.repoid)}
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
            reponame: '',
            ...record,
        });
        setEditingKey(record.repoid);
        setVisible(true);
    };

    const handleDelete = async (keyToDelete) => {
        try {
            const res = await delRepository(keyToDelete);
            const did = res.data;
            const newData = dataSource.filter(item => item.repoid !== keyToDelete);
            setDataSource(newData);
        } catch (error) {
            console.error(error);
        }
    };


    const showModal = () => {
        setVisible(true);
    };

    const handleOk = async () => {
        try {
            form
                .validateFields()
                .then((values) => {
                    form.resetFields();
                    if (editingKey !== '') { // Nếu đang chỉnh sửa
                        const newData = [...dataSource];
                        const index = newData.findIndex((item) => editingKey === item.repoid);
                        if (index > -1) {
                            const fakeData = async () => {
                                const item = newData[index];
                                const res = await updateRepository(editingKey, values.reponame);
                                newData.splice(index, 1, { ...item, ...values });
                                setDataSource(newData);
                                setEditingKey('');
                                setVisible(false);
                            }
                            fakeData();
                        }
                    } else { // Nếu thêm mới
                        const fakeData = async () => {
                            const res = await addRepository({ repocontent: values.reponame, bankid: bankId });
                            const newid = res.data;
                            setDataSource([...dataSource, { ...values, repoid: newid, bankid: bankId }]);
                            setVisible(false);
                        }
                        fakeData();
                    }
                })
                .catch((info) => {
                    console.log('Validate Failed:', info);
                });
        } catch (error) {
            console.error(error);
        }
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
                <Table
                    dataSource={dataSource.filter(item => parseInt(item.bankid) === parseInt(bankId))}
                    columns={columns}
                    pagination={{ pageSize: 7 }}
                />

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
                        <Form.Item label="Tên" name="reponame" rules={[{ required: true, message: 'Hãy nhập vào tên!' }]}>
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default AdminRepository;
