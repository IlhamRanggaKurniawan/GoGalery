import prisma from "../dataStorage/db"

export const sendComment = async({userId, contentId, text}: {userId: number, contentId:number, text: string}) => {
    const comment = await prisma.comment.create({
        data: {
            userId,
            contentId,
            text
        }
    })

    if(!comment) {
        return
    }

    return comment
}

export const updateComment = async({commentId, text}: {commentId: number, text:string}) => {
    const comment = await prisma.comment.update({
        where: {
            id: commentId
        },
        data: {
            text
        }
    })

    if(!comment) {
        return
    }

    return comment
}

export const deleteComment = async({commentId}: {commentId : number}) => {
    const comment = await prisma.comment.delete({
        where: {
            id: commentId
        }
    })

    if(!comment) {
        return
    }

    return comment
}