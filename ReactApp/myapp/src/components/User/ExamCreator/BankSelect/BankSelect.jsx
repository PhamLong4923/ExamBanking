import React from "react";
import "../BankSelect/BankSelect.css";
import { NavLink } from "react-router-dom";

export default function BankSelect() {
    return (
        <>
            <div className="pathlink">
                <NavLink className="link" to='/qbank'>Tạo đề kiểm tra</NavLink>
            </div>
            <div className="item-containers">
                <NavLink to='/exsystembank' className="item"><img src="/database.png" alt="" width={300} height={350} /><p className="item-title">Ngân hàng câu hỏi chung</p></NavLink>
                <NavLink to='/expersonalbank' className="item"><img src="/servers.png" alt="" width={250} height={350} /><p className="item-title">Ngân hàng câu hỏi cá nhân</p></NavLink>
            </div>
        </>
    )
}

