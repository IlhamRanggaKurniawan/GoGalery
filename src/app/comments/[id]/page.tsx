import CommentPage from '@/components/newDesign/comment/CommentPage'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Connect Verse",
    description: "Welcome to the Connect Verse homepage.",
    keywords: "connect, verse, social media",
    authors: [{ name: "Connect Verse team" }],
    openGraph: {
        title: "Connect Verse",
        description: "Welcome to the Connect Verse homepage.",
        url: "https://ConnectVerse.com",
    },
    twitter: {
        card: "summary_large_image",
        title: "Connect Verse",
        description: "Welcome to the Connect Verse homepage.",
        images: ["https://example.com/image.jpg"],
    },
};

const page = ({ params }: { params: { id: string } }) => {
    return (
        <>
            <CommentPage contentId={+params.id} />
        </>
    )
}

export default page