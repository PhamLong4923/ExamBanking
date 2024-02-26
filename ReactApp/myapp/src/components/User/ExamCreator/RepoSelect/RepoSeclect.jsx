import React from "react";
import { NavLink } from "react-router-dom";
import '../RepoSelect/RepoSeclect.css'

export default function RepoSelect() {
    return (
        <>
            <div className="pathlink">
                <NavLink className="link" to='/exsystembank'>Tạo đề kiểm tra</NavLink>
                <i class="fa-solid fa-caret-right"></i>
                <NavLink className="link" to='/expersonalbank'>Ngân hàng câu hỏi cá nhân</NavLink>
                <i class="fa-solid fa-caret-right"></i>
                <NavLink className="link" to='/'>Toán 8</NavLink>
            </div>

            <div className="pitem-containers">



                <div className="reposelect">
                    <div className="reposelect-tool">
                        <div className='question-tool repo-tool'>
                                <span className='tool-item' ><i className="fa-solid fa-xmark"></i></span>
                                <span className='selectedq'>0 được chọn</span>
                                <span className="fake-space"></span>
                                <span className="next"><p>Tiếp tục với lựa chọn</p><i class="fa-regular fa-circle-right"></i></span>
                        </div>

                        <div className="repolist">
                            <div className="pitem">
                                <span className="thead">Tên</span>

                                <span className="thead"></span>
                            </div>
                            <NavLink to={'/sec/1'} className="pitem titem">
                                <span className="td">Chương I</span>
                            </NavLink>

                            <NavLink to={'/sec/1'} className="pitem titem">
                                <span className="td">Chương II</span>
                            </NavLink>

                            <NavLink to={'/sec/1'} className="pitem titem">
                                <span className="td">Chương III</span>
                            </NavLink>

                            <NavLink to={'/sec/1'} className="pitem titem">
                                <span className="td">Chương IV</span>
                            </NavLink>
                        </div>

                    </div>
                    {/* <div className="next">
                        <button className="next-button">Tiếp tục</button>
                    </div> */}
                </div>


            </div>

        </>
    )
}

