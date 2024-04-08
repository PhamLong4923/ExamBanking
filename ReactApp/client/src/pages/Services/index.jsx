import React, { useState } from 'react';
import { Card, Row, Col, Typography, Button } from 'antd';
import { BankOutlined, SolutionOutlined, LockOutlined } from '@ant-design/icons';
import BankManager from './items/bankmanager';
import TicketManager from './items/ticketmanager';
import AccessManager from './items/accessmanager';

const { Title } = Typography;

const Services = () => {
    const [currentPage, setCurrentPage] = useState(null);

    const services = [
        { icon: <BankOutlined style={{ fontSize: '24px' }} />, name: 'Quản lí ngân hàng', component: <BankManager></BankManager> },
        { icon: <SolutionOutlined style={{ fontSize: '24px' }} />, name: 'Quản lí ticket', component: <TicketManager></TicketManager> },
        { icon: <LockOutlined style={{ fontSize: '24px' }} />, name: 'Quản lí truy cập', component: AccessManager },
    ];

    const handleServiceClick = (Component) => {
        setCurrentPage(Component);
    };

    const handleBack = () => {
        setCurrentPage(null);
    };

    if (currentPage) {
        return (
            <div>
                <Button onClick={handleBack}>Back</Button>
                {currentPage}
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <Title level={3}>ExamBanking's Services</Title>
            <Row gutter={[16, 16]}>
                {services.map((service, index) => (
                    <Col span={8} key={index}>
                        <Card
                            style={{
                                boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
                                cursor: 'pointer',
                                transition: 'box-shadow 0.3s',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 12px rgba(0, 0, 0, 0.3)' }}
                            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 12px rgba(0, 0, 0, 0.1)' }}
                            onClick={() => handleServiceClick(service.component)}
                        >
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                {service.icon}
                            </div>
                            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>{service.name}</p>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Services;
