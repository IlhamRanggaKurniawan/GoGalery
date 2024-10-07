import Header from '@/components/newDesign/Header';
import NotificationInfiniteScroll from '@/components/newDesign/notification/NotificationInfiniteScroll';
import { X } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react'

export const metadata: Metadata = {
  title: "GoGalery",
  description: "Welcome to the GoGalery",
  keywords: "Go, Galery, social media",
  authors: [{ name: "GoGalery team" }],
  openGraph: {
    title: "GoGalery",
    description: "Welcome to the GoGalery ",
    url: "https://gogalery.com/",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoGalery",
    description: "Welcome to the GoGalery ",
  },
};

const page = () => {
  return (
    <>
      <Header>
        <div className='w-full h-12 flex items-center justify-between px-4 border-b'>
          <h2 className='text-lg font-medium'>Notifications</h2>
          <Link href="/">
            <X />
          </Link>
        </div>
      </Header>
      <NotificationInfiniteScroll />
    </>
  )
}

export default page