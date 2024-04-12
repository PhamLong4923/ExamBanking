import React from "react";
import { Card, Button, Space, Typography } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Title, Paragraph } = Typography;

const BankManager = () => {
    const limit = {
        bankMode: {
            "0": {
                "name": "System",
                "bankLimit": null,
                "repoLimit": null,
                "secLimit": null,
                "quesLimit": null,
                "price:": 0
            },
            "1": {
                "name": "Free",
                "bankLimit": 1,
                "repoLimit": 5,
                "secLimit": 3,
                "quesLimit": 50,
                "price:": 'Áp dụng'
            },
            "2": {
                "name": "Standard",
                "bankLimit": 1,
                "repoLimit": 7,
                "secLimit": 5,
                "quesLimit": 85,
                "price:": 199000
            },
            "3": {
                "name": "Premium",
                "bankLimit": 2,
                "repoLimit": 11,
                "secLimit": 7,
                "quesLimit": 125,
                "price:": 299000
            }
        }
    };

    const packageData = Object.values(limit.bankMode).slice(1); // Lấy dữ liệu từ gói dịch vụ 1 đến cuối

    return (
        <div style={{ marginTop: "20px" }}>
            <Typography>
                <Title level={4}>Dịch vụ nâng cấp ngân hàng</Title>
                <Paragraph>
                    Để mở rộng các giới hạn của ngân hàng lưu trữ câu hỏi, bạn cần nâng cấp ngân hàng của mình với các gói dịch vụ dưới đây.
                </Paragraph>
            </Typography>
            <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                {packageData.map((packageItem, index) => (
                    <div key={index} style={{ margin: "0 10px" }}>
                        <Card
                            style={{ width: 200, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", transition: "box-shadow 0.3s" }}
                            cover={<img alt="example" src="https://via.placeholder.com/300" />}
                        >
                            <Meta title={packageItem.name} />
                            <div style={{ marginTop: 20 }}>
                                <p>Số lượng ngân hàng: {packageItem.bankLimit || "Unlimited"}</p>
                                <p>Số lượng chương: {packageItem.repoLimit || "Unlimited"}</p>
                                <p>Số lượng bài: {packageItem.secLimit || "Unlimited"}</p>
                                <p>Số lượng câu hỏi: {packageItem.quesLimit || "Unlimited"}</p>
                            </div>
                            <div style={{ marginTop: 20 }}>
                                <Space>
                                    <Button type="primary" icon={<ShoppingOutlined />}>{packageItem["price:"] || "Unlimited"}</Button>
                                </Space>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BankManager;
