import React, { useState } from 'react';
import { Avatar, Button } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setBankId, setBankType, setRepoId } from '../../redux-setup/action';
import { jwtDecode } from 'jwt-decode'

const Account = () => {
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();

    const tokenExpired = (token) => {
        //const decode = jwtDecode(token);
        return false; // Return true if token is expired, false otherwise
    };

    const [login, setLogin] = useState(token && !tokenExpired(token));

    const handleLogout = () => {
        dispatch(setToken(null));
        dispatch(setBankId(null));
        dispatch(setBankType(null));
        dispatch(setRepoId(null));
        window.location.href = "/login";
    }

    return (
        <div style={{ position: 'absolute', bottom: '24px', left: 0, right: 0, textAlign: 'center', color: '#fff' }}>
            {!login && <Button type="primary" href='/login'>Login or Register</Button>}
            {
                login &&
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '98%' }}>
                    <Avatar size={64} icon={<UserOutlined />} />
                    <div style={{ width: '55%', display: 'flex', flexDirection: 'column', flex: 'left' }}>
                        <Button type="text" icon={<SettingOutlined />} style={{ color: '#fff' }}>Settings</Button>
                        <Button type="text" icon={<LogoutOutlined />} style={{ color: '#fff' }} onClick={() => handleLogout()}>Logout</Button>
                    </div>
                </div>
            }
        </div>
    );
};

export default Account;
