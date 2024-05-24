"use server"

import  prisma  from "../dataStorage/db"

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

export const getUserProfie = async (username : string) => {
    const user = await prisma.user.findUnique({
        where: {
            username
        },
        include: {
            content: {
                orderBy: {
                    createdAt: "desc"
                }
            }
        },
    })

    if(!user) {
        return ({
            error: "user not found",
            data: null
        })
    }

    console.log(user)
    

    return ({
        error: null,
        data: user
    })
}

