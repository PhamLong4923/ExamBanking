import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { getBank } from '../../../../services/Api';

export default function BankSelect(){

    const [banks, setBanks] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getBank(); 
                setBanks(response.data);
            } catch (error) {
                console.error('Error fetching banks:', error);

            }
        };

        fetchData();
    }, []); 

    return(
        <>
            <div className="pathlink">
                <NavLink className="link" to='/exsystembank'>Tạo đề kiểm tra</NavLink>
                <IoIosArrowForward></IoIosArrowForward>
                <NavLink className="link" to='/expersonalbank'>Ngân hàng câu hỏi cá nhân</NavLink>
            </div>

            <div className="pitem-containers">
                <div className="pitem">
                    <span className="thead">Tên</span>
                    <span className="thead">Ngày tạo</span>
                    <span className="thead">Tác giả</span>
                </div>
                {banks.map(bank => (
                    // <NavLink key={bank.id} to={`/repo/${bank.id}`} className="pitem titem">
                    <NavLink key={bank.bankid} to={`/exrepo`} className="pitem titem">
                        <span className="td">{bank.bankname}</span>
                        <span className="td">{bank.bankstatus}</span>
                        <span className="td">{bank.accid}</span>                       
                    </NavLink>
                ))}

                {/* <NavLink to='/repo' className="pitem">
                    <div className="bank-thumnail"></div> 
                    <div className="bank-info">
                        <p className="item-title">Toán CD</p>
                        <span className="status"></span>
                    </div>
                </NavLink> */}

            </div>
        </>
    )
}