import React, { useId } from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && (
                <label 
                    className='block text-sm font-medium text-gray-700 mb-2 pl-1' 
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`
                    w-full 
                    px-4 
                    py-3 
                    rounded-lg 
                    bg-gray-50 
                    text-gray-900 
                    placeholder:text-gray-400
                    border 
                    border-gray-200 
                    outline-none 
                    transition-all 
                    duration-200
                    focus:bg-white 
                    focus:border-black 
                    focus:ring-1 
                    focus:ring-black
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    ${className}
                `}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input