import Avatar from '@/components/newDesign/Avatar'
import Conversation from '@/components/newDesign/AIConversation'
import ConversationHeader from '@/components/newDesign/ConversationHeader'
import Header from '@/components/newDesign/Header'
import Message from '@/components/newDesign/Message'
import MessageInput from '@/components/newDesign/MessageInput'
import api from '@/lib/api'
import getSession from '@/lib/serverHooks/getSession'
import { ChevronLeft } from 'lucide-react'
import React from 'react'
import AIConversation from '@/components/newDesign/AIConversation'

const page = async ({ params }: { params: { id: string } }) => {
  const { user } = await getSession()

  const tes = async () => {
    "use server"

    const AIConversation = await api.get(`/ai/conv/findone/${user?.id}`, { cache: "no-cache" })

    return AIConversation.Messages
  }

  return (
    <div className='mb-14'>
      <ConversationHeader />
      <AIConversation fn={tes} conversationId={+params.id} />
    </div>
  )
}

export default page