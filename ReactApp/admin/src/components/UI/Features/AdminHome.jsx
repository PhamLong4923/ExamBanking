import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';

const Home = () => {
  return (
    <div>
      <Card title="Admin Dashboard">
        <Row gutter={16}>
          <Col span={8}>
            <Statistic title="Total Users" value={1000} />
          </Col>
          <Col span={8}>
            <Statistic title="Total Orders" value={500} />
          </Col>
          <Col span={8}>
            <Statistic title="Total Revenue" value={100000} prefix="$" />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Home;
