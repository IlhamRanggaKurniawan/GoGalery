"use server"
import OpenAI from "openai"
import prisma from "../dataStorage/db"

export interface IAIMessage {
    id: number;
    senderId: number;
    aIConversationId: number;
    message: string;
    response: string | null;
    createdAt: Date;
}

export interface ITextMessage {
    role: "assistant" | "user" | "system",
    content: string
}

const openAI = new OpenAI({
    apiKey: process.env.OPENAI_KEY
})

export const textGeneration = async ({ id, messages }: { id: number, messages: { role: "user" | "assistant" | "system"; content: string }[] }) => {

    const chat = await openAI.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "you are a helpfull asistant" },
            ...messages
        ],
        max_tokens: 350
    })

    if (!chat || !chat.choices || !chat.choices[0] || !chat.choices[0].message || !chat.choices[0].message.content) return

    messages.push({ role: "assistant", content: chat.choices[0].message.content })

    const message = await prisma.aIMessage.update({
        where: {
            id
        },
        data: {
            response: chat.choices[0].message.content
        }
    })

    return {
        data: message,
        messages,
        statusCode: 200
    }
}

export const sendChat = async ({ userId, conversationId, message }: { userId: number, conversationId: number, message: string }) => {
    const chat = await prisma.aIMessage.create({
        data: {
            senderId: userId,
            aIConversationId: conversationId,
            message
        }
    })

    return chat
}

export const getAIMessage = async ({ id }: { id: number }) => {
    const message = await prisma.aIMessage.findMany({
        where: {
            aIConversationId: id
        }
    })

    return message
}

export const imageGenerate = async ({ prompt }: { prompt: string }) => {
    const image = await openAI.images.generate({
        model: "dall-e-2",
        size: "256x256",
        prompt,
        n: 1,
    })

    return image
}

export const findConversation = async ({userId}: {userId: number}) => {
    return await prisma.aIConversation.findFirst({
        where: {
            userId
        }
    })
}

export const createConversation = async ({userId}: {userId: number}) => {
    return await prisma.aIConversation.create({
        data: {
            userId
        }
    })
}