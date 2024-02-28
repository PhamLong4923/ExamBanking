import { React } from 'react';
import '../UI/UIStyle/Sidebar.css'
import { NavLink } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { PiBankBold } from "react-icons/pi";
import { RiFileEditFill } from "react-icons/ri";

export default function Sidebar({picker}) {    

    return (

        <>
            <div className='margin-sidebar'></div>
            <div className='sidebar'>
                <div className='picked' style={{ top: 15+picker*65+picker*2}}>

                </div>
                <NavLink to='/' title='Trang chủ'>
                    <div className='sidebar-item'>
                        <i><FaHome></FaHome></i>
                        
                        <span className='tooltip'>Trang chủ</span>
                    </div>
                </NavLink>

                <NavLink to='/qbank'>
                    <div className='sidebar-item'>
                        <i><PiBankBold></PiBankBold></i>
                        <span className='tooltip'>Ngân hàng câu hỏi</span>
                    </div>
                </NavLink>

                <NavLink to='/exam'>
                    <div className='sidebar-item-noround'>
                        <i><RiFileEditFill></RiFileEditFill></i>
                        <span className='tooltip'>Tạo đề kiểm tra</span>
                    </div>
                </NavLink>

            </div >
        </>
    );
}

