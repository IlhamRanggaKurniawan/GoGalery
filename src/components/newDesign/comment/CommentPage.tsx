/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import apiClient from '@/lib/apiClient'
import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import Header from '../Header'
import { X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useSession } from '@/lib/hooks/useSession'
import { useRouter } from 'next/navigation'

const CommentPage = ({ contentId }: { contentId: number }) => {
    const [comments, setComments] = useState<any[]>([])
    const [text, setText] = useState("")
    const { user } = useSession()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            if(contentId === 0) return
            e.preventDefault()
            setText("")

            const comment = await apiClient.post(`/v1/comment/${contentId}`, {
                body: {
                    userId: user?.id,
                    message: text
                },
                cache: "no-cache"
            })

            comment.User.Username = user?.username

            setComments(prevComments => [comment, ...prevComments])

        } catch (error) {
            console.error(error)
        }
    }

    const getComments = async () => {
        try {
            const comments = await apiClient.get(`/v1/comments/${contentId}`, { cache: "no-cache" })

            setComments(comments)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getComments()
    }, [])

    return (
        <>
            <Header>
                <div className='w-full h-12 flex items-center justify-between px-4 border-b'>
                    <h2 className='text-lg font-medium'>Comments</h2>
                    <X onClick={router.back} />
                </div>
            </Header>
            <div className='w-full h-full overflow-y-scroll mt-14 px-2'>
                {comments && comments.map((comment) => (
                    <Comment key={comment.ID} commentId={comment.ID} commentSender={comment.User.Username} profileUrl={comment.User.ProfileUrl} text={comment.Comment} createdAt={comment.CreatedAt} uploader={comment.Content.Uploader.Username} />
                ))}
            </div>
            <form className="w-full h-14 border-t-2 fixed bottom-0" onSubmit={handleSubmit}>
                <Input required placeholder="Send a comment" className="border-0 rounded-none h-14 fixed bottom-0" value={text} onChange={(e) => setText(e.target.value)} />
            </form>
        </>
    )
}

export default CommentPage