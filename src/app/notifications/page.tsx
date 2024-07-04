import NotificationPage from '@/components/myComponents/Notification/NotificationPage'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Connect Verse",
    description: "Welcome to the Connect Verse AI page",
    keywords:"connect, verse, social media",
    authors: [{name: "Connect Verse team"}],
    openGraph: {
      title: "Connect Verse",
      description: "Welcome to the Connect Verse AI page",
      url: "https://ConnectVerse.com/",
    },
    twitter: {
      card: "summary_large_image",
      title: "Connect Verse",
      description: "Welcome to the Connect Verse AI page",
    },
  };

const page = () => {
  return (
    <NotificationPage />
  )
}

export default page