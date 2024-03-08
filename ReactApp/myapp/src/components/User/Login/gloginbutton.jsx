import React from 'react';
import { useRoutes } from 'react-router-dom';


const GoogleLoginButton = () => {
  const history = useRoutes();

  const handleGoogleLogin = async () => {
    try {
      const response = await fetch('/api/login/google');
      if (!response.ok) {
        throw new Error('Lỗi khi yêu cầu đăng nhập Google');
      }
      window.location.href = response.url; // Chuyển hướng đến trang đăng nhập Google
    } catch (error) {
      console.error('Lỗi khi đăng nhập bằng Google:', error);
    }
  };

  return (
    <button onClick={handleGoogleLogin} class="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                                    <div className="relative flex items-center space-x-4 justify-center">
                                        <img src="https://tailus.io/sources/blocks/social/preview/images/google.svg" class="absolute left-0 w-5" alt="google logo" />
                                        <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue with Google</span>
                                    </div>
                                </button>
  );
};

export default GoogleLoginButton;
