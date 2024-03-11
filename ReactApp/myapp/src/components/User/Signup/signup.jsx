import React, { useState } from 'react';

export const Signup = () => {

    const [token, setToken] = useState('');

    const handleGoogleLogin = async () => {
        // Gọi API đăng nhập Google và nhận token
        const response = await fetch('api/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Token: token }),
        });

        // Xử lý kết quả từ API (ví dụ: lưu token vào localStorage)
        const result = await response.json();
        localStorage.setItem('accessToken', result.Token);
    };

    return (
        <div>
            <input type="text" value={token} onChange={(e) => setToken(e.target.value)} />
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    );

}