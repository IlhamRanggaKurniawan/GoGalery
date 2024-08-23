"use client"

import React from 'react'

interface FormFieldProps {
    placeholder: string;
    value: string;
    handleChange: React.Dispatch<React.SetStateAction<string>>;
    type?: React.HTMLInputTypeAttribute;
    [key: string]: any;
}

const FormField: React.FC<FormFieldProps> = ({ placeholder, value, handleChange, type, ...props }) => {
    return (
        <div className={`border-slate-300 w-full rounded-xl ${props.className}`}>
            <input
                value={value}
                placeholder={placeholder}
                onChange={(e) => handleChange(e.target.value)}
                type={type}
                className='p-3 text-base w-full outline-none ring-0 focus:ring-0 focus:outline-none'
                {...props}
            />
        </div>
    )
}

export default FormField