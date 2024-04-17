import React, { useEffect, useState } from 'react';
import { Button, Table, Dropdown, Menu } from 'antd';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import ConfirmationModal from '../../../components/ui/confirmModel';
import EditModal from '../../../components/ui/editNameModel';
import MyBreadCrumb from '../../../components/ui/breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { AUTHORIZATION_ERROR_MESSAGE, SYSTEM_BANK, SYSTEM_ERROR_MESSAGE, SYSTEM_LIMIT_MESSAGE, SYSTEM_SUCCESS_MESSAGE } from '../../../share/constrains';
import setLimit from '../../../ultils/setlimit';
import { getRepository, addRepository, delRepository, updateRepository } from '../../../services/api';
import { success, errors, warning } from '../../../components/ui/notifications';
import { setRepoId } from '../../../redux-setup/action';


const Bank = () => {

    const dispatch = useDispatch();

    const [cfvisible, setCfvisible] = useState({});
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [addmodal, setAddModal] = useState(false);
    const [editItemId, setEditItemId] = useState('');
    const [isallow, setIsallow] = useState(false);
    const bankType = useSelector(state => state.bankType);
    const bankId = useSelector(state => state.bankId);
    const [islimit, setIsLimit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        if (bankType === SYSTEM_BANK) {
            setIsallow(true);
        }
    })

    useEffect(() => {
        const loadRepos = async () => {
            try {
                const response = await getRepository(bankId);
                setRepos(response.data);
                setIsLimit(await setLimit('repo', response.data.length));
                setLoading(false);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setRepos([]);
                    setLoading(false);
                    errors(AUTHORIZATION_ERROR_MESSAGE, 2);
                } else {
                    errors(SYSTEM_ERROR_MESSAGE, 2);
                    console.log(error);
                }
            }
        };

        loadRepos();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const isRepoLimitReached = await setLimit('repo', repos.length);
            setIsLimit(isRepoLimitReached);
        };

        fetchData();
    }, [repos]);


    const handleAddRepo = async (id, value) => {
        try {
            const response = await addRepository({ Bankid: id, Repocontent: value })

            var newid = response.data;
            setRepos([
                ...repos,
                {
                    repoid: newid,
                    reponame: value,
                },
            ]);
            setAddModal(false);
            success(SYSTEM_SUCCESS_MESSAGE, 2);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                errors(SYSTEM_ERROR_MESSAGE, 2);
            }
        }
    }

    const handleDeleteRepo = async (id) => {
        try {
            const response = await delRepository(id);
            var drid = response.data;
            const updatedRepos = repos.filter(r => r.repoid !== drid);
            setRepos(updatedRepos);
            setCfvisible(false);
            success(SYSTEM_SUCCESS_MESSAGE, 2);
        } catch (error) {
            errors(SYSTEM_ERROR_MESSAGE, 2);
            console.log(error);
        }
    }

    const handleEditRepo = async (id, newname) => {
        try {

            const response = await updateRepository(id, newname);

            if (response.data === id) {
                setRepos(prev =>
                    prev.map(repo => repo.repoid === id ? { ...repos, reponame: newname } : repo)
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
            setDeleteItemId(record.repoid);
            setCfvisible({ [record.repoid]: true });
        } else if (key === 'edit') {
            setEditItemId(record.repoid);
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
            dataIndex: 'reponame',
            key: 'repoid',
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
        dispatch(setRepoId(record.repoid));
    };

    return (
        <div>
            <MyBreadCrumb path={2}></MyBreadCrumb>

            <Button disabled={isallow} onClick={() => handleOpenModel(islimit)} type="primary" icon={<PlusOutlined />} style={{ marginBottom: '16px', float: 'left' }}>
                Thêm
            </Button>
            <EditModal
                title={'Nhập tên chương'}
                visible={addmodal}
                onCancel={() => setAddModal(false)}
                onOk={handleAddRepo}
                id={bankId}
            />

            <Table dataSource={repos}
                columns={columns}
                align="center"
                loading={loading}
                rowKey="repoid"
                rowClassName="row-clickable"
                onRow={(record, rowIndex) => { return { onDoubleClick: (event) => { handleRowClick(record) } } }} />
            <ConfirmationModal
                isvisible={Object.values(cfvisible).includes(true)}
                onCancel={() => setCfvisible({})}
                onOk={() => handleDeleteRepo(deleteItemId)}
            />
            <EditModal
                title={'Sửa tên ngân hàng'}
                visible={editModalVisible}
                onCancel={() => setEditModalVisible(false)}
                onOk={handleEditRepo}
                id={editItemId}
            />
        </div>
    );
};

export default Bank;
