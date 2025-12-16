import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as storeLogin } from '../store/authSlice'
import { Button, Input, Logo } from "./index"
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(storeLogin(userData));
                navigate("/")
            }
        } catch (error) {
            // Fixed: Captured the error object correctly
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center w-full min-h-screen bg-gray-50'>
            {/* Masterclass Change: 
               Instead of a heavy shadow-md, we use a border-gray-200. 
               This looks cleaner and more "Apple-esque" or "Editorial".
            */}
            <div className='w-full max-w-lg bg-white rounded-xl border border-gray-200 p-10 mx-4'>
                
                {/* Header Section */}
                <div className="mb-8 flex flex-col items-center text-center">
                    <div className="mb-6 opacity-90 hover:opacity-100 transition-opacity">
                        <Logo width="80px" />
                    </div>
                    {/* Serif Font for the Greeting - The "Classic" Touch */}
                    <h2 className="text-3xl font-serif font-medium text-gray-900 mb-2">
                        Welcome back
                    </h2>
                    <p className="text-sm text-gray-500 font-sans">
                        Sign in to continue your journey.
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-3 rounded bg-red-50 border border-red-100 text-center">
                        <p className="text-sm text-red-600 font-medium">{error}</p>
                    </div>
                )}

                {/* The Form */}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-6'>
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            // Passing a className to the Input component if it accepts it for consistency
                            className="bg-gray-50 border border-gray-200 focus:border-black focus:ring-black"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        
                        <div className="relative">
                            <Input
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                className="bg-gray-50 border border-gray-200 focus:border-black focus:ring-black"
                                {...register("password", {
                                    required: true,
                                })}
                            />
                             {/* Optional: 'Forgot Password' could go here in future */}
                        </div>

                        {/* Button Styling: 
                           Assuming your Button component accepts className. 
                           We want a solid, dark button for high contrast.
                        */}
                        <Button
                            type="submit"
                            className="w-full py-3 bg-black text-white hover:bg-gray-800 transition-colors duration-300 rounded-lg font-medium tracking-wide"
                        >
                            Sign In
                        </Button>
                    </div>
                </form>

                {/* Footer / Switch to Signup */}
                <p className="mt-8 text-center text-sm text-gray-500 font-sans">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-semibold text-black transition-all duration-200 border-b border-transparent hover:border-black"
                    >
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login