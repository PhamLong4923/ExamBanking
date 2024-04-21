import React, { useEffect, useState } from 'react';
import { Modal, Button, Table } from 'antd';
import { getaviableticket } from '../../services/api';
import { useSelector } from 'react-redux';

const TicketApprove = ({ visible, onCancel, onApply, bankid }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const tickmode = useSelector(state => state.exBankType);


    const [ticketdata, setTicketdate] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await getaviableticket(parseInt(tickmode));
                setTicketdate(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchdata();
    }, []);

    const handleTicketSelectChange = (selectedRowKeys, selectedRows) => {
        setSelectedRows(selectedRows);
        setSelectedRowKeys(selectedRowKeys);
    };

    const handleApply = () => {
        if (selectedRows.length > 0) {
            onApply(selectedRows[0].ticketid, bankid);
            setSelectedRows([]);
            setSelectedRowKeys([]);
        }
    };

    const handleCancel = () => {
        handleTicketSelectChange([], []);
        onCancel();
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: handleTicketSelectChange,
        type: 'radio',
    };

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'ticketname',
            key: 'ticketname',
        },
    ];

    return (
        <Modal
            title={`Bạn hiện có ${ticketdata.length} ticket phù hợp.`}
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Hủy
                </Button>,
                <Button key="apply" type="primary" onClick={handleApply} disabled={selectedRows.length === 0}>
                    Áp dụng
                </Button>,
            ]}
        >
            <Table
                dataSource={ticketdata}
                columns={columns}
                rowKey="ticketid"
                rowSelection={rowSelection}
            />
            {selectedRows.length > 0 && (
                <p>Bạn có muốn áp dụng ticket này cho ngân hàng đã chọn không? Sau khi áp dụng sẽ không thể thay đổi lựa chọn.</p>
            )}
        </Modal>
    );
};

export default TicketApprove;
