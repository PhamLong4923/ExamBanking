import React, { useEffect, useState } from 'react';
import { Button, Table, Dropdown, Menu } from 'antd';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import ExMyBreadCrumb from '../../../components/ui/exbreadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { errors } from '../../../components/ui/notifications';
import { AUTHORIZATION_ERROR_MESSAGE, SYSTEM_ERROR_MESSAGE } from '../../../share/constrains';
import { getBank } from '../../../services/api';
import { setExBank } from '../../../redux-setup/action';

const ExBank = () => {
    const [loading, setLoading] = useState(true);
    const [banks, setBanks] = useState([]);
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

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Hành động',
            key: 'action',
            align: 'right',
            render: (text, record) => (
                <Dropdown overlay={<Menu></Menu>}>
                    <Button type="link" icon={<EllipsisOutlined />} />
                </Dropdown>
            ),
        },
    ];

    return (
        <div>
            <ExMyBreadCrumb path={1}></ExMyBreadCrumb>

            {/* Thay đổi nút thêm tại đây */}

            <Table
                dataSource={banks}
                columns={columns}
                align="center"
                loading={loading}
                rowKey="id"
                rowClassName="row-clickable"
                onRow={(record, rowIndex) => { return { onClick: (event) => { handleRowClick(record) } } }}
            // Thay đổi hàm xử lý click hàng tại đây
            />
        </div>
    );
};

export default ExBank;
