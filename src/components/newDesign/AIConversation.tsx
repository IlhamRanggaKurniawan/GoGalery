"use client"

import React, { FormEvent, useEffect, useState } from 'react'
import MessageInput from './MessageInput'
import Message from './Message'
import { useSession } from '@/lib/hooks/useSession'
import useEffectAfterMount from '@/lib/hooks/useEffectAfterMount'
import apiClient from '@/lib/apiClient'
import { ITextMessage } from '@/lib/actions/ai'

interface MessageType {
    ID: number;
    Message: string;
    Response?: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}

const AIConversation = ({ fn, conversationId }: { fn: () => Promise<any>, conversationId: number }) => {
    const { user } = useSession()
    const [messages, setMessages] = useState<MessageType[]>([])
    const [promt, setPrompt] = useState<ITextMessage[]>([])
    const [input, setInput] = useState("")

    useEffectAfterMount(() => {
        const fetchData = async () => {

            const data = await fn()

            setMessages(data)

            const lastThreeMessages = data.slice(-3);

            const formattedMessages: ITextMessage[] = lastThreeMessages.flatMap((message: any) => [
                { role: "user", content: message.message },
                { role: "assistant", content: message.response ?? "" },
            ]);


            setPrompt(formattedMessages)
        }

        fetchData()
    }, [user])

    const submitData = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!input) return

        const newMessage: MessageType = {
            ID: (messages.length + 1),
            Message: input,
            CreatedAt: new Date(),
            UpdatedAt: new Date()
        }

        setMessages([...messages, newMessage])

        const data = await apiClient.post("/ai/message/create", {
            body: {
                senderId: user?.id,
                conversationId: conversationId,
                message: input

            },
            cache: "no-cache"
        })

        setInput("")

        if (data && data.Response) {
            setMessages((prev) => {
                const newMessages = prev.slice(0, -1);
                return [...newMessages, data];
            });
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

export default AIConversation