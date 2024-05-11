import { Button, DatePicker, Flex, Form, Input, Modal, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { acceptPayment, deniedPayment, getPayment } from '../../../services/Api';

const { RangePicker } = DatePicker;

const Payment = () => {
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState("all");
  const [loading, setLoading] = useState(true);
  const [listData, setListData] = useState([
    // {
    //   payid: '1',
    //   accid: '1',
    //   paycontent: 'INV-001',
    //   paydate: "25/03/2024",
    //   money: 100,
    //   status: null,
    // },
    // {
    //   payid: '2',
    //   accid: '1',
    //   paycontent: 'INV-002',
    //   paydate: "25/03/2024",
    //   money: 150,
    //   status: null,
    // },
    // {
    //   payid: '3',
    //   accid: '1',
    //   paycontent: 'INV-003',
    //   paydate: "25/03/2024",
    //   money: 100,
    //   status: 0,
    // },
    // {
    //   payid: '4',
    //   accid: '1',
    //   paycontent: 'INV-004',
    //   paydate: "25/03/2024",
    //   money: 150,
    //   status: 1,
    // },
  ]);

  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPayment();
        setListData(response.data);
        setDataSource(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setListData([]);
          setLoading(false);
          // errors("Nguyễn Ngọc Việt", 2);
        } else {
          // errors(SYSTEM_ERROR_MESSAGE, 2);
          console.log(error);
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    switch (currentPage) {
      case "all":
        setDataSource(listData);
        break;
      case "pending":
        setDataSource(listData.filter(item => item.status === null));
        break;
      case "approved":
        setDataSource(listData.filter(item => item.status === 1));
        break;
      case "cancelled":
        setDataSource(listData.filter(item => item.status === 0));
        break;
      default:
        setDataSource(listData);
    }
  }, [currentPage, listData]);

  const columns = [
    {
      title: 'Mã hóa đơn',
      dataIndex: 'paycontent',
      key: 'paycontent',
    },
    {
      title: 'Số tiền',
      dataIndex: 'money',
      key: 'money',
    },
    {
      title: 'Ngày',
      dataIndex: 'paydate',
      key: 'paydate',
    },
    {
      title: currentPage === "pending" ? 'Hành động' : 'Trạng thái',
      key: 'action',
      render: (text, record) => (
        record.status === null ? (
          <Flex gap="middle">
            <Button onClick={() => handleApprove(record.payid)}>Duyệt</Button>
            <Button onClick={() => handleCancel(record.payid)}>Hủy</Button>
          </Flex>
        ) : record.status === 1 ? (
          <Tag color="green">Đã duyệt</Tag>
        ) : (
          <Tag color="red">Đã hủy</Tag>
        )
      )
    },
  ];

  const showModal = () => {
    setVisible(true);
  };

  const handleApprove = async (keyToApprove) => {
    try {
      const response = await acceptPayment(keyToApprove);
      const approvedPayId = response.data;
      console.log(response.data);
  
      const updatedListData = listData.map(item => {
        if (item.payid === approvedPayId) {
          return { ...item, status: 1 };
        }
        return item;
      });
  
      setListData(updatedListData);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleCancel = async (keyToCancel) => {
    try {
      const response = await deniedPayment(keyToCancel);
      const approvedPayId = response.data;
      console.log(response.data);
  
      const updatedListData = listData.map(item => {
        if (item.payid === approvedPayId) {
          return { ...item, status: 0 };
        }
        return item;
      });
  
      setListData(updatedListData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancelModal = () => {
    setVisible(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Button type={currentPage === "all" ? "primary" : "default"} onClick={() => handlePageChange("all")}>Tất cả</Button>
        <Button type={currentPage === "pending" ? "primary" : "default"} onClick={() => handlePageChange("pending")}>Chờ duyệt</Button>
        <Button type={currentPage === "approved" ? "primary" : "default"} onClick={() => handlePageChange("approved")}>Đã duyệt</Button>
        <Button type={currentPage === "cancelled" ? "primary" : "default"} onClick={() => handlePageChange("cancelled")}>Bị hủy</Button>
      </div>

      <Table dataSource={dataSource} columns={columns} loading={loading} pagination={{pageSize: 7}}/>

      <Modal
        title="Add Payment"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancelModal}
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
