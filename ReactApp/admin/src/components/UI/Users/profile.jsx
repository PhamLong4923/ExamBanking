import { Avatar, Button, Card, Col, Form, Input, List, Row } from 'antd';
import React from 'react';

const Profile = () => {
  // Dùng một state để quản lý việc hiển thị form chỉnh sửa
  const [editing, setEditing] = React.useState(false);

  // Hàm xử lý sự kiện khi người dùng nhấn nút chỉnh sửa
  const handleEditClick = () => {
    setEditing(true);
  };

  // Hàm xử lý sự kiện khi người dùng hoàn thành chỉnh sửa
  const handleSave = () => {
    // Thực hiện lưu dữ liệu sau khi chỉnh sửa vào cơ sở dữ liệu
    setEditing(false);
  };

  // Danh sách các câu hỏi đã tạo
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
                {editing ? <Input defaultValue="John Doe" /> : <Input value="John Doe" readOnly />}
              </Form.Item>
              <Form.Item label="Email">
                {editing ? <Input defaultValue="john@example.com" /> : <Input value="john@example.com" readOnly />}
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
