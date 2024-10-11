"use client"

import React, { useState, useEffect } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import Content from './Content';
import ContentSkeleton from './ContentSkeleton';
import apiClient from '@/lib/apiClient';
import { useSession } from '@/lib/hooks/useSession';
import useEffectAfterMount from '@/lib/hooks/useEffectAfterMount';

const StraightInfiniteScroll = () => {
    const [contents, setContents] = useState<any[]>([])
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)
    const { user } = useSession()

    const fetchMore = async () => {
        try {
            if(!user?.id) return
            const response = await apiClient.get(`/v1/contents/${user?.id}`, { cache: "no-cache" })
            // setLoading(false)
            setContents((prev) => [...prev, ...response]);
            setHasMore(false)

            if (response.length === 0) {
                setHasMore(false);
            }

        } catch (error) {
            console.error(error)
        } finally {
            // setLoading(false)
        }
    }

    // fetchMore()

    useEffect(() => {
        fetchMore()
    }, [user?.id])

    useEffect(() => {
        console.log(contents)
    }, [contents])

    return (
        <InfiniteScroll
            dataLength={contents.length}
            loader={
                <div className=" overflow-y-auto flex flex-col items-center w-full">
                    <ContentSkeleton />
                    <ContentSkeleton />
                    <ContentSkeleton />
                </div>
            }
            hasMore={hasMore}
            next={() => console.log("tes")}
            scrollThreshold={0.8}
            className=" overflow-y-auto flex flex-col items-center">
            {contents && contents.map((response) => (
                <Content
                    key={response.content.ID}
                    caption={response.content.Caption}
                    username={response.content.Uploader.Username}
                    contentUrl={response.content.URL}
                    id={response.content.ID}
                    type={response.content.Type}
                    profilePicture={response.content.Uploader.ProfileUrl}
                    isLiked={response.Like.isLiked}
                    isSaved={response.Save.isSaved}
                    likeId={response.Like.likeId}
                    saveId={response.Save.saveId}
                />
            ))}
        </InfiniteScroll>
    )
}

export default StraightInfiniteScroll