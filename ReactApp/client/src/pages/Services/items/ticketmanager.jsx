import React, { useState } from "react";
import { Button, Table, Menu, Dropdown, Space, Tag } from "antd";
import { PlusOutlined, EllipsisOutlined, GiftOutlined } from "@ant-design/icons";
import KitNewbie from "../../../components/ui/kitnewbie";

const { Column } = Table;

const TicketManager = () => {

    const [isnewbie, setIsnewbie] = useState(true);
    const [visible, setVisible] = useState(false);

    const tickets = [
        { id: 1, name: "Ticket 1", bank: "Bank A", createdAt: new Date("2024-03-15"), expiry: new Date("2024-03-20") }, // Ticket này đã hết hạn
        { id: 2, name: "Ticket 2", bank: "Bank B", createdAt: new Date("2024-03-20"), expiry: new Date("2024-04-06") },
        { id: 3, name: "Ticket 3", bank: "Bank C", createdAt: new Date("2024-03-25"), expiry: new Date("2024-04-07") }
    ];


    const handleMenuClick = (ticketId, action) => {
        console.log(`Ticket ID: ${ticketId}, Action: ${action}`);

    };


    const menu = (ticketId) => (
        <Menu onClick={({ key }) => handleMenuClick(ticketId, key)}>
            <Menu.Item key="delete">Xóa</Menu.Item>
            <Menu.Item key="extend">Gia hạn</Menu.Item>
        </Menu>
    );

    const handleOpenKit = () => {
        setVisible(true);
    }

    const handleCloseKit = () => {
        setVisible(false);
    }

    const handleAcceptKit = () => {
        setIsnewbie(false);
        setVisible(false);
    }


    const getDaysDiff = (start, end) => {
        const oneDay = 24 * 60 * 60 * 1000;
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));
        return diffDays;
    };

    //useEffect kiểm tra xem đó có phải người dùng mới hay không, nếu có thì hiển thị modal 

    //useEffect load ticket của người dùng

    //Hàm xóa ticket

    //Hàm thêm ticket


    return (
        <div style={{ marginTop: '20px' }}>
            {isnewbie ? (<Button onClick={() => handleOpenKit()} type="primary" icon={<GiftOutlined />}>Nhận kit cho người mới</Button>) : (<Button type="primary" icon={<PlusOutlined />}>Thêm Ticket</Button>)}
            <KitNewbie visible={visible} onCancel={handleCloseKit} onApply={handleAcceptKit}></KitNewbie>
            <Table dataSource={tickets} pagination={false}>
                <Column title="Tên Ticket" dataIndex="name" key="name" />
                <Column title="Ngân hàng" dataIndex="bank" key="bank" />
                <Column title="Ngày Tạo" dataIndex="createdAt" key="createdAt" render={(text, record) => new Date(record.createdAt).toLocaleDateString()} />
                <Column title="Hạn sử dụng" dataIndex="expiry" key="expiry" render={(text, record) => new Date(record.expiry).toLocaleDateString()} />
                <Column
                    title="Trạng thái"
                    dataIndex="expiry"
                    key="status"
                    render={(text, record) => {
                        const expired = new Date(record.expiry) < new Date();
                        return (
                            <Space>
                                {expired ? (
                                    <Tag color="red">Hết hạn</Tag>
                                ) : (
                                    <Tag color="green">Còn hạn</Tag>
                                )}
                            </Space>
                        );
                    }}
                />
                <Column
                    title=""
                    key="action"
                    render={(text, record) => (
                        <Space size="middle">
                            <Dropdown overlay={menu(record.id)} trigger={["click"]} placement="bottomRight">
                                <Button type="text" icon={<EllipsisOutlined />} />
                            </Dropdown>
                        </Space>
                    )}
                />
            </Table>
        </div>
    );
};

export default TicketManager;
