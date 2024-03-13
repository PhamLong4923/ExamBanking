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
      status: 'Pending',
    },
    {
      key: '2',
      invoice: 'INV-002',
      amount: 150,
      status: 'Paid',
    },
    // More payments...
  ]);

  const columns = [
    {
      title: 'Invoice',
      dataIndex: 'invoice',
      key: 'invoice',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => handleDelete(record.key)}>Delete</Button>
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
      <Button type="primary" onClick={showModal}>
        Add Payment(for develovper test only)
      </Button>
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
