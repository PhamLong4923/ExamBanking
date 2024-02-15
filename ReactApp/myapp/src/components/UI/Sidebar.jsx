import { React } from 'react';
import '../UI/UIStyle/Sidebar.css'
import { NavLink } from 'react-router-dom';


export default function Sidebar({picker}) {    

    return (

        <>
            <div className='margin-sidebar'></div>
            <div className='sidebar'>
                <div className='picked' style={{ top: 15+picker*65+picker*2}}>

                </div>
                <NavLink to='/' title='Trang chủ'>
                    <div className='sidebar-item'>
                        <i className="fa-solid fa-house fa-xl"></i>
                        <span className='tooltip'>Trang chủ</span>
                    </div>
                </NavLink>

                <NavLink to='/qbank'>
                    <div className='sidebar-item sidebar-item2'>
                        <i className="fa-solid fa-building-columns fa-xl"></i>
                        <span className='tooltip'>Ngân hàng câu hỏi</span>
                    </div>
                </NavLink>

                <NavLink to='/home'>
                    <div className='sidebar-item-noround'>
                        <i className="fa-solid fa-file-pen fa-2xl"></i>
                        <span className='tooltip'>Tạo đề kiểm tra</span>
                    </div>
                </NavLink>

            </div >
        </>
    );
}

