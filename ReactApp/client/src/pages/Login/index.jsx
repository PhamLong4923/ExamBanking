// src/components/LoginAndRegister.js
import React, { useState } from 'react';
import { Row, Col, Input, Button, Checkbox } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { Google } from '../../services/api';
import { setToken } from '../../redux-setup/action';

const LoginAndRegister = () => {
    const dispatch = useDispatch();
    const [showLogin, setShowLogin] = useState(true);

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

            window.location.href = '/';
        } catch (error) {
            console.error('Lỗi khi xử lý JWT:', error);
        }
    };

    return (
        <div style={{ backgroundColor: '#303030', color: '#f0f0f0', height: '100%', width: '40%', margin: 'auto', padding: 'auto' }}>
            <Row justify="center">
                <Col span={12}>
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
                            <GoogleLogin
                                buttonText="Đăng nhập bằng Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}

                                render={(renderProps) => (

                                    <Button type="default" icon={<GoogleOutlined />} style={{ width: '100%', marginBottom: '10px' }}>Đăng nhập bằng Google</Button>
                                )}
                            />
                            <p style={{ textAlign: 'center' }}>Đã có tài khoản? <Button type="link" onClick={toggleForm} style={{ color: '#f0f0f0' }}>Đăng nhập ngay</Button></p>
                        </>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default LoginAndRegister;
