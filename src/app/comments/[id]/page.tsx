import CommentPage from '@/components/newDesign/comment/CommentPage'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "GoGalery",
    description: "Welcome to the GoGalery homepage.",
    keywords: "Go, Galery, social media",
    authors: [{ name: "GoGalery team" }],
    openGraph: {
        title: "GoGalery",
        description: "Welcome to the GoGalery homepage.",
        url: "https://gogalery.com",
    },
    twitter: {
        card: "summary_large_image",
        title: "GoGalery",
        description: "Welcome to the GoGalery homepage.",
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