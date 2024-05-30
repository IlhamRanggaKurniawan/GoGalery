"use server"

import prisma from "../dataStorage/db"

export const saveContent = async({userId, contentId}: {userId: number, contentId: number}) => {
    const save = await prisma.save.create({
        data:{
            userId,
            contentId
        }
    })

    if (!save) {
        return {
            data: null,
            error: "something went wrong"
        }
    }

    return {
        data: save,
        error: null
    }
}

export const unsaveContent = async({userId,contentId}: {userId: number, contentId: number}) => {
    const save = await prisma.save.findFirst({
        where: {
            userId,
            contentId
        }
    })

    if(!save) {
        return
    }

    const unsave = await prisma.save.delete({
        where:{
            id : save.id
        }
    })

    if(!unsave) {
        return {
            data: null,
            error: "something went wrong"
        }
    }

    return {
        data: 'unsave',
        error: null
    };
}

export const isSaved = async({userId, contentId}: {userId: number, contentId: number}) => {

    const isSave = await prisma.save.findFirst({
        where: {
            userId,
            contentId
        }
    })

    if (!isSave) {
        return {
            data: null,
            status: false
        }
    }


    return {
        data: isSave,
        status: true
    }
}