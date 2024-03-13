import { Button, DatePicker, Form, Input, Modal, Table } from 'antd';
import React, { useState } from 'react';

const { RangePicker } = DatePicker;

const Payment = () => {
  const [visible, setVisible] = useState(false);

  const dataSource = [
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
  ];

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
      render: () => (
        <Button type="primary" onClick={showModal}>
          Add Payment
        </Button>
      ),
    },
  ];

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
        Add Payment
      </Button>
      <Table dataSource={dataSource} columns={columns} />

      <Modal
        title="Add Payment"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Invoice">
            <Input />
          </Form.Item>
          <Form.Item label="Amount">
            <Input type="number" />
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
