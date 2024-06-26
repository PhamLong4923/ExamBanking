import React, { useEffect, useState } from 'react';
import { Button, Table, Badge, Tag, Tooltip } from 'antd';
import { KeyOutlined } from '@ant-design/icons';
import ExMyBreadCrumb from '../../../components/ui/exbreadcrumb';
import TicketApprove from '../../../components/ui/ticketapprove';
import { setExBank } from '../../../redux-setup/action';
import { useDispatch } from 'react-redux';
import { applyTicket, getExBank } from '../../../services/api';
import { errors, success, warning } from '../../../components/ui/notifications';
import { SYSTEM_ERROR_MESSAGE } from '../../../share/constrains';

const ExBank = () => {
    const [loading, setLoading] = useState(false);
    const [banks, setBanks] = useState([]);
    const [visible, setVisible] = useState(false);
    const [bid, setBid] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        const loadTestData = async () => {
            setLoading(true);
            try {
                const response = await getExBank();
                setBanks(response.data);
                setLoading(false);

            } catch (error) {
                errors(SYSTEM_ERROR_MESSAGE, 2);
            }

        };

        loadTestData();
    }, []);

    const handleRowClick = (record) => {
        if (record.ticket && record.ticket.status) {
            dispatch(setExBank(record.id));
        }
    };


    const handleApplyTicket = async (tid, bid) => {

        try {
            const response = await applyTicket(tid, bid);
            const bankIndex = banks.findIndex(bank => bank.id === bid);


            if (bankIndex === -1) {
                return;
            }

            const updatedBanks = [...banks];

            updatedBanks[bankIndex] = {
                ...updatedBanks[bankIndex],
                ticket: {
                    id: tid,
                    name: 'new ticket name',
                    status: true,
                }
            };

            setBanks(updatedBanks);
            setVisible(false);
        } catch (error) {
            console.log(error);
        }

    };


    const showTicketModal = (bid) => {
        setBid(bid);
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Trạng thái',
            key: 'action',
            align: 'right',
            render: (text, record) => (
                <div>
                    {record.ticket === "null" ? (
                        <Tag color="red" onClick={() => showTicketModal(record.id)} style={{ cursor: 'pointer' }}>
                            Chưa mở khóa
                        </Tag>
                    ) : record.ticket.status ? (
                        <Tag color="green" onClick={() => handleRowClick(record)} style={{ cursor: 'pointer' }}>
                            <Tooltip title={record.ticket.name}>
                                Đã mở khóa
                            </Tooltip>
                        </Tag>
                    ) : (
                        <Tag color="orange">
                            <Tooltip title={record.ticket.name}>
                                Khóa hết hạn
                            </Tooltip>
                        </Tag>
                    )}
                </div>
            ),
        },

    ];

    return (
        <div style={{ height: '90vh', overflow: 'auto' }}>
            <ExMyBreadCrumb path={1}></ExMyBreadCrumb>

            {/* <div style={{ position: 'relative', marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '-8px', left: '-8px' }}>
                        <Badge count={banks.length} style={{ backgroundColor: 'red', boxShadow: 'none' }} />
                    </div>
                    <div style={{ marginLeft: 'auto', padding: '8px 16px', background: '#1890ff', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>
                        <KeyOutlined style={{ marginRight: '8px' }} />
                        Ticket
                    </div>
                </div>
            </div> */}

            <Table
                dataSource={banks}
                columns={columns}
                align="center"
                loading={loading}
                rowKey="id"
                rowClassName="row-clickable"
                onRow={(record, rowIndex) => { return { onDoubleClick: (event) => { handleRowClick(record) } } }}
            />
            <TicketApprove visible={visible} onApply={handleApplyTicket} onCancel={handleCancel} bankid={bid} />
        </div>
    );
};

export default ExBank;
