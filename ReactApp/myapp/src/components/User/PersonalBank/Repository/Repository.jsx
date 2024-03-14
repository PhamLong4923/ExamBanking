import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import { IoIosArrowForward } from 'react-icons/io';
import { NavLink } from "react-router-dom";
import { toast } from 'react-toastify';
import Dropdown from '../../../../common/dropdown';
import '../Repository/Repository.css';
import ToastMessage from '../../../Toast/toast';
import MoonLoader from "react-spinners/MoonLoader";
import { setLocalStorageItem, getLocalStorageItem } from '../../../../services/LocalStorage';
import { getRepository } from '../../../../services/Api';
import PopupCreateModel from '../../../EditPopup/popupcreate';
import { GoInbox } from "react-icons/go";
import checkLimit from '../../../../share/ultils/checklimit';

const Repository = (props) => {
    const [isactive, setIsactive] = useState(false);
    const [islimit, setIslimit] = useState(false);

    const bankid = getLocalStorageItem("bankId");
    const [bankType, setBankType] = useState(getLocalStorageItem('bankType') || '-1');
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
                setIslimit(checkLimit('repo', repos.length))
                setLoading(false);
                setIsactive(true);
            } catch (error) {
                console.error('Error fetching banks:', error);
                // Handle error here
            }
        };

        fetchData();
    }, []);

    const handleEditRepo = (repoId) => {
        setEditingRepoId(repoId);
        setModalIsOpen(true);
        setDropdownVisible(null);
    };


    const handleAddRepo = () => {
        const newId = (repos.length + 1).toString(); // gọi api createrepo, trả về id repo
        setRepos([
            ...repos,
            {
                id: newId,
                title: 'chương I',
                datetime: '23:00 2/1/2024',
                owner: 'Phạm Thanh Hương',
            },
        ]);

    };

    const handleSaveEdit = () => {
        setEditingRepoId(null);
        setModalIsOpen(false);
    };

    const handleDeleteRepo = (repoId, toastId) => {
        const updatedRepos = repos.filter(repo => repo.id !== repoId);
        setRepos(updatedRepos);
        setDropdownVisible(null);
        toast.dismiss(toastId);
    };

    const toastVerifyDelete = (repoId) => {
        setDropdownVisible(null);
        toast((t) => (
            <div>
                Are you sure want to delete?
                <div className='toast-buttons'>
                    <button onClick={() => toast.dismiss(t.id)}>
                        Cancel
                    </button>
                    <button onClick={() => handleDeleteRepo(repoId, t.id)}>
                        Yes
                    </button>
                </div>
            </div>
        ));
    }

    const handleEditTitle = (repoId, newTitle) => {
        setRepos((prevRepos) =>
            prevRepos.map((repo) =>
                repo.id === repoId ? { ...repo, title: newTitle } : repo
            )
        );
    };


    const handleSelectRepo = (repoid) => {
        setLocalStorageItem("repoId", repoid);
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
                                    <div key={repo.id}>
                                        <NavLink to={'/sec/1'} className="pitem titem" onClick={() => handleSelectRepo(repo.id)}>
                                            <span className="td">{repo.title}</span>
                                            <NavLink as="span" className="ta" onClick={() => handleMenuClick(repo.id)}>
                                                <i><HiDotsVertical></HiDotsVertical></i>
                                            </NavLink>
                                        </NavLink>
                                        <Dropdown
                                            visible={isDropdownVisible === repo.id}
                                            onDelete={() => toastVerifyDelete(repo.id)}
                                            onEdit={() => handleEditRepo(repo.id)}
                                        />
                                        {modalIsOpen && editingRepoId === repo.id && (
                                            <div className="modal" style={{ display: modalIsOpen ? 'block' : 'none' }}>
                                                {/* Modal content */}
                                            </div>
                                        )}
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
                                    <div key={repo.id}>
                                        <NavLink to={'/sec/1'} className="pitem titem" onClick={() => handleSelectRepo(repo.id)}>
                                            <span className="td">{repo.title}</span>
                                            <NavLink as="span" className="ta" onClick={() => handleMenuClick(repo.id)}>
                                                <i><HiDotsVertical></HiDotsVertical></i>
                                            </NavLink>
                                        </NavLink>
                                        <Dropdown
                                            visible={isDropdownVisible === repo.id}
                                            onDelete={() => toastVerifyDelete(repo.id)}
                                            onEdit={() => handleEditRepo(repo.id)}
                                        />
                                        {modalIsOpen && editingRepoId === repo.id && (
                                            <div className="modal" style={{ display: modalIsOpen ? 'block' : 'none' }}>
                                                <div className="modal-content">
                                                    <span className="close" onClick={() => setModalIsOpen(false)}>&times;</span>
                                                    <div className='editquestion-head'>
                                                        <div className='repo-input'>
                                                            <label htmlFor='repo-title'>Title</label>
                                                            <input id='repo-title' value={repo.title} onChange={(e) => handleEditTitle(repo.id, e.target.value)}></input>
                                                        </div>
                                                    </div>
                                                    <div className='addquestion-savebutton'>
                                                        <button onClick={() => handleSaveEdit()}>
                                                            Lưu
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
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