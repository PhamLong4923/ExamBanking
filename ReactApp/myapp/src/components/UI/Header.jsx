import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../UI/UIStyle/Header.css';
import axios from 'axios';


const Header = React.memo(() => {

    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        // Kiểm tra nếu có thông tin đăng nhập trong local storage
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        return storedLoginStatus ? JSON.parse(storedLoginStatus) : false;
    });

    const handleAccountClick = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    // Hàm này được gọi khi người dùng đăng nhập
    // const handleLogin = () => {
    //     const loginResponse = {
    //         username: 'example_user',
    //         avatar: 'link_to_avatar_image'
    //     };

    //     localStorage.setItem('isLoggedIn', JSON.stringify(true));

    //     localStorage.setItem('userData', JSON.stringify(loginResponse));
    //     // Cập nhật trạng thái đăng nhập
    //     setIsLoggedIn(true);
    // };

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                'https://localhost:7064/api/Login/login',
                {
                    username: 'Testlogin',
                    userpass: '123',
                },
                
            );
    
            if (response.status === 200) {
                // Đăng nhập thành công, xử lý token hoặc thông tin khác nếu cần
                const token = response.data;
                console.log('Token:', token);
            } else {
                // Đăng nhập thất bại, xử lý lỗi
                console.error('Login failed:', response.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Hàm này được gọi khi người dùng đăng xuất
    const handleLogout = () => {
        setDropdownVisible(!isDropdownVisible);
        // Thực hiện các bước đăng xuất, ví dụ: xóa thông tin đăng nhập từ localStorage
        // ...
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');

        // Cập nhật trạng thái đăng nhập
        setIsLoggedIn(false);
    };

    useEffect(() => {
        const closeDropdownOnOutsideClick = (event) => {
            const accountElement = document.getElementById('account');
            const dropdownElement = document.getElementById('account-dropdown');

            if (accountElement && dropdownElement) {
                if (!accountElement.contains(event.target) && !dropdownElement.contains(event.target)) {
                    setDropdownVisible(false);
                }
            }
        };

        document.addEventListener('click', closeDropdownOnOutsideClick);

        return () => {
            document.removeEventListener('click', closeDropdownOnOutsideClick);
        };
    }, []);

    useEffect(() => {
        // useEffect để theo dõi thay đổi trạng thái và lưu vào localStorage
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    return (

        <>
            <div className='margin-header'></div>
            <div className='header'>

                <div className='header-logo'>
                    <img className='head-logo' src="/EBLogo.png" alt="logo" />
                    <div className='head-name'>
                        <h2>EXAM BANKING</h2>

                    </div>
                </div>
                {isLoggedIn ? (
                    <div className='account' id='account' onClick={handleAccountClick}>
                        <img className='avata' src="/defaultavata.png" alt="avata" />

                    </div>
                ) : (
                    <div className='account' onClick={handleLogin}>
                        <h5>Đăng kí tài khoản</h5>

                    </div>
                )}


            </div>

            <span className={`account-dropdown ${isDropdownVisible ? 'active' : ''}`} id='account-dropdown'>

                <NavLink to='/profile' className='menu-item menu-account'>
                    <img className='avata' src="/defaultavata.png" alt="avata" />
                    <div className='account-name'>
                        <span className='menu-choice'>Tên tài khoản</span>
                        <span className='account-email'>example@gmail.com</span>
                    </div>
                </NavLink>


                <div className='menu-item menu-setting'>
                    <i className="fa-solid fa-gear fa-xl"></i>
                    <span className='menu-choice'>Quản lí tài khoản</span>
                </div>

                <div className='menu-item menu-logout' onClick={handleLogout}>
                    <i className="fa-solid fa-arrow-right-from-bracket fa-xl"></i>
                    <span className='menu-choice'>Đăng xuất</span>
                </div>

            </span>
        </>
    );
});

export default Header