"use client"

import { useSession } from '@/lib/hooks/useSession'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import useWebSocket from '@/lib/hooks/useWebSocket'
import Message from './Message'
import MessageInput from './MessageInput'

const PrivateConversation = ({ conversationId, prevMessage }: { conversationId: number, prevMessage: any[] }) => {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<any[]>(prevMessage)
  const { user } = useSession()
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const { sendMessage } = useWebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/v1/ws/direct?dmId=${conversationId}&userId=${user?.id}`, setMessages)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      if (input === "") return
      sendMessage(input)
      setInput("")
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <div className=" overflow-y-auto">
        {messages && messages.map((message, i) => (
          <div key={message.ID} ref={i === messages.length - 1 ? lastMessageRef : null}>
            <Message message={message.Message} senderId={message.SenderID} key={message.ID} />
          </div>
        ))}
      </div >
      <MessageInput value={input} handleChange={setInput} fn={handleSubmit} />
    </>
  )
}

export default PrivateConversation