import { Button, Flex, Form, Input, Modal, Select, Table } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;

const AccountManagement = () => {
  const [visible, setVisible] = useState(false);
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
    },
    {
      key: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
    },
    // More users...
  ]);

  const columns = [
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
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Flex gap="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.key)}>Delete</Button>
        </Flex>
      ),
    },
  ];

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
    setVisible(true);
  };

  const handleDelete = (keyToDelete) => {
    const newData = dataSource.filter(item => item.key !== keyToDelete);
    // Giảm key của các phần tử sau phần tử được xóa
    for (let i = 0; i < newData.length; i++) {
      if (parseInt(newData[i].key) > parseInt(keyToDelete)) {
        newData[i].key = (parseInt(newData[i].key) - 1).toString();
      }
    }
    setDataSource(newData);
  };

  const showModal = () => {
    form.resetFields();
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
          setDataSource([...dataSource, { ...values, key: (dataSource.length + 1).toString() }]);
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
        Add User
      </Button>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 8 }} />

      <Modal
        title={editingKey !== '' ? "Edit User" : "Add User"}
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input the email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Please select the role!' }]}>
            <Select>
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AccountManagement;