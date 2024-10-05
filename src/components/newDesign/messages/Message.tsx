"use client"

import { useSession } from '@/lib/hooks/useSession'
import React from 'react'

const Message = ({ senderId, message }: { senderId: number, message: string }) => {
    const { user } = useSession()

    return (
        <>
            {senderId !== user?.id ? (
                <div className='flex items-center justify-start ml-2 mb-1'>
                    <div className='w-fit bg-card rounded-2xl p-2 px-4 max-w-[70%]'>
                        <p className='text-sm whitespace-pre-line'>{message}</p>
                    </div>
                </div>
            ) : (
                <div className='flex items-center justify-end mr-2 mb-1'>
                    <div className='w-fit bg-blue-400 rounded-2xl p-2 px-4 max-w-[70%]'>
                        <p className='text-white text-sm whitespace-pre-line'>{message}</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default Message