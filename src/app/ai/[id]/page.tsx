
import React from 'react'
import AIConversation from '@/components/newDesign/AIConversation'
import ConversationHeader from '@/components/newDesign/messages/ConversationHeader'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Messages | Connect Verse",
  description: "Welcome to the Connect Verse Messages page",
  keywords: "connect, verse, social media",
  authors: [{ name: "Connect Verse team" }],
  openGraph: {
    title: "Messages | Connect Verse",
    description: "Welcome to the Connect Verse Messages page",
    url: "https://ConnectVerse.com/Messages",
  },
  twitter: {
    card: "summary_large_image",
    title: "Messages | Connect Verse",
    description: "Welcome to the Connect Verse Messages page",
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