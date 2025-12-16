import React from 'react'
import {Container, Logo, LogoutBtn} from '../index.js'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const naItems =[
         {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
    ] 
  return (
    <header className='sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md transition-all'>
      <Container>
        <nav className='flex items-center justify-between py-4'>
          {/* Logo Section */}
          <div className='flex items-center'>
            <Link to='/' className="flex items-center gap-2 group">
              {/* Added a subtle hover effect to the logo container */}
              <div className="group-hover:opacity-80 transition-opacity">
                <Logo width='70px' />
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <ul className='flex ml-auto items-center gap-6'>
            {naItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='relative font-medium text-sm tracking-wide text-gray-600 transition-colors duration-300 hover:text-black group'
                  >
                    {item.name}
                    {/* The Animated Underline - This is the "Modern" touch */}
                    <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </li>
              ) : null
            )}

            {/* Logout Button Wrapper - Ensuring it aligns perfectly */}
            {authStatus && (
              <li className='ml-4'>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>   
  )
}

export default Header