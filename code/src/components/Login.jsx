import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
// import sign from 'jwt-encode';
// import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
// import { connect } from 'react-redux'
const LoginPage = () => {
    const [pass, setPass] = useState('');
    const [username, setUsername] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // let secretKey = import.meta.env.VITE_APP_SECRET

        let body = {
            username: username,
            pass: sign(pass, secretKey)
        }
        axios.post(`${import.meta.env.VITE_APP_API}web/login`, body).then((data) => {
            console.log('res', data);
            window.localStorage.setItem("data", data?.data?.token);
            let auth = window.localStorage.getItem('data');
            // var decoded = jwtDecode(auth);
            // props?.setRole(decoded?.role);
            // props?.setUserId(decoded?.user_id);
            // props?.setAuth(data?.data?.token);
            // props?.loggMeIN(true);
            // console.log("Logged in", props?.loggedIn);
            toast.success('Logged in successfully!');
        })
            .catch((err) => {
                console.error(err);
                toast.error('Error occurred while logging in.');
            });
    }
    return (
        <div class="flex justify-center h-full">
            <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center items-center flex-1">
                <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">

                    <div class="mt-12 flex flex-col items-center">
                        <h1 class="text-2xl xl:text-3xl font-extrabold">
                            Log in
                        </h1>
                        <div class="w-full flex-1 mt-8">

                            <form class="mx-auto max-w-xs" onSubmit={handleLogin}>
                                <input
                                    class="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text" placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} />
                                <input
                                    class="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3"
                                    type="password" placeholder="Password" onChange={(e) => { setPass(e.target.value) }} />
                                <button type="submit"
                                    class="mt-3 tracking-wide font-semibold bg-blue-400 text-gray-100 w-full py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    Login
                                </button>
                                <div className='mt-3 text-xs text-gray-600 text-center'>
                                    <span className='px-1'>Don't have account yet?</span>
                                    <Link className='text-blue-400 font-bold' to={"/signup"}>Register</Link>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
                <div class="flex-1 text-center hidden lg:flex justify-center">
                    <div class="h-full">
                        <img class="w-auto bg-contain bg-center bg-no-repeat" src="https://png.pngtree.com/png-vector/20230122/ourmid/pngtree-comic-style-login-icon-with-padlock-splash-effect-vector-png-image_49383642.jpg" />
                    </div>
                </div>

            </div>
        </div>
    )
}
export default LoginPage;