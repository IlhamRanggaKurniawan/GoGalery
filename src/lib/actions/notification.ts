"use server"

import prisma from "../dataStorage/db"

export interface INotification {
    id: number,
    userId: number,
    type: string,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    user: {
        id: number,
        username: string
    }
}

export const createNotification = async ({receiverId, type, content, senderId}: {receiverId: number, type: string, content: string, senderId: number}) => {
    if(receiverId === senderId) {
        return 
    }

    const notification = await prisma.notification.create({
        data: {
            userId: receiverId ,
            type,
            content
        }
    })

    return notification
}

export const getAllNotification = async ({userId}: {userId: number}) => {
    const notifications = await prisma.notification.findMany({
        where: {
            userId
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    })

    if(!notifications) {
        return
    }

    await prisma.notification.updateMany({
        where: {
            userId
        },
        data: {
            isRead: true
        }
    })

    return notifications
}