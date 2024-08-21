"use client"

import React, { FormEvent } from 'react'
import { Send } from 'lucide-react';

interface MessageInputProps {
    value: string;
    handleChange: React.Dispatch<React.SetStateAction<string>>;
    fn: (e: FormEvent<HTMLFormElement>) => Promise<void>;

}

const MessageInput: React.FC<MessageInputProps> = ({ value, handleChange, fn }) => {
    return (
        <form onSubmit={(e) => fn(e)} className='fixed bottom-0 w-full h-14 px-3 flex items-center gap-x-3 bg-background'>
            <div className='justify-center w-full rounded-full my-1'>
                <input
                    placeholder="Message...."
                    onChange={(e) => handleChange(e.target.value)}
                    type="text"
                    value={value}
                    className='p-3 text-base w-full border border-slate-200 rounded-full'
                />
            </div>
            <button type='submit' >
                <Send size={30} color="black" />
            </button>
        </form>
    )
}

export default MessageInput