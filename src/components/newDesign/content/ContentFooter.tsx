"use client"

import apiClient from '@/lib/apiClient'
import useEffectAfterMount from '@/lib/hooks/useEffectAfterMount'
import { useSession } from '@/lib/hooks/useSession'
import { Bookmark, Heart, MessageCircle, Share } from 'lucide-react'
import React, { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import CommentSheet from '../comment/CommentSheet'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import toast from 'react-hot-toast'

const ContentFooter = ({ id, isLiked, isSaved, saveId: initialSaveId, likeId: initialLikeId }: { id: number, isLiked: boolean, isSaved: boolean, saveId: number, likeId: number }) => {
    const { user } = useSession()
    const [likeId, setLikeId] = useState(initialLikeId)
    const [savedId, setSavedId] = useState(initialSaveId)
    const [comments, setComments] = useState<any[]>([])
    const { theme } = useTheme()
    const router = useRouter()

    const handleLikeContent = useDebouncedCallback(async () => {
        if (!isLiked) {
            const newLike = await apiClient.post(`/v1/like/${id}`, {
                body: {},
                cache: "no-cache"
            })

            setLikeId(newLike.Id)
        } else {
            await apiClient.delete(`/v1/like/${likeId}`)
            setLikeId(0)
        }
    }, 300)

    const handleSaveContent = useDebouncedCallback(async () => {
        if (!isSaved) {
            const newSave = await apiClient.post(`/v1/save/${id}`, {
                body: {},
                cache: "no-cache"
            })

            setSavedId(newSave.Id)
        } else {
            await apiClient.delete(`/v1/save/${savedId}`)
            setSavedId(0)
        }
    }, 300)

    const handleShare = async () => {
        const origin = window.location.origin;
        const path = window.location.pathname;

        const link = path === "/" ? `${origin}/explore/fyp?contentId=${id}` : `${origin}/${path}?contentId=${id}`
        await navigator.clipboard.writeText(link)
        toast.success(`Content Url has been copied to your clipboard!`, {
            icon: "📋",
            duration: 1000,
        })
    }

    const getAllComments = async () => {
        try {
            const comments = await apiClient.get(`/v1/comments/${id}`, {
                cache: "no-cache"
            })

            setComments(comments)
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div className='py-2 flex justify-between'>
            <div className='flex gap-4'>
                <Heart size={23} onClick={handleLikeContent} fill={`${likeId !== 0 ? "red" : "none"}`} color={`${likeId !== 0 ? "red" : "currentColor"}`} className='cursor-pointer' />
                <div onClick={getAllComments} className='hidden sm:flex'>
                    <CommentSheet contentId={id} comments={comments} setComments={setComments}>
                        <MessageCircle size={23} className='cursor-pointer' />
                    </CommentSheet>
                </div>
                <div className='sm:hidden'>
                    <MessageCircle size={23} className='cursor-pointer' onClick={() => router.push(`/comments/${id}`)} />
                </div>
                <Share size={23} className='cursor-pointer' onClick={handleShare} />
            </div>
            <Bookmark
                size={23}
                onClick={handleSaveContent}
                fill={savedId !== 0 ? theme === "light" ? "black" : "white" : "transparent"}
                className={`cursor-pointer`}
            />
        </div>
    )
}

export default ContentFooter