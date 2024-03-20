import React from "react";
import "./BankTypeSelect.css";
import { NavLink } from "react-router-dom";
import { setLocalStorageItem } from "../../../../services/LocalStorage";

export default function BankTypeSelect() {
    const handleSelectBank = (bankType) => {
        setLocalStorageItem("bankType", bankType);
    };
    return (
        <>
            <div className="pathlink">
                <NavLink className="link" to='/qbank'>Tạo đề kiểm tra</NavLink>
            </div>
            <div className="item-containers">
                <NavLink to='/exbank' className="item" onClick={() => handleSelectBank('0')}><img src="/database.png" alt="" width={300} height={350} /><p className="item-title">Ngân hàng câu hỏi chung</p></NavLink>
                <NavLink to='/exbank' className="item" onClick={() => handleSelectBank('1')}><img src="/servers.png" alt="" width={250} height={350} /><p className="item-title">Ngân hàng câu hỏi cá nhân</p></NavLink>
            </div>
        </>
    )
}

