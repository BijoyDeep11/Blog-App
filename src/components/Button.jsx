import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-black", 
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button 
            className={`
                px-6 
                py-3 
                rounded-lg 
                font-medium 
                tracking-wide
                transition-all 
                duration-300 
                hover:opacity-90 
                hover:shadow-lg 
                active:scale-95
                disabled:opacity-50 
                disabled:cursor-not-allowed
                ${bgColor} 
                ${textColor} 
                ${className}
            `} 
            {...props}
        >
            {children}
        </button>
    );
}