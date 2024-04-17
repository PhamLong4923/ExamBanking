import React, { useEffect, useState } from "react";
import { Button, Table, Menu, Dropdown, Space, Tag } from "antd";
import { PlusOutlined, EllipsisOutlined, GiftOutlined } from "@ant-design/icons";
import KitNewbie from "../../../components/ui/kitnewbie";
import TicketPaymentModal from "../../../components/ui/ticketpaymentui";
import TicketRenewPaymentModal from "../../../components/ui/ticketrenewmodal";
import { delTicket, isnew, updateisnew } from "../../../services/api";
import { success } from "../../../components/ui/notifications";
import { SYSTEM_SUCCESS_MESSAGE } from "../../../share/constrains";

const { Column } = Table;

const TicketManager = () => {

    const [isnewbie, setIsnewbie] = useState(true);
    const [visible, setVisible] = useState(false);
    const [tid, setTid] = useState();

    const [tickets, setTicket] = useState([
        { id: 1, name: "Ticket 1", bank: "Bank F", createdAt: new Date("2024-03-15"), expiry: 30 }, // Ticket này đã hết hạn
        { id: 2, name: "Ticket 2", bank: "Bank B", createdAt: new Date("2024-03-20"), expiry: 40 },
        { id: 4, name: "Ticket 4", bank: null, createdAt: new Date("2024-03-25"), expiry: 60 },
        { id: 3, name: "Ticket 3", bank: "Bank C", createdAt: new Date("2024-03-25"), expiry: 0 }
    ]);


    const handleMenuClick = (ticketId, action) => {
        setTid(ticketId);
    };

    const handleRenewTicket = () => {
        setOpenRenew(true);
    }

    const [openrenew, setOpenRenew] = useState(false);


    const menu = (ticketId) => (
        <Menu onClick={({ key }) => handleMenuClick(ticketId, key)}>
            <Menu.Item key="delete" onClick={() => handleDeleteTicket(ticketId)}>Xóa</Menu.Item>
            <Menu.Item key="extend" onClick={() => handleRenewTicket()}>Gia hạn</Menu.Item>
        </Menu>
    );

    const handleOpenKit = () => {
        setVisible(true);
    }

    const handleCloseKit = () => {
        setVisible(false);
    }

    const handleAcceptKit = () => {
        const updateNew = async () => {
            try {
                const response = await updateisnew();
                console.log(response.data);
                setIsnewbie(false);
            } catch (error) {
                console.log(error);
            }
            setVisible(false);
        }
        updateNew();
    }


    const getDaysDiff = (start, end) => {
        const oneDay = 24 * 60 * 60 * 1000;
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));
        return diffDays;
    };

    useEffect(() => {
        const loadIsNew = async () => {
            try {
                const response = await isnew();
                if (response.data === 0) {
                    setIsnewbie(false);
                }
            } catch (error) {
                console.error(error);
            }
        };

        loadIsNew();
    }, []);

    useEffect(() => {
        try {

        } catch (error) {

        }
    })

    const handleDeleteTicket = async (tkid) => {
        try {
            //const response = await delTicket(tkid);
            const updateTk = tickets.filter(tk => tk.id !== tkid);
            setTicket(updateTk);
            success(SYSTEM_SUCCESS_MESSAGE, 2);
        } catch (error) {

        }
    }


    //Hàm thêm ticket
    const [openpay, setOpenPay] = useState(false);

    const handleOpenPayMethod = () => {
        setOpenPay(true);
    };


    return (
        <div style={{ marginTop: '20px', padding: '5px' }}>
            <TicketPaymentModal start={openpay} setClose={() => setOpenPay(false)} ></TicketPaymentModal>
            <TicketRenewPaymentModal start={openrenew} setClose={() => setOpenRenew(false)} tid={tid}></TicketRenewPaymentModal>
            {isnewbie ? (<Button style={{ marginBottom: '5px' }} onClick={() => handleOpenKit()} type="primary" icon={<GiftOutlined />}>Nhận kit cho người mới</Button>)
                :
                (<Button style={{ marginBottom: '5px' }} type="primary" icon={<PlusOutlined />} onClick={handleOpenPayMethod}>Thêm Ticket</Button>)}
            <KitNewbie visible={visible} onCancel={handleCloseKit} onApply={handleAcceptKit}></KitNewbie>
            <Table dataSource={tickets} pagination={false}>
                <Column title="Tên Ticket" dataIndex="name" key="name" />
                <Column title="Ngân hàng" dataIndex="bank" key="bank" />
                <Column title="Ngày bắt đầu" dataIndex="createdAt" key="createdAt" render={(text, record) => new Date(record.createdAt).toLocaleDateString()} />
                <Column title="Hạn sử dụng" dataIndex="expiry" key="expiry" render={(text, record) => new Date(record.expiry).toLocaleDateString()} />
                <Column
                    title="Trạng thái"
                    dataIndex="bank"
                    key="status"
                    render={(text, record) => {
                        const expired = new Date(record.expiry) < new Date();
                        if (!record.bank) {
                            return <Tag color="blue">Chưa sử dụng</Tag>;
                        } else {
                            return (
                                <Space>
                                    {expired ? (
                                        <Tag color="red">Hết hạn</Tag>
                                    ) : (
                                        <Tag color="green">Còn hạn</Tag>
                                    )}
                                </Space>
                            );
                        }
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
