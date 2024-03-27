import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import { IoIosArrowForward } from 'react-icons/io';
import { NavLink } from "react-router-dom";
import { toast } from 'react-toastify';
import Dropdown from '../../../../common/dropdown';
import '../Repository/Repository.css';
import MoonLoader from "react-spinners/MoonLoader";
import { addRepository, delRepository, getRepository, updateRepository } from '../../../../services/Api';
import PopupCreateModel from '../../../EditPopup/popupcreate';
import { GoInbox } from "react-icons/go";
import checkLimit from '../../../../share/ultils/checklimit';
import { useDispatch, useSelector } from 'react-redux';
import { setRepoId } from '../../../../redux/action';

const Repository = () => {
    const [isactive, setIsactive] = useState(false);
    const [islimit, setIslimit] = useState(false);

    const dispatch = useDispatch();
    const bankid = useSelector(state => state.bankId);
    const [bankType, setBankType] = useState(useSelector(state => state.bankType));
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editingRepoId, setEditingRepoId] = useState(null);
    const [isDropdownVisible, setDropdownVisible] = useState();
    const [loading, setLoading] = useState(true);
    const [repos, setRepos] = useState([
        // {
        //     id: '1',
        //     title: 'chương I',
        //     datetime: '23:00 2/1/2024',
        //     owner: 'Phạm Thanh Hương',
        // }
    ]);
    const handleMenuClick = (repoId) => {
        setDropdownVisible(prevId => prevId === repoId ? null : repoId);
    };

    // Load repository
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRepository({ bankid }); // Call getBank function
                setRepos(response.data);
                setIslimit(checkLimit('repo', response.data.length))
                setLoading(false);
                setIsactive(true);
            } catch (error) {
                console.error('Error fetching banks:', error);
                // Handle error here
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setIslimit(checkLimit('repo', repos.length));
    }, [repos]);

    //End load repo

    //Add repo
    const handleAddRepo = async (value) => {

        try {
            const response = await addRepository({ bankId: bankid, Repocontent: value });
            var newid = response.data;
            setRepos([
                ...repos,
                {
                    repoid: newid,
                    reponame: value,
                },
            ]);
            toast.success("Thêm thành công");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error("Thực hiện thất bại");
            }
        }

    };

    //end add repo

    const handleUpdateRepo = async (repoid, newname) => {
        try {

            const response = await updateRepository(repoid, newname);

            if (response.data === repoid) {
                setRepos(prev =>
                    prev.map(repos => repos.repoid === repoid ? { ...repos, reponame: newname } : repos)
                );
                toast.success("Chỉnh sửa thành công");
            } else {
                toast.error("Có lỗi xảy ra khi cập nhật ngân hàng");
            }
        } catch (error) {
            console.error("Đã xảy ra lỗi:", error);
            toast.error("Lỗi hệ thống");
        }

    };

    const handleDelRepo = async (repoId) => {
        try {
            const response = await delRepository(repoId);
            var drid = response.data;
            const updatedRepo = repos.filter(r => r.repoid !== drid);
            setRepos(updatedRepo);
            toast.success("Xóa thành công");
        } catch (error) {
            toast.error("Xóa không thành công");
            console.log(error);
        }
    };


    const handleSelectRepo = (repoid) => {
        dispatch(setRepoId(repoid));
    }

    return (
        <>
            {bankType === '0' ? (
                <div className='wrapper'>
                    <div className="pathlink">
                        <NavLink className="link" to='/qbank'>Ngân hàng câu hỏi</NavLink>
                        <IoIosArrowForward></IoIosArrowForward>
                        <NavLink className="link" to='/pbank'>Ngân hàng câu chung</NavLink>
                        <IoIosArrowForward></IoIosArrowForward>
                        <NavLink className="link" to='/repo'>ToanCD</NavLink>
                    </div>

                    <div className="pitem-containers">
                        <div className="pitem">
                            <span className="thead">Tên</span>
                        </div>
                        {loading ? (
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
                                <MoonLoader color="hsla(224, 100%, 46%, 1)" size={50} />
                            </div>
                        ) : (
                            repos.length === 0 ? (
                                <div style={{ marginTop: '30px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <GoInbox />
                                    <span>Không có dữ liệu</span>
                                </div>
                            ) : (
                                repos.map(repo => (
                                    <div key={repo.repoid}>
                                        <NavLink to={'/sec'} className="pitem titem" onClick={() => handleSelectRepo(repo.repoid)}>
                                            <span className="td">{repo.reponame}</span>

                                        </NavLink>

                                    </div>
                                ))
                            )
                        )
                        }
                    </div>
                </div>
            ) : (
                <div className='wrapper'>
                    <div className="pathlink">
                        <NavLink className="link" to='/qbank'>Ngân hàng câu hỏi</NavLink>
                        <IoIosArrowForward></IoIosArrowForward>
                        <NavLink className="link" to='/pbank'>Ngân hàng câu hỏi cá nhân</NavLink>
                        <IoIosArrowForward></IoIosArrowForward>
                        <NavLink className="link" to='/repo'>ToanCD</NavLink>
                    </div>
                    <PopupCreateModel isactive={isactive} islimit={islimit} title={'Thêm chương'} handlesuccess={handleAddRepo} buttonstyle={<div className={'add-new-bank'}><FaPlus /></div>}></PopupCreateModel>
                    <div className="pitem-containers">
                        <div className="pitem">
                            <span className="thead">Tên</span>
                        </div>
                        {loading ? (
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
                                <MoonLoader color="hsla(224, 100%, 46%, 1)" size={50} />
                            </div>
                        ) : (
                            repos.length === 0 ? (
                                <div style={{ marginTop: '30px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <GoInbox />
                                    <span>Không có dữ liệu</span>
                                </div>
                            ) : (
                                repos.map(repo => (
                                    <div key={repo.repoid}>
                                        <NavLink to={'/sec'} className="pitem titem" onClick={() => handleSelectRepo(repo.repoid)}>
                                            <span className="td">{repo.reponame}</span>
                                            <NavLink as="span" className="ta" onClick={() => handleMenuClick(repo.repoid)}>
                                                <i><HiDotsVertical></HiDotsVertical></i>
                                            </NavLink>
                                        </NavLink>
                                        <Dropdown
                                            id={repo.repoid}
                                            visible={isDropdownVisible === repo.repoid}
                                            onDelete={handleDelRepo}
                                            onEdit={handleUpdateRepo}
                                        />

                                    </div>
                                ))
                            )
                        )}
                    </div>
                </div>

            )}
        </>


    )
}
export default Repository;