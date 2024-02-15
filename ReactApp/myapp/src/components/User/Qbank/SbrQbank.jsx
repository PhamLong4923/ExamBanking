import React from "react";
import '../Qbank/SbrQbank.css'
import { NavLink } from "react-router-dom";
export default function SbrQbank() {
    
    return(
        <>
            <div className="pathlink">
                <NavLink className="link" to='/qbank'>Ngân hàng câu hỏi</NavLink>
            </div>
            <div className="item-containers">
                <div className="item"><img src="/database.png" alt="" width={300} height={350}/><p className="item-title">Ngân hàng câu hỏi chung</p></div>
                <NavLink to='/pbank' className="item"><img src="/servers.png" alt="" width={250} height={350} /><p className="item-title">Ngân hàng câu hỏi cá nhân</p></NavLink>
            </div>
        </>
    )
}