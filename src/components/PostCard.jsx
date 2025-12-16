import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
 <Link to={`/post/${$id}`} className="group block w-full h-full">
        {/* Image Container - Aspect Ratio locked & Zoom Effect */}
        <div className='w-full aspect-4/3 rounded-xl overflow-hidden mb-4 bg-gray-100 relative'>
            <img 
                src={appwriteService.getFilePreview(featuredImage)} 
                alt={title} 
                className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-105" 
            />
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-2">
            {/* Title: Serif font for elegance */}
            <h2 className='font-serif text-xl md:text-2xl font-bold text-gray-900 leading-tight group-hover:text-gray-600 transition-colors duration-300 line-clamp-2'>
                {title}
            </h2>

            {/* "Read More" Indicator - Adds a professional touch */}
            <div className="inline-flex items-center text-sm font-medium text-gray-400 group-hover:text-black transition-colors duration-300 mt-1">
                <span>Read Story</span>
                <svg 
                    className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </div>
        </div>
    </Link>
}

export default PostCard