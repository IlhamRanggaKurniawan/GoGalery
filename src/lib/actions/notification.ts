"use server"

import prisma from "../dataStorage/db"

export interface INotification {
    id: number,
    userId: number,
    type: string,
    content: string,
    createdAt: Date,
    user: {
        id: number,
        username: string,
        profileUrl: string | null
    }
}

export const createNotification = async ({ receiverId, type, content, senderId }: { receiverId: number, type: string, content: string, senderId: number }) => {
    if (receiverId === senderId) {
        return
    }

    const notification = await prisma.notification.create({
        data: {
            userId: receiverId,
            type,
            content
        },
        include: {
            user: {}
        }
    })

    if (!notification) {
        return({
            error: "something went wrong",
            statusCode: 500
        })
    }

    return {
        data: notification,
        statusCode: 200
    }
}

export const getAllNotification = async ({ userId }: { userId: number }) => {
    const notifications = await prisma.notification.findMany({
        where: {
            userId
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    profileUrl: true
                }
            },
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    if (!notifications) {
        return {
            data: notifications,
            statusCode: 200
        }
    }

    await prisma.notification.updateMany({
        where: {
            userId,
            isRead: false
        },
        data: {
            isRead: true
        }
    })

    return ({
        data: notifications,
        statusCode: 200
    })
}

export const checkNotification = async ({ userId }: { userId: number }) => {
    const notification = await prisma.notification.findFirst({
        where: {
            userId,
            isRead: false
        }
    })

    if (!notification) {
        return ({
            status: false,
            statusCode: 200
        })
    }

    return {
        status: true,
        statusCode: 200
    }
}