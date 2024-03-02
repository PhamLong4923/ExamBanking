import React from "react";
import { NavLink } from "react-router-dom";
import '../RepoSelect/RepoSeclect.css'
import { IoIosArrowForward } from "react-icons/io";
import { CgPlayTrackNextO } from "react-icons/cg";
import { FaXmark } from "react-icons/fa6";

export default function RepoSelect() {
    return (
        <>
            <div className="pathlink">
                <NavLink className="link" to='/exsystembank'>Tạo đề kiểm tra</NavLink>
                <IoIosArrowForward></IoIosArrowForward>
                <NavLink className="link" to='/expersonalbank'>Ngân hàng câu hỏi cá nhân</NavLink>
                <IoIosArrowForward></IoIosArrowForward>
                <NavLink className="link" to='/'>Toán 8</NavLink>
            </div>

            <div className="pitem-containers">



                <div className="reposelect">
                    <div className="reposelect-tool">
                        <div className='question-tool repo-tool'>
                                <span className='tool-item' ><FaXmark></FaXmark></span>
                                <span className='selectedq'>0 được chọn</span>
                                <span className="fake-space"></span>
                                <NavLink to={'/exconfig'} className="next"><p>Tiếp tục với lựa chọn</p><CgPlayTrackNextO /></NavLink>
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

