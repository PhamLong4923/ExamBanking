import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import { IoIosArrowForward } from 'react-icons/io';
import { NavLink } from "react-router-dom";
import Dropdown from '../../../../common/dropdown';
import '../Repository/Repository.css';
import { useBank } from '../../../../pages/User/Bank/BankContext';
const Repository = (props) => {

    const { bankType, bankId } = useBank();
    const [modalIsOpen, setModalIsOpen] = useState(false); // State để kiểm soát hiển thị 
    const [editingRepoId, setEditingRepoId] = useState(null);
    const [isDropdownVisible, setDropdownVisible] = useState();
    const handleMenuClick = (repoId) => {
        setDropdownVisible(prevId => prevId === repoId ? null : repoId);
    };

    // api get repository
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await getBank(); // Call getBank function
    //             setBanks(response.data);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error('Error fetching banks:', error);
    //             // Handle error here
    //         }
    //     };

    //     fetchData();
    // }, []);

    const [repos, setRepos] = useState([
        {
            id: '1',
            title: 'chương I',
            datetime: '23:00 2/1/2024',
            owner: 'Phạm Thanh Hương',
        }
    ]);

    const handleEditRepo = (repoId) => {
        setEditingRepoId(repoId);
        setModalIsOpen(true);
        setDropdownVisible(null);
    };


    const handleAddRepo = () => {
        const newId = (repos.length + 1).toString();
        setRepos([
            ...repos,
            {
                id: newId,
                title: 'chương I',
                datetime: '23:00 2/1/2024',
                owner: 'Phạm Thanh Hương',
            },
        ]);
        console.log('bankid '+ bankId)
        setEditingRepoId(newId);
        setModalIsOpen(true);
        setDropdownVisible(null);
    };

    const handleSaveEdit = () => {
        setEditingRepoId(null);
        setModalIsOpen(false);
    };

    const handleEditTitle = (repoId, newTitle) => {
        setRepos((prevRepos) =>
            prevRepos.map((repo) =>
                repo.id === repoId ? { ...repo, title: newTitle } : repo
            )
        );
    };

    const handleEditDatetime = (repoId, newDatetime) => {
        setRepos((prevRepos) =>
            prevRepos.map((repo) =>
                repo.id === repoId ? { ...repo, datetime: newDatetime } : repo
            )
        );
    };

    const handleEditOwner = (repoId, newOwner) => {
        setRepos((prevRepos) =>
            prevRepos.map((repo) =>
                repo.id === repoId ? { ...repo, owner: newOwner } : repo
            )
        );
    };

    return (

        <div className='wrapper'>
            <div className="pathlink">
                <NavLink className="link" to='/qbank'>Ngân hàng câu hỏi</NavLink>
                <IoIosArrowForward></IoIosArrowForward>
                <NavLink className="link" to='/pbank'>Ngân hàng câu hỏi cá nhân</NavLink>
                <IoIosArrowForward></IoIosArrowForward>
                <NavLink className="link" to='/repo'>ToanCD</NavLink>
            </div>
            <div className='add-new-bank' onClick={handleAddRepo}>
                {/* <button onClick={handleAddBank}>Thêm ngân hàng câu hỏi</button> */}

                <FaPlus></FaPlus>
            </div>
            <div className="pitem-containers">

                <div className="pitem">
                    <span className="thead">Tên</span>
                    <span className="thead">Ngày tạo</span>
                    <span className="thead">Tác giả</span>
                </div>
                {repos.map(repo => (
                    <div>
                        {/* <NavLink key={bank.id} to={`/repo/${bank.id}`} className="pitem titem"> */}
                        <NavLink key={repo.id} to={'/sec/1'} className="pitem titem">
                            <span className="td">{repo.title}</span>
                            <span className="td">{repo.datetime}</span>
                            <span className="td">{repo.owner}</span>
                            <NavLink as="span" className="ta" onClick={() => handleMenuClick(repo.id)}>
                                <i><HiDotsVertical></HiDotsVertical></i>
                            </NavLink>
                        </NavLink>
                        <Dropdown
                            id={repo.id}
                            // onClick={() => handleEditRepo(repo.id)}
                            visible={isDropdownVisible === repo.id}
                            onDelete={''}
                            onEdit={() => handleEditRepo(repo.id)}
                        />
                        {modalIsOpen && (
                            <div className="modal" style={{ display: modalIsOpen ? 'block' : 'none' }}>
                                <div className="modal-content">
                                    <span className="close" onClick={() => setModalIsOpen(false)}>&times;</span>
                                    <div className='editquestion-head'>
                                        <div className='repo-input'>
                                            <label htmlFor='repo-title'>Title</label>
                                            <input id='repo-title' value={repo.title} onChange={(e) => handleEditTitle(repo.id, e.target.value)}></input>
                                        </div>
                                        <div className='repo-input'>
                                            <label htmlFor='repo-datetime'>Datetime</label>
                                            <input id='repo-datetime' value={repo.datetime} onChange={(e) => handleEditDatetime(repo.id, e.target.value)}></input>
                                        </div>
                                        <div className='repo-input'>
                                            <label htmlFor='repo-owner'>Owner</label>
                                            <input id='repo-owner' value={repo.owner} onChange={(e) => handleEditOwner(repo.id, e.target.value)}></input>
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
                ))}

            </div>
        </div >
    )
}
export default Repository;