import Header from '@/components/newDesign/Header'
import Menu from '@/components/newDesign/MenuNavigation'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Menu | GoGalery",
    description: "Welcome to the GoGalery.",
    keywords: "Go, Galery, social media",
    authors: [{ name: "GoGalery team" }],
    openGraph: {
      title: "GoGalery",
      description: "Welcome to the GoGalery.",
      url: "https://gogalery.com",
    },
    twitter: {
      card: "summary_large_image",
      title: "GoGalery",
      description: "Welcome to the GoGalery.",
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