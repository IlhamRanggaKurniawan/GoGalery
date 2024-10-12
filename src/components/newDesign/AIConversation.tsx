"use client"

import React, { FormEvent, useEffect, useRef, useState } from 'react'
import MessageInput from './messages/MessageInput'
import Message from './messages/Message'
import { useSession } from '@/lib/hooks/useSession'
import useEffectAfterMount from '@/lib/hooks/useEffectAfterMount'
import apiClient from '@/lib/apiClient'

interface MessageType {
    Id: number;
    Message: string;
    Response?: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}

const AIConversation = ({ conversationId }: { conversationId: number }) => {
    const { user } = useSession()
    const [messages, setMessages] = useState<MessageType[]>([])
    const [prompt, setPrompt] = useState<any[]>([])
    const [input, setInput] = useState("")
    const lastMessageRef = useRef<HTMLDivElement>(null)

    useEffectAfterMount(() => {
        const fetchData = async () => {
            if (!user?.id) return

            const data = await apiClient.get(`/v1/ai/conv/${user?.id}`, {
                cache: "no-cache"
            })

            setMessages(data.Messages)

            const lastThreeMessages = data.Messages.slice(-3);

            const prompt = lastThreeMessages.flatMap((message: any) => [
                { role: "user", content: message.Message },
                { role: "assistant", content: message.Response ?? "" },
            ]);

            setPrompt(prompt)
        }

        fetchData()
    }, [user])

    const submitData = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            if (!input) return
            setInput("")

            const newMessage: MessageType = {
                Id: (messages.length + 1),
                Message: input,
                CreatedAt: new Date(),
                UpdatedAt: new Date()
            }

            if (prompt.length > 5) {
                setPrompt((prev) => {
                    const newPrompt = prev.slice(0, -2)
                    return newPrompt
                })
            }

            prompt.push({ role: "user", content: input });

            setMessages([...messages, newMessage])

            const data = await apiClient.post(`/v1/ai/message/${conversationId}`, {
                body: {
                    senderId: user?.id,
                    prompt: prompt,

                },
                cache: "no-cache"
            })

            setMessages((prev) => {
                const newMessages = prev.slice(0, -1);
                return [...newMessages, data];
            });

            const formattedMessages = [
                { role: "user", content: data.Message },
                { role: "assistant", content: data.Response ?? "" },
            ];

            setPrompt((prev) => {
                const newPrompt = prev.slice(0, -2);
                return [...newPrompt, ...formattedMessages]
            })
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
            <div className=" overflow-y-auto mt-14">
                {messages && messages.map((message, index) => (
                    <div key={message.Id} ref={index === messages.length - 1 ? lastMessageRef : null}>
                        {(user && message.Message) && (
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