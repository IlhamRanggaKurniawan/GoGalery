
import React from 'react'
import AIConversation from '@/components/newDesign/AIConversation'
import ConversationHeader from '@/components/newDesign/messages/ConversationHeader'

const page = async ({ params }: { params: { id: string } }) => {
  
  return (
    <div className='mb-14'>
      <ConversationHeader />
      <AIConversation conversationId={+params.id} />
    </div>
  )
}

export default page