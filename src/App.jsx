import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-white">
         <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    // min-h-screen: Ensures it's at least as tall as the screen
    // w-full: Fits width perfectly
    <div className='min-h-screen w-full flex flex-col bg-white'>
      
      {/* STICKY HEADER: This stays pinned to the top! */}
      <div className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100'>
        <Header />
      </div>

      {/* CONTENT: Scrolls naturally under the header */}
      <main className='grow w-full'>
         <Outlet />
      </main>

      {/* FOOTER: Sits at the bottom */}
      <Footer />
      
    </div>
  )
}

export default App