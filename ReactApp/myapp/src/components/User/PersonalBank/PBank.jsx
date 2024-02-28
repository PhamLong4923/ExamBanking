import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import Dropdown from '../../../common/dropdown';
import '../PersonalBank/PBank.css';

const PBank = (props) => {

    const [modalIsOpen, setModalIsOpen] = useState(false); // State để kiểm soát hiển thị 
    const [editingBankId, setEditingBankId] = useState(null);
    const [isDropdownVisible, setDropdownVisible] = useState();
    const handleMenuClick = (repoId) => {
        setDropdownVisible(prevId => prevId === repoId ? null : repoId);
    };

    const [banks, setBanks] = useState([
        {
            id: '1',
            title: 'Toán cánh diều',
            datetime: '23:00 2/1/2024',
            owner: 'Phạm Thanh Hương',
        }
    ]);

    const handleAddBank = () => {
        const newId = (banks.length + 1).toString();
        setBanks([
            ...banks,
            {
                id: newId,
                title: 'Toán cánh diều',
                datetime: '23:00 2/1/2024',
                owner: 'Phạm Thanh Hương',
            },
        ]);
        setEditingBankId(newId);
        setModalIsOpen(true);
    };

    return (

        <div className='wrapper'>
            <div className="pathlink">
                <NavLink className="link" to='/qbank'>Ngân hàng câu hỏi</NavLink>
                <i class="fa-solid fa-caret-right"></i>
                <NavLink className="link">Ngân hàng câu hỏi cá nhân</NavLink>
            </div>
            <div className='add-new-bank'>
                {/* <button onClick={handleAddBank}>Thêm ngân hàng câu hỏi</button> */}
                <i onClick={handleAddBank} class="fa-solid fa-plus fa-2xl icon-pointer"></i>
            </div>
            <div className="pitem-containers">
                <div className="pitem">
                    <span className="thead">Tên</span>
                    <span className="thead">Ngày tạo</span>
                    <span className="thead">Tác giả</span>
                </div>
                {banks.map(bank => (
                    // <NavLink key={bank.id} to={`/repo/${bank.id}`} className="pitem titem">
                    <NavLink key={bank.id} to={`/repo`} className="pitem titem">
                        <span className="td">{bank.title}</span>
                        <span className="td">{bank.datetime}</span>
                        <span className="td">{bank.owner}</span>
                        <NavLink as="span" className="ta" onClick={() => handleMenuClick(bank.id)}>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                        </NavLink>
                        <Dropdown id={bank.id} visible={isDropdownVisible === bank.id} onClose={() => setDropdownVisible(null)} />
                    </NavLink>
                ))}
            </div >
        </div>
    )
}

export default PBank;