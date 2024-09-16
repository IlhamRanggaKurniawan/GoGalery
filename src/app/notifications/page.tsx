import Header from '@/components/newDesign/Header';
import NotificationInfiniteScroll from '@/components/newDesign/notification/NotificationInfiniteScroll';
import { X } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react'

export const metadata: Metadata = {
  title: "Connect Verse",
  description: "Welcome to the Connect Verse",
  keywords: "connect, verse, social media",
  authors: [{ name: "Connect Verse team" }],
  openGraph: {
    title: "Connect Verse",
    description: "Welcome to the Connect Verse ",
    url: "https://ConnectVerse.com/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Connect Verse",
    description: "Welcome to the Connect Verse ",
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