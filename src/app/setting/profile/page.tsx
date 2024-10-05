import UpdateProfileForm from '@/components/newDesign/form/UpdateProfileForm'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Setting | Connect Verse",
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
    <UpdateProfileForm />
  )
}

export default page