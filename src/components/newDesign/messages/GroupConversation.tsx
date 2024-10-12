"use client"

import React, { FormEvent, useEffect, useRef, useState } from 'react'
import Message from './Message'
import MessageInput from './MessageInput'
import useWebSocket from '@/lib/hooks/useWebSocket'
import { useSession } from '@/lib/hooks/useSession'

const GroupConversation = ({ conversationId, prevMessage }: { conversationId: number, prevMessage: any[] }) => {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<any[]>(prevMessage)
  const { user } = useSession()
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const { sendMessage } = useWebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/ws/group?groupId=${conversationId}&userId=${user?.id}`, setMessages)

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
          <div key={message.Id} ref={i === messages.length - 1 ? lastMessageRef : null}>
            <Message message={message.Message} senderId={message.SenderId} key={message.Id} />
          </div>
        ))}
      </div >
      <MessageInput value={input} handleChange={setInput} fn={handleSubmit} />
    </>
  )
}

export default GroupConversation