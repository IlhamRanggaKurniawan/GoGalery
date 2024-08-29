"use client"

import React from 'react'
import CommentDialog from './CommentDialog'
import { Ellipsis } from 'lucide-react'
import Avatar from '../Avatar'
import getSession from '@/lib/serverHooks/getSession'
import { useSession } from '@/lib/hooks/useSession'

interface CommentProps {
    commentSender: string,
    profileUrl: string | null,
    uploader: string,
    createdAt: Date,
    commentId: number,
    text: string
}

const Comment: React.FC<CommentProps> = ({ commentSender, profileUrl, uploader, createdAt, commentId, text }) => {

    const { user } = useSession()

    return (
        <>
            <div className="flex gap-2">
                <div className='w-9 h-9'>
                    <Avatar username={commentSender} profilePicture={profileUrl} />
                </div>
                <div className="flex items-center">
                    <div className="leading-[8px]">
                        {uploader === commentSender ? <span className="text-sm font-medium mr-2 text-cyan-400">{commentSender}</span> : <span className="text-sm font-medium mr-2">{commentSender}</span>}
                        <span className="text-sm">{text}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-xs">{new Date(createdAt).toLocaleString().split(",")[1]}</span>
                {(user?.role !== "member" || user.username === uploader || user.username === commentSender) && (
                    <CommentDialog commentId={commentId}>
                        <Ellipsis className="text-xs" size={16} />
                    </CommentDialog>
                )}
            </div>
        </>
    )
}

export default Comment