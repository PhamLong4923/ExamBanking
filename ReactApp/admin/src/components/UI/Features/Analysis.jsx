import { LineChartOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Row, Table } from 'antd';
import React, { useState } from 'react';

const { RangePicker } = DatePicker;

const Analysis = () => {
  const [dateRange, setDateRange] = useState([]);

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  const dataSource = [
    {
      key: '1',
      date: '2024-03-01',
      value: 100,
    },
    {
      key: '2',
      date: '2024-03-02',
      value: 120,
    },
    // More data...
  ];

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  return (
    <div>
      <Card title="Analysis" extra={<Button icon={<LineChartOutlined />} />}>
        <Row gutter={16}>
          <Col span={12}>
            <RangePicker onChange={handleDateChange} />
          </Col>
          <Col span={12}>
            <Button type="primary">Apply</Button>
          </Col>
        </Row>
      </Card>

      <Card style={{ marginTop: '20px' }}>
        <Table dataSource={dataSource} columns={columns} />
      </Card>
    </div>
  );
};

export default Analysis;
