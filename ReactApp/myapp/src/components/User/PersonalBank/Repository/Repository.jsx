import React from "react";
import '../Repository/Repository.css'
import { NavLink } from "react-router-dom";
export default function Repository() {

    return (

        <>
            <div className="pathlink">
                <NavLink className="link" to='/qbank'>Ngân hàng câu hỏi</NavLink>
                <i class="fa-solid fa-caret-right"></i>
                <NavLink className="link" to='/pbank'>Ngân hàng câu hỏi cá nhân</NavLink>
                <i class="fa-solid fa-caret-right"></i>
                <NavLink className="link" to='/repo'>ToanCD</NavLink>
            </div>
            <div className="pitem-containers">

                <div className="pitem">
                    <span className="thead">Tên</span>
                    <span className="thead">Ngày tạo</span>
                    <span className="thead">Tác giả</span>
                </div>
                <NavLink to={'/sec/1'} className="pitem titem">
                    <span className="td">Chương I</span>
                    <span className="td">23:00 2/1/2024</span>
                    <span className="td">Phạm Thanh Hương</span>
                    <NavLink as="span" className="ta">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </NavLink>

                </NavLink>

                <NavLink to={'/sec/1'} className="pitem titem">
                    <span className="td">Chương II</span>
                    <span className="td">23:00 2/1/2024</span>
                    <span className="td">Phạm Thanh Hương</span>
                    <NavLink as="span" className="ta">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </NavLink>

                </NavLink>

                <NavLink to={'/sec/1'} className="pitem titem">
                    <span className="td">Chương III</span>
                    <span className="td">23:00 2/1/2024</span>
                    <span className="td">Phạm Thanh Hương</span>
                    <NavLink as="span" className="ta">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </NavLink>

                </NavLink>

                <NavLink to={'/sec/1'} className="pitem titem">
                    <span className="td">Chương IV</span>
                    <span className="td">23:00 2/1/2024</span>
                    <span className="td">Phạm Thanh Hương</span>
                    <NavLink as="span" className="ta">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </NavLink>

                </NavLink>

            </div>
        </>
    )
}