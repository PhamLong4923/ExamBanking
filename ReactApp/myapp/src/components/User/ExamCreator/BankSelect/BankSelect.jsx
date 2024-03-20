import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { getBank } from '../../../../services/Api';
import { getLocalStorageItem } from '../../../../services/LocalStorage';
import { setLocalStorageItem } from '../../../../services/LocalStorage';
import { HashLoader } from 'react-spinners';
import { GoInbox } from 'react-icons/go';

export default function BankSelect() {

    const bankType = getLocalStorageItem('bankType');
    const [loading, setLoading] = useState(true);

    const [banks, setBanks] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getBank();
                setLoading(false);
                setBanks(response.data);
            } catch (error) {
                console.error('Error fetching banks:', error);

            }
        };

        fetchData();
    }, []);

    const handleSelectBank = (value) => {
        setLocalStorageItem('bid', value);
    }

    return (
        <>
            <div className="pathlink">
                <NavLink className="link" to='/exam'>Tạo đề kiểm tra</NavLink>
                <IoIosArrowForward></IoIosArrowForward>
                {bankType === '0' ? (<NavLink className="link" to='/exbank'>Ngân hàng câu hỏi chung</NavLink>) : (<NavLink className="link" to='/exbank'>Ngân hàng câu hỏi cá nhân</NavLink>)}

            </div>

            <div className="pitem-containers">
                <div className="pitem">
                    <span className="thead">Tên</span>
                </div>
                {
                    loading ?
                        (<div style={{ marginTop: '30px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><HashLoader color='#282cc0' /></div>) :
                        banks.length !== 0 ?
                            banks.map(bank => (

                                <NavLink key={bank.bankid} to={`/exrepo`} className="pitem titem" onClick={() => handleSelectBank(bank.bankid)}>
                                    <span className="td">{bank.bankname}</span>
                                </NavLink>))
                            :
                            (
                                <div style={{ marginTop: '30px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <GoInbox />
                                    <span>Không có dữ liệu</span>
                                </div>
                            )
                }

            </div>
        </>
    )
}