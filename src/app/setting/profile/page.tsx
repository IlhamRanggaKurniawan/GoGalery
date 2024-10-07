import UpdateProfileForm from '@/components/newDesign/form/UpdateProfileForm'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Setting | GoGalery",
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
    <UpdateProfileForm />
  )
}

export default page