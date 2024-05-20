"use server"

import { prisma } from "../dataStorage/db"

export const findUser = async (username : string) => {
    const users = await prisma.user.findMany({
        where: {
            username: {
                contains: username
            }
        },
        select: {
            username: true
        }
    })

    return users
}   

