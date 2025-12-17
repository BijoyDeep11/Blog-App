import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from '../components'
import { Link } from 'react-router-dom'
function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full min-h-[60vh] flex items-center bg-gray-50/50">
                <Container>
                    <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
                        {/* Decorative Icon or Element */}
                        <div className="mb-6 opacity-80">
                            <span className="text-4xl">✒️</span>
                        </div>
                        
                        {/* Classic Serif Headline */}
                        <h1 className="font-serif text-5xl md:text-6xl text-gray-900 mb-6 leading-tight tracking-tight">
                            Publish your passions, <br />
                            <span className="italic text-gray-600">your way.</span>
                        </h1>

                        {/* Modern Sans Subtitle */}
                        <p className="font-sans text-lg text-gray-500 mb-8 max-w-lg leading-relaxed">
                            Create a unique and beautiful blog. It’s easy and free.{" "}
                            <Link 
                                to="/login"
                                className="font-bold text-gray-900 underline decoration-2 underline-offset-4 hover:text-black hover:decoration-black transition-all"
                            >
                                Login
                            </Link>
                            {" "}to start reading the latest stories.
                        </p>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="w-full py-16 bg-white">
            <Container>
                {/* Section Header */}
                <div className="mb-12 border-b border-gray-200 pb-4">
                   <h2 className="font-serif text-3xl text-gray-900">Latest Writings</h2>
                </div>

                {/* The Grid: Switched from Flex w-1/4 to CSS Grid for better responsiveness */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                    {posts.map((post) => (
                        <div key={post.$id} className='h-full'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home