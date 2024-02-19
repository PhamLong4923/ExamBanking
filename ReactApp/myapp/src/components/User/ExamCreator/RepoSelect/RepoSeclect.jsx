import React from "react";
import { NavLink } from "react-router-dom";

export default function RepoSelect(){
    return (
        <>
            <div className="pathlink">
                <NavLink className="link" to='/exsystembank'>Tạo đề kiểm tra</NavLink>
                <i class="fa-solid fa-caret-right"></i>
                <NavLink className="link" to='/expersonalbank'>Ngân hàng câu hỏi cá nhân</NavLink>
            </div>

            <div className="pitem-containers">

                <div className="pitem">
                    <span className="thead">Tên</span>
                    
                    <span className="thead"></span>
                </div>
                <NavLink to={'/sec/1'} className="pitem titem">
                    <span className="td">Chương I</span>
                    
                    
                    <NavLink as="span" className="ta">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </NavLink>

                </NavLink>

                <NavLink to={'/sec/1'} className="pitem titem">
                    <span className="td">Chương II</span>
                    
                    
                    <NavLink as="span" className="ta">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </NavLink>

                </NavLink>

                <NavLink to={'/sec/1'} className="pitem titem">
                    <span className="td">Chương III</span>
                    
                    
                    <NavLink as="span" className="ta">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </NavLink>

                </NavLink>

                <NavLink to={'/sec/1'} className="pitem titem">
                    <span className="td">Chương IV</span>
                   
                    
                    <NavLink as="span" className="ta">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </NavLink>

                </NavLink>

            </div>

        </>
    )
}

