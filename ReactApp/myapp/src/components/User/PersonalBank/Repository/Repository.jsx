import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import '../Repository/Repository.css';
import { IoIosArrowForward } from 'react-icons/io';
import { HiDotsVertical } from "react-icons/hi";
import { FaPlus } from 'react-icons/fa';
const Repository = (props) => {

    const [modalIsOpen, setModalIsOpen] = useState(false); // State để kiểm soát hiển thị 
    const [editingRepoId, setEditingRepoId] = useState(null);

    const [repos, setRepos] = useState([
        {
            id: '1',
            title: 'chương I',
            datetime: '23:00 2/1/2024',
            owner: 'Phạm Thanh Hương',
        }
    ]);

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
        setEditingRepoId(newId);
        setModalIsOpen(true);
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
                    // <NavLink key={bank.id} to={`/repo/${bank.id}`} className="pitem titem">
                    <NavLink key={repo.id} to={'/sec/1'} className="pitem titem">
                        <span className="td">{repo.title}</span>
                        <span className="td">{repo.datetime}</span>
                        <span className="td">{repo.owner}</span>
                        <NavLink as="span" className="ta">
                            <i><HiDotsVertical></HiDotsVertical></i>
                        </NavLink>

                    </NavLink>
                ))}

                {/* <NavLink to={'/sec/1'} className="pitem titem">
                    <span className="td">Chương II</span>
                    <span className="td">23:00 2/1/2024</span>
                    <span className="td">Phạm Thanh Hương</span>
                    <NavLink as="span" className="ta">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </NavLink>

                </NavLink>

                <NavLink to={'/sec/1'} className="pitem titem">
                    <span className="td">Chương III</span>
                    <span className="td">23:00 2/1/2024</span>
                    <span className="td">Phạm Thanh Hương</span>
                    <NavLink as="span" className="ta">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </NavLink>

                </NavLink>

                <NavLink to={'/sec/1'} className="pitem titem">
                    <span className="td">Chương IV</span>
                    <span className="td">23:00 2/1/2024</span>
                    <span className="td">Phạm Thanh Hương</span>
                    <NavLink as="span" className="ta">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </NavLink>

                </NavLink> */}

            </div>
        </div>
    )
}
export default Repository;