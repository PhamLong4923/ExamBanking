import React, { useEffect, useState } from 'react';
import { Button, Table, Dropdown, Menu, Badge, Tag } from 'antd';
import { KeyOutlined } from '@ant-design/icons';
import ExMyBreadCrumb from '../../../components/ui/exbreadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { errors } from '../../../components/ui/notifications';
import { AUTHORIZATION_ERROR_MESSAGE, SYSTEM_ERROR_MESSAGE } from '../../../share/constrains';
import { getBank } from '../../../services/api';
import { setExBank } from '../../../redux-setup/action';
import TicketApprove from '../../../components/ui/ticketapprove';

const ExBank = () => {
    const [loading, setLoading] = useState(true);
    const [banks, setBanks] = useState([]);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [visible, setVisible] = useState(false);
    const bankType = useSelector(state => state.exBankType);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadBanks = async () => {
            try {
                const response = await getBank();
                setBanks(response.data);
                setLoading(false);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setBanks([]);
                    setLoading(false);
                    errors(AUTHORIZATION_ERROR_MESSAGE, 2);
                } else {
                    errors(SYSTEM_ERROR_MESSAGE, 2);
                    console.log(error);
                }
            }
        };

        loadBanks();
    }, []);

    const handleRowClick = (record) => {
        dispatch(setExBank(record.id));
    };

    const handleApplyTicket = () => {
        setIsUnlocked(true);
        setVisible(false);
    };

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    //useEffect tính số ticket có thẻ sử dụng theo (tickedtmode, expiredate, bankname)

    //hàm chuyển trạng thái của bank sang đã mở 

    //hàm gắn bank vào ticket

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
                    {isUnlocked ? (
                        <Tag color="green">Đã mở khóa</Tag>
                    ) : (
                        <Button type="primary" icon={<KeyOutlined />} onClick={() => showModal()}>Áp dụng ticket</Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div>
            <ExMyBreadCrumb path={1}></ExMyBreadCrumb>

            <div style={{ position: 'relative', marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '-8px', left: '-8px' }}>
                        <Badge count={banks.length} style={{ backgroundColor: 'red', boxShadow: 'none' }} />
                    </div>
                    <div style={{ marginLeft: 'auto', padding: '8px 16px', background: '#1890ff', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>
                        <KeyOutlined style={{ marginRight: '8px' }} />
                        Ticket
                    </div>
                </div>
            </div>

            <Table
                dataSource={banks}
                columns={columns}
                align="center"
                loading={loading}
                rowKey="id"
                rowClassName="row-clickable"
                onRow={(record, rowIndex) => { return { onDoubleClick: (event) => { handleRowClick(record) } } }}
            />
            <TicketApprove visible={visible} onApply={handleApplyTicket} onCancel={handleCancel} numberOfTickets={'1'} />
        </div>
    );
};

export default ExBank;
