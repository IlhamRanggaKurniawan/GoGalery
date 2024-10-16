"use client"

import React, { useState, useEffect } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import Content from './Content';
import ContentSkeleton from './ContentSkeleton';
import apiClient from '@/lib/apiClient';
import { useSession } from '@/lib/hooks/useSession';
import EachUtils from '@/lib/EachUtils';

const StraightInfiniteScroll = () => {
    const [contents, setContents] = useState<any[]>([])
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(true)
    const [nextCursor, setNextCursor] = useState(null)
    const { user } = useSession()

    const fetchMore = async () => {
        try {
            if(!user?.id) return
            setLoading(true)
            const response = await apiClient.get(`/v1/contents?limit=10&cursor=${nextCursor}`, { cache: "no-cache" })
            setContents((prev) => [...prev, ...response.contents]);
            setNextCursor(response.nextCursor)

            if (response.nextCursor === null) {
                setHasMore(false);
            }

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMore()
    }, [user?.id])


    return (
        <InfiniteScroll
            dataLength={contents.length}
            loader={
                loading && (
                  <div className="overflow-y-auto flex flex-col items-center w-full">
                    <ContentSkeleton />
                    <ContentSkeleton />
                  </div>
                ) 
              }
            hasMore={hasMore}
            next={fetchMore}
            scrollThreshold={0.8}
            className=" overflow-y-auto flex flex-col items-center">
                <EachUtils of={contents} render={(response) => (
                    <Content
                    key={response.content.Id}
                    caption={response.content.Caption}
                    username={response.content.Uploader.Username}
                    contentUrl={response.content.URL}
                    id={response.content.Id}
                    type={response.content.Type}
                    profilePicture={response.content.Uploader.ProfileUrl}
                    isLiked={response.Like.isLiked}
                    isSaved={response.Save.isSaved}
                    likeId={response.Like.likeId}
                    saveId={response.Save.saveId}
                />
                )}/>
        </InfiniteScroll>
    )
}

export default StraightInfiniteScroll