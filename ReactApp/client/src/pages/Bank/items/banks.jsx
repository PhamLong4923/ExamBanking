import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyBreadCrumb from '../../../components/ui/breadcrumb';
import ConfirmationModal from '../../../components/ui/confirmModel';
import EditModal from '../../../components/ui/editNameModel';
import { errors, success, warning } from '../../../components/ui/notifications';
import { setBankId } from '../../../redux-setup/action';
import { addBank, delBank, getBank, updateBank } from '../../../services/api';
import { AUTHORIZATION_ERROR_MESSAGE, SYSTEM_BANK, SYSTEM_ERROR_MESSAGE, SYSTEM_LIMIT_MESSAGE, SYSTEM_SUCCESS_MESSAGE } from '../../../share/constrains';
import setLimit from '../../../ultils/setlimit';

const Bank = () => {

    const dispatch = useDispatch();

    const [cfvisible, setCfvisible] = useState({});
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [addmodal, setAddModal] = useState(false);
    const [editItemId, setEditItemId] = useState('');
    const [isallow, setIsallow] = useState(false);
    const bankType = useSelector(state => state.bankType);
    const [islimit, setIsLimit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [banks, setBanks] = useState([]);

    useEffect(() => {
        if (bankType === SYSTEM_BANK) {
            setIsallow(true);
        }
    })

    useEffect(() => {
        const loadBanks = async () => {
            try {
                const response = await getBank();
                setBanks(response.data);
                setIsLimit(await setLimit('bank', response.data.length));
                console.log(islimit);
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

    useEffect(() => {
        const fetchData = async () => {
            const isbanklimit = await setLimit('bank', banks.length);
            setIsLimit(isbanklimit);
        };

        fetchData();
    }, [banks]);


    const handleAddBank = async (id, value) => {
        try {
            const response = await addBank({ Bankname: value }) // call addBank api

            var newid = response.data;
            setBanks([
                ...banks,
                {
                    bankid: newid,
                    bankname: value,
                },
            ]);
            success(SYSTEM_SUCCESS_MESSAGE, 2);
            setAddModal(false);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                errors(SYSTEM_ERROR_MESSAGE, 2);
            }
        }
    }

    const handleDeleteBank = async (id) => {
        try {
            const response = await delBank(id);
            var dbid = response.data;
            const updatedBanks = banks.filter(b => b.bankid !== dbid);
            setBanks(updatedBanks);
            setCfvisible(false);
            success(SYSTEM_SUCCESS_MESSAGE, 2);
        } catch (error) {
            errors(SYSTEM_ERROR_MESSAGE, 2);
            console.log(error);
        }
    }

    const handleEditBank = async (id, newname) => {
        try {

            const response = await updateBank(id, newname);

            if (response.data === id) {
                setBanks(prev =>
                    prev.map(bank => bank.bankid === id ? { ...bank, bankname: newname } : bank)
                );
                setEditModalVisible(false);
                success(SYSTEM_SUCCESS_MESSAGE, 2);
            } else {
                errors(SYSTEM_ERROR_MESSAGE, 2);
            }
        } catch (error) {
            errors(SYSTEM_ERROR_MESSAGE, 2);
            console.log(error);
        }
    }

    const handleMenuClick = (e, record) => {
        const { key } = e;
        if (key === 'delete') {
            setDeleteItemId(record.bankid);
            setCfvisible({ [record.bankid]: true });
        } else if (key === 'edit') {
            setEditItemId(record.bankid);
            setEditModalVisible(true);
        }
    };

    const handleOpenModel = (limit) => {
        if (limit === true) {
            warning(SYSTEM_LIMIT_MESSAGE, 2);
        } else {
            setAddModal(true);
        }
    }

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'bankname',
            key: 'name',
        },
        {
            title: 'Hành động',
            key: 'action',
            align: 'right',
            render: (text, record) => (
                <Dropdown
                    overlay={
                        <Menu disabled={isallow}>
                            <Menu.Item key="edit" onClick={(e) => handleMenuClick(e, record)}>Chỉnh sửa</Menu.Item>
                            <Menu.Item key="delete" onClick={(e) => handleMenuClick(e, record)}>Xóa</Menu.Item>
                        </Menu>
                    }
                >
                    <Button type="link" icon={<EllipsisOutlined />} />
                </Dropdown>
            ),
        },
    ];

    const handleRowClick = (record) => {
        dispatch(setBankId(record.bankid));
    };

    return (
        <div>
            <MyBreadCrumb path={1}></MyBreadCrumb>

            <Button disabled={isallow} onClick={() => handleOpenModel(islimit)} type="primary" icon={<PlusOutlined />} style={{ marginBottom: '16px', float: 'left' }}>
                Thêm
            </Button>
            <EditModal
                title={'Nhập tên ngân hàng'}
                visible={addmodal}
                onCancel={() => setAddModal(false)}
                onOk={handleAddBank}
                id={null}
            />

            <Table dataSource={banks}
                columns={columns}
                align="center"
                loading={loading}
                rowKey="bankid"
                rowClassName="row-clickable"
                onRow={(record, rowIndex) => { return { onDoubleClick: (event) => { handleRowClick(record) } } }} />
            <ConfirmationModal
                isvisible={Object.values(cfvisible).includes(true)}
                onCancel={() => setCfvisible({})}
                onOk={() => handleDeleteBank(deleteItemId)}
            />
            <EditModal
                title={'Sửa tên ngân hàng'}
                visible={editModalVisible}
                onCancel={() => setEditModalVisible(false)}
                onOk={handleEditBank}
                id={editItemId}
            />
        </div>
    );
};

export default Bank;
