import axios from 'axios';
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../../redux/action';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            //dispatch(setToken(redentialResponse.credential))
            // Redirect to the desired page after successful login
            // window.location.href = '/';
        } catch (error) {
            console.error('Error processing Google login:', error);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            console.error('Passwords do not match');
            return;
        }

        try {
            // Send signup request to server
            const response = await axios.post('YOUR_SIGNUP_API_ENDPOINT', {
                email,
                password
            });

            // Process signup response as needed
            console.log('Signup successful:', response.data);

            // Optionally, you can automatically log the user in after signup
            // and redirect them to the desired page
        } catch (error) {
            console.error('Error signing up:', error);
            // Handle signup error
        }
    };

    return (
        <div className="relative pt-16 pb-64 bg-blue-100">
            <div className="relative container mx-auto px-4">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6 sm:p-8">
                        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign up</h2>
                        <form onSubmit={handleSignup}>
                            <div className="mb-4">
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-gray-200 focus:outline-none focus:border-blue-500" required />
                            </div>
                            <div className="mb-4">
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-gray-200 focus:outline-none focus:border-blue-500" required />
                            </div>
                            <div className="mb-6">
                                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-gray-200 focus:outline-none focus:border-blue-500" required />
                            </div>
                            <button type="submit" className="w-full px-4 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-300">Sign up</button>
                        </form>
                        <div className="mt-6 text-center">
                            <p className="text-gray-600">Already have an account? <a href="#" className="text-blue-500 hover:underline">Sign in</a></p>
                        </div>
                        <div className="mt-6">
                            <GoogleLogin
                                clientId="YOUR_GOOGLE_CLIENT_ID"
                                onSuccess={handleGoogleLoginSuccess}
                                onFailure={(err) => console.error('Google login error:', err)}
                                render={(renderProps) => (
                                    <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="w-full px-4 py-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition duration-300">
                                        Sign in with Google
                                    </button>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
