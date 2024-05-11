import { Button, Flex, Form, Input, Modal, Popconfirm, Select, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { addBank, delBank, getBank, updateBank } from '../../../services/Api';

const { Option } = Select;

const SystemBank = () => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [loading, setLoading] = useState(true);
    const [dataSource, setDataSource] = useState([
        //          {
        //     "bankid": 1,
        //     "bankname": "new",
        //     "bankstatus": null,
        //     "accid": 1,
        //     "accesses": [],
        //     "repos": [],
        //     "tickets": []
        //   },
        // {
        //     bankid: '1',
        //     bankname: 'Toán 9',
        //     bankstatus: 1,
        // },
        // {
        //     bankid: '2',
        //     bankname: 'Anh 9',
        //     bankstatus: 0,
        // },
    ]);

    useEffect(() => {
        const loadBanks = async () => {
            try {
                const response = await getBank();
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
        loadBanks();
    }, []);

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'bankname',
            key: 'bankname',
            render: (text, record) => <a href={`/system_bank/${record.bankid}/system_repo`}>{text}</a>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'bankstatus',
            key: 'bankstatus',
            render: (record) => (
                <span>
                    {record == 1 ?
                        <Tag color="blue" >
                            Công khai
                        </Tag> :
                        <Tag color="green" >
                            Riêng tư
                        </Tag>}
                </span>
            )
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (record) => (
                <Flex gap="middle">
                    <Button onClick={() => handleEdit(record)}>Chỉnh sửa</Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa không?"
                        onConfirm={() => handleDelete(record.bankid)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button>Xóa</Button>
                    </Popconfirm>
                    <Button href={`/system_bank/${record.bankid}/access_management`}>Quản lý truy cập</Button>
                </Flex>
            ),
        },
    ];

    const handleEdit = (record) => {
        form.setFieldsValue({
            bankname: '',
            bankstatus: '',
            ...record,
        });
        setEditingKey(record.bankid);
        setVisible(true);
    };

    const handleDelete = async (keyToDelete) => {
        try {
            const res = await delBank(keyToDelete);
            const did = res.data;
            const newData = dataSource.filter(item => item.bankid !== keyToDelete);
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
                        const index = newData.findIndex((item) => editingKey === item.bankid);
                        if (index > -1) {
                            const fakeData = async () => {
                                const item = newData[index];
                                const res = await updateBank(editingKey, values.bankname);
                                newData.splice(index, 1, { ...item, ...values });
                                setDataSource(newData);
                                setEditingKey('');
                                setVisible(false);
                            }
                            fakeData();
                        }
                    } else { // Nếu thêm mới
                        const fakeData = async () => {
                            const res = await addBank({ bankname: values.bankname });
                            const newid = res.data;
                            setDataSource([...dataSource, { ...values, bankid: newid }]);
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
                    Thêm ngân hàng
                </Button>
                <br /><br />
                <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 7 }} loading={loading} />

                <Modal
                    title={typeof editingKey == "number" ? "Thêm ngân hàng" : "Chỉnh sửa ngân hàng"}
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
                        <Form.Item label="Tên" name="bankname" rules={[{ required: true, message: 'Vui lòng nhập vào tên!' }]}>
                            <Input />
                        </Form.Item>
                        {/* <Form.Item label="Trạng thái" name="bankstatus" rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}>
                            <Select>
                                <Select.Option value={1}>Công khai</Select.Option>
                                <Select.Option value={0}>Riêng tư</Select.Option>
                            </Select>
                        </Form.Item> */}
                    </Form>
                </Modal>
            </div>

        </div>
    );
};

export default SystemBank;