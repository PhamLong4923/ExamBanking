import { Button, Form, Input, Modal, Select, Table } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;

const AccountManagement = () => {
  const [visible, setVisible] = useState(false);

  const dataSource = [
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
  ];

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
        Add User
      </Button>
      <Table dataSource={dataSource} columns={columns} />

      <Modal
        title="Add User"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input />
          </Form.Item>
          <Form.Item label="Email">
            <Input />
          </Form.Item>
          <Form.Item label="Role">
            <Select defaultValue="user">
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
