import { Button, Flex, Form, Modal, Select, Table } from 'antd';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const { Option } = Select;

const AccountManagement = () => {
  const [visible, setVisible] = useState(false);
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      locked: false,
    },
    {
      key: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      locked: false,
    },
    // More users...
  ]);

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Quyền',
      dataIndex: 'role',
      key: 'role',
      render: (text) => (
        text === 'admin' ? 'Quản trị viên' : 'Người dùng'
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (record) => (
        <Flex gap="middle">
          <Button onClick={() => handleEdit(record)}>Thay đổi quyền</Button>
          {/* <Button onClick={() => toastVerifyDelete(record.key)}>Delete</Button> */}
          {record.locked ? (
            <Button onClick={() => handleUnlock(record.key)}>Mở khóa</Button> // Nút Unlock
          ) : (
            <Button onClick={() => handleLock(record.key)}>Khóa</Button> // Nút Lock
          )}
        </Flex>
      ),
    },
  ];

  const handleEdit = (record) => {
    form.setFieldsValue(record);
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

  const handleLock = (key) => {
    const newData = dataSource.map(item =>
      item.key === key ? { ...item, locked: true } : item
    );
    setDataSource(newData);
  };

  const handleUnlock = (key) => {
    const newData = dataSource.map(item =>
      item.key === key ? { ...item, locked: false } : item
    );
    setDataSource(newData);
  };

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 8 }} />

      <Modal
        title={editingKey !== '' ? "Edit User" : "Add User"}
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Please select the role!' }]}>
            <Select>
              <Option value="admin">Quản trị viên</Option>
              <Option value="user">Người dùng</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AccountManagement;