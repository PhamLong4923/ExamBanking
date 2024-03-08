import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

const GoogleCallbackPage = () => {
  const history = useRoutes();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const response = await fetch('https://localhost:7064/api/login/signin-google');
        if (!response.ok) {
          throw new Error('Lỗi khi xử lý callback từ Google');
        }
        const data = await response.json();
        // Lưu token vào local storage hoặc cookie
        localStorage.setItem('token', data.token);
        // Chuyển hướng đến trang chính của ứng dụng
        history.push('/');
      } catch (error) {
        console.error('Lỗi khi xử lý callback từ Google:', error);
      }
    };
    handleGoogleCallback();
  }, []);

  return (
    <div>
      <p>Xử lý đăng nhập Google...</p>
    </div>
  );
};

export default GoogleCallbackPage;
