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
                    username: true,
                    profileUrl: true
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
        return({
            error: "something went wrong",
            statusCode: 500
        })
    }

    await createNotification({
        receiverId: like.content.uploaderId,
        type: "like",
        content: "liking your content",
        senderId: userId
    })

    return {
        data: like,
        statusCode: 200,
    };
}

export const unlikeContent = async({id}: {id: number}) => {
    const unlike = await prisma.likeContent.delete({
        where:{
            id
        }
    })

    if(!unlike) {
        return({
            error: "something went wrong",
            statusCode: 500
        })
    }

    return {
        data: unlike,
        statusCode: 200
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
        return({
            status: false,
            statusCode: 500
        })
    }

    return {
        data: isLike,
        status: true,
        statusCode: 200
    };
}