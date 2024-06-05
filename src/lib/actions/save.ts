"use server"

import prisma from "../dataStorage/db"

export const saveContent = async ({ userId, contentId }: { userId: number, contentId: number }) => {
    const save = await prisma.saveContent.create({
        data: {
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

export const unsaveContent = async ({ userId, contentId }: { userId: number, contentId: number }) => {
    const save = await prisma.saveContent.findFirst({
        where: {
            userId,
            contentId
        }
    })

    if (!save) {
        return
    }

    const unsave = await prisma.saveContent.delete({
        where: {
            id: save.id
        }
    })

    if (!unsave) {
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

export const isSaved = async ({ userId, contentId }: { userId: number, contentId: number }) => {

    const isSave = await prisma.saveContent.findFirst({
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

export const getSavedContent = async ({ username, cursor, pageSize }: { username: string, cursor?: number, pageSize: number }) => {
    const savedContents = await prisma.saveContent.findMany({
        take: pageSize,
        cursor: cursor ? { id: cursor } : undefined,
        skip: cursor ? 1 : 0,
        where: {
            user: {
                username
            }
        },
        select: {
            content: {
                include: {
                    uploader: {
                        select: {
                            id: true,
                            username: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    if(!savedContents) {
        return
    }
    const contents = savedContents.map(save => ({
        id: save.content.id,
        uploaderId: save.content.uploaderId,
        caption: save.content.caption,
        url: save.content.url,
        createdAt: save.content.createdAt,
        updatedAt: save.content.updatedAt,
        uploader: {
            id: save.content.uploader.id,
            username: save.content.uploader.username
        }
    }));

    const nextCursor = contents.length === pageSize ? contents[contents.length - 1].id : null

    return { contents, nextCursor };
}