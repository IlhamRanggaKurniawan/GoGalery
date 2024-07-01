"use server"

import prisma from "../dataStorage/db"
import { IUserPreview } from "./user"

export interface INotification {
    id: number,
    type: string,
    content: string,
    receiver: IUserPreview,
    trigger: IUserPreview,
    createdAt: Date,
}

export const createNotification = async ({ receiverId, type, content, senderId }: { receiverId: number, type: string, content: string, senderId: number }) => {
    if (receiverId === senderId) {
        return
    }

    const notification = await prisma.notification.create({
        data: {
            receiverId,
            type,
            content,
            triggerId: senderId
        },
        include: {
            receiver: {
                select: {
                    id: true,
                    username: true,
                    profileUrl: true
                }
            },
            trigger: {
                select: {
                    id: true,
                    username: true,
                    profileUrl: true
                }
            }
        }
    })

    if (!notification) {
        return ({
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
            receiverId: userId
        },
        include: {
            receiver: {
                select: {
                    id: true,
                    username: true,
                    profileUrl: true
                }
            },
            trigger: {
                select: {
                    id: true,
                    username: true,
                    profileUrl: true
                }
            }
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
            receiverId: userId,
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
            receiverId: userId,
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