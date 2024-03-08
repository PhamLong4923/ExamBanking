import React, { useState } from "react";
import '../Qbank/SbrQbank.css'
import { NavLink } from "react-router-dom";
import { setLocalStorageItem } from "../../../services/LocalStorage";

export default function SbrQbank() {



    const handleSelectBank = (bankType) => {
        setLocalStorageItem("bankType", bankType);
    };
    
    return(
        <>
            <div className="pathlink">
                <NavLink className="link" to='/qbank'>Ngân hàng câu hỏi</NavLink>
            </div>
            <div className="item-containers">
                <NavLink to='/pbank' onClick={() => handleSelectBank('0')} className="item"><img src="/database.png" alt="" width={300} height={350}/><p className="item-title">Ngân hàng câu hỏi chung</p></NavLink>
                <NavLink to='/pbank' onClick={() => handleSelectBank('1')} className="item"><img src="/servers.png" alt="" width={250} height={350} /><p className="item-title">Ngân hàng câu hỏi cá nhân</p></NavLink>
            </div>
        </>
    )
}