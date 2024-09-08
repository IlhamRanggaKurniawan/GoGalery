import React from 'react'
import Avatar from '../Avatar'

const Contact = ({ username, profilePicture }: { username: string, profilePicture: string }) => {
    return (
        <div className='w-full px-2 mb-1'>
            <div className='rounded-2xl h-16 bg-card flex items-center px-2 gap-3'>
                <div className='w-14 h-14 flex-shrink-0'>
                    <Avatar profilePicture={profilePicture} username={username} />
                </div>
                <h3 className='truncate max-w-[80%]'>{username}</h3>
            </div>
        </div>
    )
}

export default Contact