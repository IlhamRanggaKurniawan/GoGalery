import Header from '@/components/newDesign/Header'
import Menu from '@/components/newDesign/MenuNavigation'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Menu | Connect Verse",
    description: "Welcome to the Connect Verse.",
    keywords: "connect, verse, social media",
    authors: [{ name: "Connect Verse team" }],
    openGraph: {
      title: "Connect Verse",
      description: "Welcome to the Connect Verse.",
      url: "https://ConnectVerse.com",
    },
    twitter: {
      card: "summary_large_image",
      title: "Connect Verse",
      description: "Welcome to the Connect Verse.",
      images: ["https://example.com/image.jpg"],
    },
  };

const page = () => {
    return (
        <>
            <Header>
                <div className='w-full h-12 flex items-center justify-center'>
                    <h2>Menu</h2>
                </div>
            </Header>
            <Menu />
        </>
    )
}

export default page