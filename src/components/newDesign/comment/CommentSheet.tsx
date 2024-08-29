"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import React, { useState } from 'react'
import Comment from './Comment'
import { Input } from '@/components/ui/input'
import { useSession } from '@/lib/hooks/useSession'
import apiClient from '@/lib/apiClient'

const CommentSheet = ({ children, contentId, comments }: { children: React.ReactNode, contentId: number, comments: any[] }) => {
    const [text, setText] = useState("")
    const { user } = useSession()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()

            const response = await apiClient.post(`/comment/create/${user?.id}`, {
                body: {
                    contentId,
                    message: text
                },
                cache: "no-cache"
            })

            setText("")

            response.User.Username = user?.username

            comments.unshift(response)

        } catch (error) {
            console.error(error)
        }
    }

    const handleDeleteComment = async () => {
        
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
                        <Comment commentId={comment.ID} commentSender={comment.User.Username} createdAt={comment.CreatedAt} profileUrl={comment.User.ProfileUrl} text={comment.Comment} uploader={comment.Content.Uploader.Username} key={comment.ID} />
                    ))}
                    </div>
                <form className="w-full max-w-96 h-14 border-y-2 fixed bottom-0" onSubmit={handleSubmit}>
                    <Input required placeholder="Send a comment" className="border-0 rounded-none h-14" value={text} onChange={(e) => setText(e.target.value)} />
                </form>
            </SheetContent>
        </Sheet>
    )
}

export default CommentSheet