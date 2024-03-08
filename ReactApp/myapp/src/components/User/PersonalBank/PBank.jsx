import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import { IoIosArrowForward } from 'react-icons/io';
import { NavLink } from "react-router-dom";
import Dropdown from '../../../common/dropdown';
import { getBank } from '../../../services/Api';
import '../PersonalBank/PBank.css';
import ToastMessage from '../../Toast/toast';
import BarLoader from "react-spinners/BarLoader";
import { useBank } from '../../../pages/User/Bank/BankContext';

const PBank = () => {

    const { bankType, setBankId } = useBank();
    const [modalIsOpen, setModalIsOpen] = useState(false); // State để kiểm soát hiển thị 
    const [editingBankId, setEditingBankId] = useState(null);
    const [isDropdownVisible, setDropdownVisible] = useState();
    const [banks, setBanks] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleMenuClick = (repoId) => {
        setDropdownVisible(prevId => prevId === repoId ? null : repoId);
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getBank({Bank:bankType}); // Call getBank function
                setBanks(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching banks:', error);
                // Handle error here
            }
        };

        fetchData();
    }, [bankType]);



    const handleAddBank = () => {
        const newId = (banks.length + 1).toString();
        setBanks([
            ...banks,
            {
                bankid: newId,
                bankname: 'Toán cánh diều',
                bankstatus: '23:00 2/1/2024',
                accid: 'Phạm Thanh Hương',
            },
        ]);
        ToastMessage("Thêm thành công");
        setEditingBankId(newId);
        setModalIsOpen(true);
    };

    const handleSeclectBank = (bankId) => {
        setBankId(bankId)
    }

    return (

        <div className='wrapper'>
            <div className="pathlink">
                <NavLink className="link" to='/qbank'>Ngân hàng câu hỏi</NavLink>
                <IoIosArrowForward></IoIosArrowForward>
                {bankType === '0' ? (
                    <NavLink className="link">Ngân hàng câu hỏi chung</NavLink>
                ) : (
                    <NavLink className="link">Ngân hàng câu hỏi cá nhân</NavLink>
                )}

            </div>
            <div className='add-new-bank' onClick={handleAddBank}>
                {/* <button onClick={handleAddBank}>Thêm ngân hàng câu hỏi</button> */}
                <FaPlus></FaPlus>
            </div>
            <div className="pitem-containers">
                <div className="pitem">
                    <span className="thead">Tên</span>
                    <span className="thead">Ngày tạo</span>
                    <span className="thead">Tác giả</span>
                </div>
                {loading ?
                    <BarLoader color="#36d7b7" width={1380} />
                    :
                    banks.map(bank => (
                        // <NavLink key={bank.id} to={`/repo/${bank.id}`} className="pitem titem">
                        <NavLink key={bank.bankid} to={`/repo`} className="pitem titem" onClick={handleSeclectBank(bank.bankid)}>
                            <span className="td">{bank.bankname}</span>
                            <span className="td">{bank.bankstatus}</span>
                            <span className="td">{bank.accid}</span>
                            {bankType === '1' && // Nếu bankType là 1, thì hiển thị HiDotsVertical
                                <NavLink as="span" className="ta" onClick={() => handleMenuClick(bank.bankid)}>
                                    <i><HiDotsVertical></HiDotsVertical></i>
                                </NavLink>
                            }
                            <Dropdown id={bank.bankid} visible={isDropdownVisible === bank.bankid} onClose={() => setDropdownVisible(null)} />
                        </NavLink>
                    ))}
            </div >
        </div>
    )
}

export default PBank;