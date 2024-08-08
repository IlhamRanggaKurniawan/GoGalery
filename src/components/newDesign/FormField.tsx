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
        <div className={`border-b border-slate-300 w-full rounded-lg mb-2${props.className}`}>
            <input
                value={value}
                placeholder={placeholder}
                onChange={(e) => handleChange(e.target.value)}
                type={type}
                className='p-3 text-base w-full rounded-xl outline-none ring-0 focus:ring-0 focus:outline-none'
                {...props}
            />
        </div>
    )
}

export default FormField