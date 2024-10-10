"use client"

import React from 'react';
import Avatar from '../Avatar';
import { EllipsisVertical } from 'lucide-react';
import Image from 'next/image';
import ContentDescription from './ContentDescription';
import ContentFooter from './ContentFooter';
import Link from 'next/link';
import Video from './Video';
import getSession from '@/lib/serverHooks/getSession';
import { useSession } from '@/lib/hooks/useSession';

const Content = ({ username, profilePicture, contentUrl, caption, id, type, isLiked, isSaved, likeId, saveId }: { username: string, profilePicture: string | null, contentUrl: string, caption: string, id: number, type: "image" | "video", isLiked: boolean, isSaved: boolean, likeId: number, saveId: number }) => {

    const { user } =  useSession()

    return (
        <div className='p-2 w-full flex justify-center'>
            <div className='px-2 bg-card rounded-2xl w-full max-w-[500px]'>
                <div className='flex items-center justify-between py-2'>
                    <Link href={`/profile/${username}`} className='flex items-center gap-3 w-full mr-3'>
                        <div className='w-10 h-10'>
                            <Avatar profilePicture={profilePicture} username={username} />
                        </div>
                        <h2 className='text-sm'>{username}</h2>
                    </Link>
                    {(user?.role !== "member" || user?.username === username) && (
                        <EllipsisVertical />
                    )}
                </div>
                <div className='w-full'>
                    {type === "image" ? (
                        <Image src={contentUrl} alt={caption} width={1000} height={1000} loading='lazy' className='rounded-xl w-full max-h-[600px] object-contain bg-black' />
                    ) : (
                        <Video contentUrl={contentUrl} />
                    )}
                </div>
                <ContentFooter id={id} isLiked={isLiked} isSaved={isSaved} likeId={likeId} saveId={saveId}/>
                <ContentDescription caption={caption} />
            </div>
        </div>
    );
};

export default Content;
