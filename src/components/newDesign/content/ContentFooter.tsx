"use client"

import apiClient from '@/lib/apiClient'
import useEffectAfterMount from '@/lib/hooks/useEffectAfterMount'
import { useSession } from '@/lib/hooks/useSession'
import { Bookmark, Heart, MessageCircle, Share } from 'lucide-react'
import React, { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const ContentFooter = ({ id }: { id: number }) => {
    const { user } = useSession()
    const [likeId, setLikeId] = useState(0)
    const [savedId, setSavedId] = useState(0)

    useEffectAfterMount(() => {
        if (!user) return

        const checkLikeAndSave = async () => {
            const isLike = await apiClient.get(`/like/findone?userId=${user?.id}&contentId=${id}`, { cache: "no-cache" })
            const isSaved = await apiClient.get(`/save/findone?userId=${user?.id}&contentId=${id}`, { cache: "no-cache" })

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
    },300)

    const handleSaveContent = useDebouncedCallback(async () => {
        if (savedId === 0) {
            const newSave = await apiClient.post("/save/create", {
                body: {
                    userId: user?.id,
                    contentId: id
                },
                cache: "no-cache"
            })

            setSavedId(newSave.ID)
        } else {
            await apiClient.delete(`/save/delete/${savedId}`)
            setSavedId(0)
        }
    }, 300)


    return (
        <div className='py-2 flex justify-between'>
            <div className='flex gap-4'>
                <Heart size={23} onClick={handleLikeContent} fill={`${likeId === 0 ? "white" : "red"}`} color={`${likeId === 0 ? "black" : "red"}`} className='cursor-pointer' />
                <MessageCircle size={23} className='cursor-pointer' />
                <Share size={23} className='cursor-pointer' />
            </div>
            <Bookmark size={23} onClick={handleSaveContent} fill={`${savedId === 0 ? "white" : "black"}`} className='cursor-pointer' />
        </div>
    )
}

export default ContentFooter