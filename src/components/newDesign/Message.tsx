import React from 'react'

const Message = ({ senderId, message }: { senderId: number, message: string }) => {
    return (
        <>
            {senderId === 1 ? (
                <div className='flex items-center justify-start ml-2 mb-1'>
                    <div className='w-fit bg-slate-200 rounded-2xl p-2 px-4 max-w-[70%]'>
                        <p>{message}</p>
                    </div>
                </div>
            ) : (
                <div className='flex items-center justify-end mr-2 mb-1'>
                    <div className='w-fit bg-blue-400 rounded-2xl p-2 px-4 max-w-[70%]'>
                        <p className='text-white'>{message}</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default Message