"use server"

import prisma from "../dataStorage/db"

export const sendFeedback = async ({id, message}: {id: number, message: string}) => {
    const feedback = await prisma.feedback.create({
        data: {
            userId: id,
            message
        }
    })

    if(feedback) return

    return feedback
}