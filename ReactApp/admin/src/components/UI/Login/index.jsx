// src/components/LoginAndRegister.js
import { GoogleOutlined, UserOutlined } from '@ant-design/icons';
import { GoogleLogin } from '@react-oauth/google';
import { Avatar, Button, Checkbox, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../redux-setup/action';
import { Google } from '../../../services/Api';

const LoginAndRegister = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [showLogin, setShowLogin] = useState(true);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const toggleForm = () => {
        setShowLogin(!showLogin);
    };

    const responseGoogle = async (credentialResponse) => {
        try {
            const response = await Google({
                jwt: credentialResponse?.credential,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(response.data);
            dispatch(setToken(response.data));

            // window.location.href = '/';
        } catch (error) {
            console.error('Lỗi khi xử lý JWT:', error);
        }
    };

    return (
        <>
            <Avatar onClick={toggleModal} icon={<UserOutlined />} style={{ backgroundColor: 'grey', marginLeft: '6%', cursor: 'pointer', position: 'absolute', bottom: '3%' }}></Avatar>
            <Modal
                title={showLogin ? 'Đăng nhập' : 'Đăng ký'}
                visible={showModal}
                onCancel={toggleModal}
                footer={null}
            >
                {showLogin ? (
                    <>
                        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                            <h2>Đăng nhập</h2>
                        </div>
                        <Input placeholder="Email" style={{ marginBottom: '10px' }} />
                        <Input.Password placeholder="Mật khẩu" style={{ marginBottom: '10px' }} />
                        <Checkbox style={{ marginBottom: '10px', color: '#f0f0f0' }}>Ghi nhớ đăng nhập</Checkbox>
                        <Button type="primary" style={{ width: '100%', marginBottom: '10px' }}>Login</Button>
                        <p style={{ textAlign: 'center', marginBottom: '10px' }}>hoặc</p>
                        <GoogleLogin
                            buttonText="Đăng nhập bằng Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            render={(renderProps) => (
                                <Button type="default" icon={<GoogleOutlined />} style={{ width: '100%', marginBottom: '10px' }}>Đăng nhập bằng Google</Button>
                            )}
                        />

                        <p style={{ textAlign: 'center' }}>Bạn chưa có tài khoản? <Button type="link" onClick={toggleForm} style={{ color: '#f0f0f0' }}>Đăng kí ngay</Button></p>
                    </>
                ) : (
                    <>
                        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                            <h2>Đăng kí</h2>
                        </div>
                        <Input placeholder="Email" style={{ marginBottom: '10px' }} />
                        <Input.Password placeholder="Mật khẩu" style={{ marginBottom: '10px' }} />
                        <Input.Password placeholder="Xác nhận mật khẩu" style={{ marginBottom: '10px' }} />
                        <Button type="primary" style={{ width: '100%', marginBottom: '10px' }}>Đăng kí</Button>
                        <p style={{ textAlign: 'center', marginBottom: '10px' }}>hoặc</p>
                        <Button type="default" icon={<GoogleOutlined />} style={{ width: '100%', marginBottom: '10px' }}>Đăng kí bằng Google</Button>
                        <p style={{ textAlign: 'center' }}>Đã có tài khoản? <Button type="link" onClick={toggleForm} style={{ color: '#f0f0f0' }}>Đăng nhập ngay</Button></p>
                    </>
                )}
            </Modal>
        </>
    );
};

export default LoginAndRegister;
