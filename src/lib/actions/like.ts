"use server"

import prisma from "../dataStorage/db"

export const likeContent = async({userId, contentId}: {userId: number, contentId: number}) => {
    const like = await prisma.like.create({
        data:{
            userId,
            contentId
        }
    })

    if (!like) {
        return {
            data: null,
            error: "something went wrong"
        }
    }

    return {
        data: like,
        error: null
    }
}

export const unlikeContent = async({userId,contentId}: {userId: number, contentId: number}) => {
    const like = await prisma.like.findFirst({
        where: {
            userId,
            contentId
        }
    })

    if(!like) {
        return
    }

    const unlike = await prisma.like.delete({
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

    const isLike = await prisma.like.findFirst({
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