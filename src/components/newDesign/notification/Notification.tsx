import React from 'react'
import Avatar from '../Avatar'
import Link from 'next/link'

const Notification = ({ username, content, createdAt, profilePicture }: { username: string, content: string, createdAt: Date, profilePicture: string | null }) => {
    return (
        <Link href={`/profile/${username}`} className='mx-2 hover:bg-slate-100 rounded-2xl py-1 px-2'>
            <div className='flex items-center gap-2'>
                <div className='w-10 h-10'>
                    <Avatar profilePicture={profilePicture} username={username} />
                </div>
                <div className='flex gap-1'>
                    <span className='font-medium'>{username}</span>
                    <span>{content}</span>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-qs">{new Date(createdAt).toLocaleString().split(",")[1]}</span>
            </div>
        </Link>
    )
}

export default Notification