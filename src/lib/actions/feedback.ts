"use server"

import prisma from "../dataStorage/db"

export const sendFeedback = async ({id, message}: {id: number, message: string}) => {
    const feedback = await prisma.feedback.create({
        data: {
            userId: id,
            message
        }
    })

    if(!feedback) {
        return({
            error: "something went wrong",
            statusCode: 500
        })
    }

    return {
        data: feedback,
        statusCode: 200,
    };
}