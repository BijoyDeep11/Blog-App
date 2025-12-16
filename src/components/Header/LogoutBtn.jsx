import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }
  return (
        <button
            className='relative font-medium text-sm tracking-wide text-gray-600 transition-colors duration-300 hover:text-black group'
            onClick={logoutHandler}
        >
            Logout
            {/* The Magic Underline Animation (Same as your Navbar links) */}
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
        </button>
    )
}

export default LogoutBtn