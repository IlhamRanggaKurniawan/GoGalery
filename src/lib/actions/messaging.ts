"use server"

import prisma from "../dataStorage/db"

export interface IDM {
    id: number,
    createdAt: Date,
    participants: [
        {
            id: number,
            username: string
        }
    ]
}

export const sendMessage = async ({ message, senderId, directMessageId, groupId }: { message: string, senderId: number, directMessageId?: number, groupId?: number }) => {

    const chat = directMessageId ? await prisma.message.create({
        data: {
            senderId,
            message,
            directMessageId
        }
    }) : await prisma.message.create({
        data: {
            senderId,
            message,
            groupChatId: groupId
        }
    });

    if (!chat) {
        return
    }

    return chat
}

export const deleteMessage = async ({ id }: { id: number }) => {
    const chat = await prisma.message.delete({
        where: {
            id
        }
    })

    if (!chat) {
        return
    }

    return chat
}

export const createGroup = async ({ name, member }: { name: string, member: any[] }) => {
    const group = await prisma.groupChat.create({
        data: {
            name,
            member: {
                connect: member.map(user => ({ id: user.id }))
            }
        }
    })

    if (!group) {
        return
    }

    return group
}

export const createDM = async ({ participants }: { participants: any[] }) => {
    const DM = await prisma.directMessage.create({
        data: {
            participants: {
                connect: participants.map(user => ({ id: user.id }))
            }
        }
    })

    if (!DM) {
        return
    }

    return DM
}

export const getAllMessage = async ({ directMessageId, groupChatId }: { directMessageId?: number, groupChatId?: number }) => {

    const chat = directMessageId ? await prisma.message.findMany({
        where: {
            directMessageId
        }
    }) : await prisma.message.findMany({
        where: {
            groupChatId
        }
    });

    if (!chat) {
        return
    }

    return chat
}

export const getExistingDM = async ({ userId }: { userId: number }) => {
    const DM = await prisma.directMessage.findMany({
        where: {
            participants: {
                some: {
                    id: userId
                }
            }
        },
        include: {
            participants: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    })

    if (!DM) {
        return
    }

    console.log(DM)

    return DM
}