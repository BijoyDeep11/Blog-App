import React, { useId } from 'react'

function Select({
    options = [], // ✅ Fix 1: Default to empty array to prevent map error
    label,
    className = "",
    ...props
}, ref) { // ✅ Fix 2: 'ref' is the second argument, and props are destructured in the first

    const id = useId() // Optional: Generates a unique ID for accessibility

  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className='block mb-2 text-sm font-medium text-gray-900'>{label}</label>}
        
        <select
        {...props}
        id={id}
        ref={ref} // ✅ Fix 3: Connect the ref so react-hook-form works!
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
            {/* ✅ Fix 4: Safely map over options */}
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}

        </select>
    </div>
  )
}

export default React.forwardRef(Select)