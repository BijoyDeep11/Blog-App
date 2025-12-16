import React, { useState, useEffect } from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from '../components'

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Fixed: API call moved INSIDE useEffect to prevent infinite loops
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
            setLoading(false)
        })
    }, [])

    if (loading) {
        return (
            <div className="w-full h-[50vh] flex items-center justify-center">
                 {/* Simple Loading Spinner */}
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        )
    }

    return (
        <div className='w-full py-16 bg-white min-h-screen'>
            <Container>
                {/* 1. THE ARCHIVE HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-200 pb-8">
                    <div className="max-w-xl">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                            The Collection
                        </h1>
                        <p className="text-gray-500 text-lg font-sans leading-relaxed">
                            Browse all our thoughts, ideas, and stories in one place.
                        </p>
                    </div>
                    
                    {/* Post Counter - Adds a nice detail */}
                    <div className="mt-6 md:mt-0">
                        <span className="inline-block bg-gray-100 rounded-full px-4 py-1 text-sm font-medium text-gray-600">
                            {posts.length} {posts.length === 1 ? 'Story' : 'Stories'}
                        </span>
                    </div>
                </div>

                {/* 2. THE GRID LAYOUT */}
                {/* We replaced 'flex-wrap' with CSS Grid for perfect alignment */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                    {posts.map((post) => (
                        <div key={post.$id} className='h-full'>
                            {/* using {...post} to pass props correctly to your component */}
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>

                {/* Empty State (if no posts exist) */}
                {posts.length === 0 && (
                    <div className="text-center py-20">
                        <h3 className="text-xl text-gray-400 font-serif italic">
                            No stories found in the archive yet.
                        </h3>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default AllPosts