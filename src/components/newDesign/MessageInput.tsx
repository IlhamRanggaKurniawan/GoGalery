import React from 'react'
import { Send } from 'lucide-react';

interface MessageInputProps {
    value: string;
    handleChange?: React.Dispatch<React.SetStateAction<string>>;
}

const MessageInput: React.FC<MessageInputProps> = ({ value, handleChange }) => {
    return (
        <div className='fixed bottom-0 w-full h-14 px-3 flex items-center gap-x-3 bg-background'>
            <div className='justify-center w-full rounded-full my-1'>
                <input
                    placeholder="Message...."
                    // onChange={(e) => handleChange(e.target.value)}
                    type="text"
                    className='p-3 text-base w-full border border-slate-200 rounded-full'
                />
            </div>
            <Send size={30} color="black" />
        </div>
    )
}

export default MessageInput