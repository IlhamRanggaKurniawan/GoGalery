"use client"

import React from 'react'
import Header from './Header'
import { ChevronLeft } from 'lucide-react'
import Avatar from './Avatar'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const ConversationHeader = ({ name }: { name?: string }) => {

    const router = useRouter()

    return (
        <Header>
            {name ? (
                <Link href={`/profile/${name}`} className="flex gap-2 items-center h-14">
                    <div className="flex gap-2 items-center">
                        <ChevronLeft size={30} onClick={() => router.back()} className='cursor-pointer' />
                        <div className="h-12 w-12">
                            <Avatar profilePicture={null} username="tes" />
                        </div>
                    </div>
                    <h2>{name}</h2>
                </Link>
            ) : (
                <div className="flex gap-2 items-center h-14">
                    <div className="flex gap-2 items-center">
                        <ChevronLeft size={30} onClick={() => router.back()} className='cursor-pointer' />
                        <div className="h-12 w-12">
                            <Avatar profilePicture="/openAI.jpeg" username="openAI" />
                        </div>
                    </div>
                    <h2>Open AI</h2>
                </div>
            )}

        </Header>
    )
}

export default ConversationHeader