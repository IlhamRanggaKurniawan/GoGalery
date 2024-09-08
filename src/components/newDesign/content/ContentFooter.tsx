"use client"

import apiClient from '@/lib/apiClient'
import useEffectAfterMount from '@/lib/hooks/useEffectAfterMount'
import { useSession } from '@/lib/hooks/useSession'
import { Bookmark, Heart, MessageCircle, Share } from 'lucide-react'
import React, { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import CommentSheet from '../comment/CommentSheet'
import { useRouter } from 'next/navigation'

const ContentFooter = ({ id }: { id: number }) => {
    const { user } = useSession()
    const [likeId, setLikeId] = useState(0)
    const [savedId, setSavedId] = useState(0)
    const [comments, setComments] = useState<any[]>([])
    const router = useRouter()

    useEffectAfterMount(() => {
        if (!user) return

        const checkLikeAndSave = async () => {
            const isLike = await apiClient.get(`/like/findone?userId=${user?.id}&contentId=${id}`, { cache: "no-cache" })
            const isSaved = await apiClient.get(`/saved/findone?userId=${user?.id}&contentId=${id}`, { cache: "no-cache" })

            if (isLike) setLikeId(isLike.ID)
            if (isSaved) setSavedId(isSaved.ID)
        }

        checkLikeAndSave()
    }, [user?.id])

    const handleLikeContent = useDebouncedCallback(async () => {
        if (likeId === 0) {
            const newLike = await apiClient.post("/like/create", {
                body: {
                    userId: user?.id,
                    contentId: id
                },
                cache: "no-cache"
            })

            setLikeId(newLike.ID)
        } else {
            await apiClient.delete(`/like/delete/${likeId}`)
            setLikeId(0)
        }
    }, 300)

    const handleSaveContent = useDebouncedCallback(async () => {
        if (savedId === 0) {
            const newSave = await apiClient.post("/saved/create", {
                body: {
                    userId: user?.id,
                    contentId: id
                },
                cache: "no-cache"
            })

            setSavedId(newSave.ID)
        } else {
            await apiClient.delete(`/saved/delete/${savedId}`)
            setSavedId(0)
        }
    }, 300)

    const handleShare = () => {
        const origin = window.location.origin;
        const path = window.location.pathname;

        const link = path === "/" ? `${origin}/explore/fyp?contentId=${id}` : `${origin}/${path}?contentId=${id}`
        navigator.clipboard.writeText(link)
    }

    const getAllComments = async () => {
        try {
            const comments = await apiClient.get(`/comment/findall/${id}`, {
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
                <Heart size={23} onClick={handleLikeContent} fill={`${likeId === 0 ? "none" : "red"}`} color={`${likeId === 0 ? "currentColor" : "red"}`} className='cursor-pointer' />
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
            <Bookmark size={23} onClick={handleSaveContent} fill={`${savedId === 0 ? "white" : "black"}`} className='cursor-pointer' />
        </div>
    )
}

export default ContentFooter