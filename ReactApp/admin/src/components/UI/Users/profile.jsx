import { Avatar, Button, Card, Col, Form, Input, List, Row } from 'antd';
import React, { useState } from 'react';

const Profile = () => {

  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john@example.com"
  });

  const [editing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setUserData(prevUserData => ({
      ...prevUserData,
      [field]: value
    }));
  };

  const bankList = [
    {
      id: 1,
      title: 'Ngân hàng 1',
      link: '/qBank/1',
    },
    {
      id: 2,
      title: 'Ngân hàng 2',
      link: '/qBank/2',
    },
    // Thêm các ngân hàng khác vào đây...
  ];

  return (
    <div>
      <Card
        title="Profile"
        extra={editing ? <Button onClick={handleSave}>Save</Button> : <Button onClick={handleEditClick}>Edit</Button>}
      >
        <Row gutter={16}>
          <Col span={6}>
            <Avatar size={128} src="/path_to_avatar.jpg" />
          </Col>
          <Col span={18}>
            <Form layout="vertical">
              <Form.Item label="Name">
                {editing ? <Input value={userData.name} onChange={(e) => handleInputChange(e, 'name')} /> : <Input value={userData.name} readOnly />}
              </Form.Item>
              <Form.Item label="Email">
                {editing ? <Input value={userData.email} onChange={(e) => handleInputChange(e, 'email')} /> : <Input value={userData.email} readOnly />}
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>

      <Card title="Your banks">
        <List
          dataSource={bankList}
          renderItem={(item) => (
            <List.Item>
              <a href={item.link}>{item.title}</a>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Profile;
