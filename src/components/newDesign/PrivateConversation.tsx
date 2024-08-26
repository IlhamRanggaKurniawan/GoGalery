"use client"

import { useSession } from '@/lib/hooks/useSession'
import React, { FormEvent, useState } from 'react'
import Message from './Message'
import MessageInput from './MessageInput'
import apiClient from '@/lib/apiClient'
import useEffectAfterMount from '@/lib/hooks/useEffectAfterMount'

const PrivateConversation = ({ conversationId, prevMessage }: { conversationId: number, prevMessage: any[] }) => {
  const [messages, setMessages] = useState(prevMessage)
  const [input, setInput] = useState("")
  const { user } = useSession()

  const submitData = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      console.log(conversationId)

      const message = await apiClient.post(`/message/dm/create/${conversationId}`, {
        body: {
          senderId: user?.id,
          message: input,
          conversationId: conversationId
        },
        cache: "no-cache"
      })

      console.log(message)

      setMessages([...messages, message])

      console.log(message)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className=" overflow-y-auto mt-14">
        {messages && messages.map((message: any) => (
          <div key={message.ID}>
            {user && (
              <Message message={message.Message} senderId={user.id} />
            )}
            {message.Response && (
              <Message message={message.Response} senderId={0} />
            )}
          </div>
        ))}
      </div>
      <MessageInput value={input} handleChange={setInput} fn={submitData} />
    </>
  )
}

export default PrivateConversation