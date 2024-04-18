import { Button, DatePicker, Form, Input, Modal, Table } from 'antd';
import React, { useState } from 'react';

const { RangePicker } = DatePicker;

const Payment = () => {
  const [visible, setVisible] = useState(false);

  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      invoice: 'INV-001',
      amount: 100,
      status: 'chưa xử lý',
    },
    {
      key: '2',
      invoice: 'INV-002',
      amount: 150,
      status: 'chưa xử lý',
    },
    // More payments...
  ]);

  const columns = [
    {
      title: 'Mã hóa đơn',
      dataIndex: 'invoice',
      key: 'invoice',
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => handleDelete(record.key)}>Duyệt</Button>
      ),
    },
  ];

  const showModal = () => {
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

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />

      <Modal
        title="Add Payment"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Invoice">
            <Input />
          </Form.Item>
          <Form.Item label="Amount">
            <Input />
          </Form.Item>
          <Form.Item label="Date">
            <RangePicker />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Payment;
