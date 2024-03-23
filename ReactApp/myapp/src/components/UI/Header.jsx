import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../UI/UIStyle/Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../redux/action';
import { setBankType } from '../../redux/action';
import { setBankId } from '../../redux/action';
import { setRepoId } from '../../redux/action';


const Header = (() => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [avatar, setAvatar] = useState();
    const [email, setEmail] = useState();
    const token = useSelector(state => state.token);
    const isLoggedIn = !!token;
    const dispatch = useDispatch();

    const handleAccountClick = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleLogout = () => {
        setDropdownVisible(!isDropdownVisible);
        dispatch(setToken(null));
        dispatch(setBankId(null));
        dispatch(setBankType(null));
        dispatch(setRepoId(null));
        window.location.href = "/login";
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
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);



    // Sử dụng useEffect để theo dõi thay đổi avatar và email
    useEffect(() => {
        // if (isLoggedIn) {
        //     const decode = jwtDecode(token);

        //     setAvatar(decode.picture)
        //     setEmail(decode.email);
        // }

    }, []);

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
                        <img className='avataheader' src={avatar} alt="avatar" />
                    </div>
                ) : (
                    <div className='account'>
                        <NavLink to={'/signup'}><h5>Đăng kí </h5></NavLink>
                        <p>/</p>
                        <NavLink to={'/login'}><h5> Đăng nhập</h5></NavLink>
                    </div>
                )}
            </div>
            <span className={`account-dropdown ${isDropdownVisible ? 'active' : ''}`} id='account-dropdown'>
                <NavLink to='/profile' className='menu-item menu-account'>
                    <img className='avataheader popup' src={avatar || "/defaultavata.png"} alt="avatar" />
                    <div className='account-name'>

                        <span className='account-email'>{email}</span>
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

export default Header;
