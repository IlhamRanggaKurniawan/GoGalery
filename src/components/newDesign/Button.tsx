"use client"

import React, { useState } from 'react'

interface ButtonProps {
    onClick?: () => void,
    children: React.ReactNode,
    className?: string,
    [key: string]: any;
}

const Button: React.FC<ButtonProps> = ({ onClick, className, children, ...props }) => {
    const [isPressed, setIsPressed] = useState(false)

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsPressed(false);

    const opacityStyle = isPressed ? `opacity-30` : 'opacity-100';

    return (
        <button
            onClick={onClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            {...props}
            className={`w-full h-full flex items-center justify-center transition-opacity ease-in-out cursor-pointer p-2 ${className} ${opacityStyle}`}
        >
            {children}
        </button>
    )
}

export default Button