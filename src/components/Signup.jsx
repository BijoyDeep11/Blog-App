import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const currentUser = await authService.getCurrentUser()
                if (currentUser) dispatch(login(currentUser));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-gray-50">
            {/* The Masterclass Card: White, Subtle Border, Spacious */}
            <div className="w-full max-w-lg bg-white rounded-xl border border-gray-200 p-10 mx-4">
                
                {/* Header Section */}
                <div className="mb-8 flex flex-col items-center text-center">
                    <div className="mb-6 opacity-90 hover:opacity-100 transition-opacity">
                         <span className="inline-block w-full max-w-20px">
                            <Logo width="100%" />
                         </span>
                    </div>
                    {/* Serif Font for the Greeting */}
                    <h2 className="text-3xl font-serif font-medium text-gray-900 mb-2">
                        Join the community
                    </h2>
                    <p className="text-sm text-gray-500 font-sans">
                        Create an account to start publishing your stories.
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-3 rounded bg-red-50 border border-red-100 text-center">
                        <p className="text-sm text-red-600 font-medium">{error}</p>
                    </div>
                )}

                {/* The Form */}
                <form onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className='space-y-5'>
                        
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            className="bg-gray-50 border border-gray-200 focus:border-black focus:ring-black"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            className="bg-gray-50 border border-gray-200 focus:border-black focus:ring-black"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Create a password"
                            className="bg-gray-50 border border-gray-200 focus:border-black focus:ring-black"
                            {...register("password", {
                                required: true,
                            })}
                        />

                        {/* High Contrast Button */}
                        <Button 
                            type="submit" 
                            className="w-full py-3 bg-black text-white hover:bg-gray-800 transition-colors duration-300 rounded-lg font-medium tracking-wide mt-4"
                        >
                            Create Account
                        </Button>
                    </div>
                </form>

                {/* Footer Link */}
                <p className="mt-8 text-center text-sm text-gray-500 font-sans">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-semibold text-black transition-all duration-200 border-b border-transparent hover:border-black"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Signup