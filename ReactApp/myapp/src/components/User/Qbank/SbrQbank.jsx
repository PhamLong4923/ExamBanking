import React from "react";
import '../Qbank/SbrQbank.css'
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBankType } from "../../../redux/action";

export default function SbrQbank() {
    const dispatch = useDispatch();

    const handleSelectBank = (bankType) => {

        dispatch(setBankType(bankType));
    };

    return (
        <>
            <div className="pathlink">
                <NavLink className="link" to='/qbank'>Ngân hàng câu hỏi</NavLink>
            </div>
            <div className="item-containers">
                <NavLink to='/pbank' onClick={() => handleSelectBank('0')} className="item"><img src="/database.png" alt="" width={300} height={350} /><p className="item-title">Ngân hàng câu hỏi chung</p></NavLink>
                <NavLink to='/pbank' onClick={() => handleSelectBank('1')} className="item"><img src="/servers.png" alt="" width={250} height={350} /><p className="item-title">Ngân hàng câu hỏi cá nhân</p></NavLink>
            </div>
        </>
    )
}