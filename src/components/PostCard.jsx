import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

// accepting both 'featuredImage' AND 'featured_image' props
function PostCard({$id, title, featuredImage, featured_image}) {
  
  // LOGIC: Use whichever one exists. 
  const imageId = featuredImage || featured_image; 

  // If no image ID is found at all, we shouldn't try to render anything
  if (!imageId) return null;

  return (
    <Link to={`/post/${$id}`} className="group block w-full h-full">
        <div className='w-full aspect-4/3 rounded-xl overflow-hidden mb-4 bg-gray-100 relative'>
            
            <img 
                src={appwriteService.getFileView(imageId)} 
                alt={title} 
                className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-105" 
            />
            
        </div>
        <div className="flex flex-col gap-2">
            <h2 className='font-serif text-xl md:text-2xl font-bold text-gray-900 leading-tight group-hover:text-gray-600 transition-colors duration-300 line-clamp-2'>
                {title}
            </h2>
            <div className="inline-flex items-center text-sm font-medium text-gray-400 group-hover:text-black transition-colors duration-300 mt-1">
                <span>Read Story</span>
                <svg className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </div>
        </div>
    </Link>
  )
}

export default PostCard