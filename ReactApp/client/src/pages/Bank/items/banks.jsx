import React, { useEffect, useState } from 'react';
import { Button, Table, Dropdown, Menu } from 'antd';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import ConfirmationModal from '../../../components/ui/confirmModel';
import EditModal from '../../../components/ui/editNameModel';
import MyBreadCrumb from '../../../components/ui/breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { AUTHORIZATION_ERROR_MESSAGE, SYSTEM_BANK, SYSTEM_ERROR_MESSAGE, SYSTEM_LIMIT_MESSAGE, SYSTEM_SUCCESS_MESSAGE } from '../../../share/constrains';
import setLimit from '../../../ultils/setlimit';
import { getBank, delBank, addBank, updateBank } from '../../../services/api';
import { success, errors, warning } from '../../../components/ui/notifications';
import { setBankId } from '../../../redux-setup/action';


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
                setIsLimit(setLimit('bank', response.data.length));
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
        setIsLimit(setLimit('bank', banks.length));
    }, [banks]);

    const handleAddBank = async (id, value) => {
        try {
            const response = await addBank({ Bankname: value }) // call addBank api

            var newid = response.data;
            setBanks([
                ...banks,
                {
                    id: newid,
                    name: value,
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
            const updatedBanks = banks.filter(b => b.id !== dbid);
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
                    prev.map(bank => bank.id === id ? { ...bank, name: newname } : bank)
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
            setDeleteItemId(record.id);
            setCfvisible({ [record.id]: true });
        } else if (key === 'edit') {
            setEditItemId(record.id);
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
            dataIndex: 'name',
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
        dispatch(setBankId(record.id));
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
                rowKey="id"
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
