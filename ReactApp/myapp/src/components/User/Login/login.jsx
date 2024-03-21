import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { setLocalStorageItem } from '../../../services/LocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../../redux/action.jsx';
import { useGoogle } from '../../../services/Api.jsx';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();

    const updateToken = (newToken) => {
        dispatch(setToken(newToken));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Gửi yêu cầu đăng nhập lên server
            const response = await axios.post('https://localhost:7064/api/login', {
                email,
                password
            });

            // Lưu token vào localStorage
            updateToken(response.data);

            // Đăng nhập thành công, chuyển hướng đến trang chính
            window.location.href = '/';
        } catch (error) {
            console.error('Đăng nhập thất bại:', error);
            // Xử lý lỗi đăng nhập, hiển thị thông báo cho người dùng
        }
    };

    const HandleGoogleLoginSuccess = async (credentialResponse) => {

        try {
            // Gửi JWT lên server để lưu vào cơ sở dữ liệu
            const response = await useGoogle({
                jwt: credentialResponse?.credential,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Lưu token vào localStorage
            console.log(response.data);
            dispatch(setToken(response.data));

            // Đăng nhập thành công, chuyển hướng đến trang chính
            // window.location.href = '/home';
        } catch (error) {
            console.error('Lỗi khi xử lý JWT:', error);
            // Xử lý lỗi đăng nhập, hiển thị thông báo cho người dùng
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-blue-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Đăng nhập</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Mật khẩu</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">Đăng nhập</button>
                </form>
                <div className="mt-6">
                    <p className="text-center text-gray-600">Hoặc đăng nhập bằng:</p>
                    <div className="mt-2">
                        <GoogleLogin
                            onSuccess={HandleGoogleLoginSuccess}
                            onError={() => console.log('Đăng nhập bằng Google thất bại')}
                            render={({ onClick }) => (
                                <button onClick={onClick} className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300">Google</button>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
