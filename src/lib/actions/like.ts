"use server"

import prisma from "../dataStorage/db"
import { createNotification } from "./notification"

export const likeContent = async({userId, contentId}: {userId: number, contentId: number}) => {
    const like = await prisma.likeContent.create({
        data:{
            userId,
            contentId
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true
                }
            },
            content: {
                include: {
                    uploader: true
                }
            }
        }
    })

    if (!like) {
        return {
            data: null,
            error: "something went wrong"
        }
    }

    await createNotification({
        receiverId: like.content.uploaderId,
        type: "like",
        content: `${like.user.username} like your content`,
        senderId: userId
    })

    console.log("halo")

    return {
        data: like,
        error: null
    }
}

export const unlikeContent = async({userId,contentId}: {userId: number, contentId: number}) => {
    const like = await prisma.likeContent.findFirst({
        where: {
            userId,
            contentId
        }
    })

    if(!like) {
        return
    }

    const unlike = await prisma.likeContent.delete({
        where:{
            id : like.id
        }
    })

    if(!unlike) {
        return {
            data: null,
            error: "something went wrong"
        }
    }

    return {
        data: 'unlike',
        error: null
    };
}

export const isLike = async({userId, contentId}: {userId: number, contentId: number}) => {

    const isLike = await prisma.likeContent.findFirst({
        where: {
            userId,
            contentId
        }
    })

    if (!isLike) {
        return {
            data: null,
            status: false
        }
    }

    return {
        data: isLike,
        status: true
    }
}