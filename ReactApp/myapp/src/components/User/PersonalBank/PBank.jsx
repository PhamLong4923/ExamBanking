import React, { useEffect, useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { IoIosArrowForward } from 'react-icons/io';
import { NavLink } from "react-router-dom";
import Dropdown from '../../../common/dropdown';
import { addBank, getBank } from '../../../services/Api';
import '../PersonalBank/PBank.css';
import ToastMessage from '../../Toast/toast';
import MoonLoader from "react-spinners/MoonLoader";
import { getLocalStorageItem, setLocalStorageItem } from '../../../services/LocalStorage';
import PopupCreateModel from '../../EditPopup/popupcreate';
import { GoInbox } from "react-icons/go";
import { FaPlus } from 'react-icons/fa';
import checkLimit from '../../../share/ultils/checklimit';

const PBank = () => {
    const [isactive, setIsactive] = useState(false);
    const [islimit, setIslimit] = useState(false);

    const [bankType, setBankType] = useState(getLocalStorageItem('bankType') || '-1');
    const [editingBankId, setEditingBankId] = useState(null);
    const [isDropdownVisible, setDropdownVisible] = useState();
    const [banks, setBanks] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleMenuClick = (repoId) => {
        setDropdownVisible(prevId => prevId === repoId ? null : repoId);
    };


    //Load bank
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getBank();
                setBanks(response.data);
                setIslimit(checkLimit('bank', banks.length))
                setLoading(false);
                setIsactive(true);
            } catch (error) {
                console.error('Error fetching banks:', error);
                // Handle error here
            }
        };

        fetchData();
    }, [bankType]);

    //End Load Bank


    //Add bank
    const handleAddBank = (value) => {
        console.log(value);
        // const response = addBank({ Bankname: value }) // call addBank api
        // var newid = response.data;
        // setBanks([
        //     ...banks,
        //     {
        //         bankid: newid,
        //         bankname: value,

        //     },
        // ]);
        ToastMessage("Thêm thành công");

    };

    //End Add Bank

    //Del Bank
    const handleDelBank = (bid) => {
        console.log(bid);
        // const response = addBank({ Bankname: value }) // call addBank api
        // var newid = response.data;
        setBanks([
            banks.filter(b => b.bankid === bid)
        ]);
        ToastMessage("Thêm thành công");

    };
    //End Del Bank

    const handleEditTitle = (repoId, newTitle) => {
        // setRepos((prevRepos) =>
        //     prevRepos.map((repo) =>
        //         repo.id === repoId ? { ...repo, title: newTitle } : repo
        //     )
        // );
    };


    //Update Bank
    const handleUpdateBank = (bid, newname) => {
        console.log(bid);
        // const response = addBank({ Bankname: value }) // call addBank api
        // var newid = response.data;
        setBanks((prev) =>
            prev.map((bank) => bank.bankid === bid ? { ...bank, bankname: newname } : bank));
        ToastMessage("Thêm thành công");

    };
    //End Update Bank

    //Popup model function

    //End Popup model function

    const handleSeclectBank = (bankId) => {
        setLocalStorageItem("bankId", bankId);
    }

    return (
        <>
            {bankType === '0' ? (
                <div className='wrapper'>
                    <div className="pathlink">
                        <NavLink className="link" to='/qbank'>Ngân hàng câu hỏi</NavLink>
                        <IoIosArrowForward></IoIosArrowForward>
                        <NavLink className="link">Ngân hàng câu hỏi chung</NavLink>


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
                            banks.length === 0 ? (
                                <div style={{ marginTop: '30px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <GoInbox />
                                    <span>Không có dữ liệu</span>
                                </div>
                            ) : (
                                banks.map(bank => (
                                    <NavLink key={bank.bankid} to={`/repo`} className="pitem titem" onClick={() => handleSeclectBank(bank.bankid)}>
                                        <span className="td">{bank.bankname}</span>
                                    </NavLink>
                                ))
                            )
                        )}
                    </div>

                </div>
            ) : (
                <div className='wrapper'>
                    <div className="pathlink">
                        <NavLink className="link" to='/qbank'>Ngân hàng câu hỏi</NavLink>
                        <IoIosArrowForward></IoIosArrowForward>
                        <NavLink className="link">Ngân hàng câu hỏi cá nhân</NavLink>
                    </div>

                    {/* <button onClick={handleAddBank}>Thêm ngân hàng câu hỏi</button> */}
                    <PopupCreateModel isactive={isactive} islimit={islimit} title={'Thêm ngân hàng'} handlesuccess={handleAddBank} buttonstyle={<div className={'add-new-bank'} ><FaPlus></FaPlus></div>}></PopupCreateModel>

                    <div className="pitem-containers">
                        <div className="pitem">
                            <span className="thead">Tên</span>
                        </div>
                        {loading ? (
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
                                <MoonLoader color="hsla(224, 100%, 46%, 1)" size={50} />
                            </div>
                        ) : (
                            banks.length === 0 ? (
                                <div style={{ marginTop: '30px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><GoInbox /><span>Không có dữ liệu</span></div>
                            ) : (
                                banks.map(bank => (
                                    <NavLink key={bank.bankid} to={`/repo`} className="pitem titem" onClick={() => handleSeclectBank(bank.bankid)}>
                                        <span className="td">{bank.bankname}</span>
                                        <NavLink as="span" className="ta" onClick={() => handleMenuClick(bank.bankid)}>
                                            <i><HiDotsVertical /></i>
                                        </NavLink>
                                        <Dropdown id={bank.bankid} visible={isDropdownVisible === bank.bankid} onClose={() => setDropdownVisible(null)} />
                                    </NavLink>
                                ))
                            )
                        )}


                    </div >
                </div>
            )}
        </>



    )
}

export default PBank;