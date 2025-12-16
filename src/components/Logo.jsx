import React from 'react'

function Logo({ width = '100px', className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`} style={{ width }}>
      
      {/* ICON: The Fountain Pen Nib (Unchanged, fits "Scribe" perfectly) */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 shrink-0 text-gray-900"
      >
        <path
          d="M12.077 2.46302C12.3208 2.13203 12.8135 2.1354 13.0528 2.46976L18.4043 9.78631C18.7046 10.1968 18.8244 10.7067 18.7415 11.2098L17.3858 19.4403C17.2825 20.0676 16.7425 20.5263 16.1074 20.5263H7.91555C7.27896 20.5263 6.73833 20.0653 6.63691 19.436L5.25755 11.1985C5.17449 10.7027 5.29209 10.1998 5.58475 9.79289L11.0572 2.47592C11.3027 2.13789 11.8125 2.13157 12.0651 2.46294L12.0711 2.47079L12.077 2.46302Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 21V12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      {/* WORDMARK: Tighter, bolder text for a shorter name */}
      <span className="font-serif text-2xl font-bold tracking-tight text-gray-900">
        Scribe.
      </span>
    </div>
  )
}

export default Logo