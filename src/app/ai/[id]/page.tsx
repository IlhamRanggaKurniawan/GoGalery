
import React from 'react'
import AIConversation from '@/components/newDesign/AIConversation'
import ConversationHeader from '@/components/newDesign/messages/ConversationHeader'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Messages | GoGalery",
  description: "Welcome to the GoGalery Messages page",
  keywords: "Go, Galery, social media",
  authors: [{ name: "GoGalery team" }],
  openGraph: {
    title: "Messages | GoGalery",
    description: "Welcome to the GoGalery Messages page",
    url: "https://gogalery.com/Messages",
  },
  twitter: {
    card: "summary_large_image",
    title: "Messages | GoGalery",
    description: "Welcome to the GoGalery Messages page",
  },
};

const page = async ({ params }: { params: { id: string } }) => {

  return (
    <div className='mb-14'>
      <ConversationHeader />
      <AIConversation conversationId={+params.id} />
    </div>
  )
}

export default page