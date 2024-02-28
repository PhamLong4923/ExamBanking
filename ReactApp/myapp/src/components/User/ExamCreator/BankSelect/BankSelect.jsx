import React from "react";
import { NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";


export default function BankSelect(){
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
                <NavLink to={'/exrepo'} className="pitem titem">
                    <span className="td">Toán cánh diều</span>
                    <span className="td">23:00 2/1/2024</span>
                    <span className="td">Phạm Thanh Hương</span>
                    <NavLink as="span" className="ta">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </NavLink>

                </NavLink>

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