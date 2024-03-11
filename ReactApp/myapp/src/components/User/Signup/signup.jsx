import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { getLocalStorageItem, setLocalStorageItem } from '../../../services/LocalStorage';


export const Signup = () => {

    const handleSuccess = (credentialResponse) => {
        console.log(credentialResponse);
        const credecode =  jwtDecode(credentialResponse.credential);
        console.log(credecode);
        const { email, picture } = credecode;
        setLocalStorageItem("isLoggedIn", true);
        setLocalStorageItem("uavata", picture);
        setLocalStorageItem("uemail", email);
        window.location.href = '/home';
        
    }

    useEffect(() => {
        if(getLocalStorageItem('isLoggedIn')){
            window.location.href = '/home';
        }
    });

    return (
        <div className="relative py-16 bg-gradient-to-br from-sky-50 to-gray-200">
            <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
                <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
                    <div className="rounded-xl bg-white shadow-xl">
                        <div className="p-6 sm:p-16">
                            <div className="space-y-4">
                                <img src="https://tailus.io/sources/blocks/social/preview/images/icon.svg" loading="lazy" className="w-10" alt="tailus logo" />
                                <h2 className="mb-8 text-2xl text-cyan-900 font-bold">Sign up to unlock the <br /> best of EB.</h2>
                            </div>
                            <div className="mt-16 grid space-y-4">

                                <button class="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                                    <div id='signIn' className="relative flex items-center space-x-4 justify-center">
                                        <img src="https://tailus.io/sources/blocks/social/preview/images/google.svg" class="absolute left-0 w-5" alt="google logo" />
                                        <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue with Google</span>
                                    </div>
                                </button>

                                <GoogleLogin
                                    onSuccess={credentialResponse => {
                                        handleSuccess(credentialResponse);
                                    }}
                                    
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                />


                            </div>

                            <div className="mt-44 space-y-4 text-gray-600 text-center sm:-mb-8">
                                {/* <p className="text-xs"> <a href="#" className="underline"></a>  <a href="#" className="underline"></a></p>
                                <p className="text-xs"> <a href="#" className="underline"></a><a href="#" className="underline"></a> </p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}