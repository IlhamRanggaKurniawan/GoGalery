"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import React, { useState } from 'react'
import Comment from './Comment'
import { Input } from '@/components/ui/input'
import { useSession } from '@/lib/hooks/useSession'
import apiClient from '@/lib/apiClient'

const CommentSheet = ({ children, contentId, comments, setComments }: { children: React.ReactNode, contentId: number, comments: any[], setComments: React.Dispatch<React.SetStateAction<any[]>> }) => {
    const [text, setText] = useState("")
    const { user } = useSession()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
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

    return (
        <Sheet>
            <SheetTrigger>{children}</SheetTrigger>
            <SheetContent className='p-0 sm:max-w-96'>
                <SheetHeader className="py-2 border-b">
                    <SheetTitle className="text-center">Comment Section</SheetTitle>
                </SheetHeader>
                <div className='flex flex-col w-full h-full overflow-y-auto p-2 pb-28'>
                    {comments && comments.map((comment) => (
                        <Comment commentId={comment.Id} commentSender={comment.User.Username} createdAt={comment.CreatedAt} profileUrl={comment.User.ProfileUrl} text={comment.Comment} uploader={comment.Content.Uploader.Username} key={comment.Id} />
                    ))}
                </div>
                <form className="w-full max-w-96 h-14 border-y-2 " onSubmit={handleSubmit}>
                    <Input required placeholder="Send a comment" className="border-0 rounded-none h-14 fixed bottom-0" value={text} onChange={(e) => setText(e.target.value)} />
                </form>
            </SheetContent>
        </Sheet>
    )
}

export default CommentSheet