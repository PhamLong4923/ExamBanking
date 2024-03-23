import React, { useEffect, useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { IoIosArrowForward } from 'react-icons/io';
import { NavLink } from "react-router-dom";
import Dropdown from '../../../common/dropdown';
import { addBank, delBank, getBank, updateBank } from '../../../services/Api';
import '../PersonalBank/PBank.css';
import ToastMessage from '../../Toast/toast';
import MoonLoader from "react-spinners/MoonLoader";
import { getLocalStorageItem, setLocalStorageItem } from '../../../services/LocalStorage';
import PopupCreateModel from '../../EditPopup/popupcreate';
import { GoInbox } from "react-icons/go";
import { FaPlus } from 'react-icons/fa';
import checkLimit from '../../../share/ultils/checklimit';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setBankId } from '../../../redux/action';

const PBank = () => {
    const [isactive, setIsactive] = useState(false);
    const [islimit, setIslimit] = useState(false);

    const dispatch = useDispatch();

    const banktype = useSelector(state => state.bankType);
    const [bankType, setBankType] = useState(banktype || '-1');
    const [editingBankId, setEditingBankId] = useState(null);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
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
                setIslimit(checkLimit('bank', banks.length));
                setIsactive(true);


                setLoading(false);

            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setBanks([]);
                    setLoading(false);
                    toast.error("Chưa xác thực tài khoản");
                } else {
                    toast.error("Lỗi hệ thống");
                    console.log(error);
                }
            }
        };

        fetchData();
    }, []);

    //End Load Bank


    //Add bank
    const handleAddBank = async (value) => {
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
            toast.success("Thêm thành công");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error("Thực hiện thất bại");
            }
        }


    };

    //End Add Bank

    //Del Bank
    const handleDelBank = async (bid) => {
        try {
            const response = await delBank(bid);
            var bid = response.data;
            setBanks([
                banks.filter(b => b.bankid === bid)
            ]);
            toast.success("Xóa thành công");
        } catch (error) {
            toast.error("Xóa không thành công");
            console.log(error);
        }
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
    const handleUpdateBank = async (bid, newname) => {
        try {

            const response = await updateBank(bid, newname);

            if (response.status === 200) {
                setBanks(prev =>
                    prev.map(bank => bank.bankid === bid ? { ...bank, bankname: newname } : bank)
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
    //End Update Bank

    //Popup model function

    //End Popup model function

    const handleSeclectBank = (bankId) => {
        dispatch(setBankId(bankId));
    }

    return (
        <>
            {/*Thêm thẻ loader (spinner) sẽ bắt đầu khi 1 api được gọi và kết thúc khi api đó trả về response ( cho các phần CUD)*/}
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
                                    <NavLink key={bank.id} to={`/repo`} className="pitem titem">
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
                                    <>
                                        <NavLink key={bank.id} to={`/repo`} className="pitem titem" onClick={() => handleSeclectBank(bank.id)}>
                                            <span className="td">{bank.name}</span>
                                            <NavLink as="span" className="ta" onClick={() => handleMenuClick(bank.id)}>
                                                <i><HiDotsVertical /></i>
                                            </NavLink>
                                        </NavLink>
                                        <Dropdown id={bank.id} visible={isDropdownVisible === bank.id} onClose={() => setDropdownVisible(null)} onDelete={() => handleDelBank(bank.id)} onEdit={handleUpdateBank(bank.id,)} />

                                    </>


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