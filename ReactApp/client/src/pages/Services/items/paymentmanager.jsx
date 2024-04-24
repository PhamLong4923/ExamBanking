import React, { useEffect, useState } from "react";
import { Table, Tag, Pagination } from "antd";
import { gethistorypayment } from "../../../services/api";

const PaymentManager = () => {
    // Giả sử danh sách các giao dịch
    const [transactions, setTransactions] = useState([]);
    const [load, setLoad] = useState(true);
    // Phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 7;
    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    // Tính chỉ số bắt đầu và kết thúc của trang hiện tại
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, transactions.length);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await gethistorypayment();
                setTransactions(response.data);
                setLoad(false);
            } catch (error) {
                console.log(error);
            }


        }
        fetchdata();
    }, []);

    const columns = [
        {
            title: "Ngày thanh toán",
            dataIndex: "paydate",
            key: "paydate",
            render: (paydate) => {
                const dateObj = new Date(paydate);
                const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`;
                return formattedDate;
            },
        },
        {
            title: "Nội dung",
            dataIndex: "paycontent",
            key: "paycontent",
        },
        {
            title: "Số tiền",
            dataIndex: "money",
            key: "money",
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            render: (status) => (
                <Tag color={status === 1 ? "green" : status === 0 ? "red" : "yellow"}>
                    {status === 1 ? "Chấp nhận" : status === 0 ? "Từ chối" : "Đang chờ"}
                </Tag>
            ),
        },
    ];

    return (
        <div>
            <h2>Lịch sử thanh toán</h2>
            <Table
                dataSource={transactions.slice(startIndex, endIndex)}
                columns={columns}
                pagination={false}
                loading={load}
            />
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={transactions.length}
                onChange={onPageChange}
                style={{ marginTop: "20px", textAlign: "center" }}
            />
        </div>
    );
};

export default PaymentManager;
