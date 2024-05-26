"use server"

import prisma from "../dataStorage/db"

export const findUser = async ({username} : {username: string}) => {
    const users = await prisma.user.findMany({
        where: {
            username: {
                contains: username
            }
        },
        orderBy: {
            followers: {
                _count: "desc"
            }
        }
    })

    return users
}

export const getUserProfile = async (username: string) => {
    const user = await prisma.user.findUnique({
        where: {
            username
        },
        include: {
            _count: {
                select: {
                    followers: true,
                    content: true,
                    following: true
                }
            },
            content: {
                orderBy: {
                    createdAt: "desc"
                }
            }
        },
    })

    // console.log(user)

    if (!user) {
        return ({
            error: "user not found",
            data: null
        })
    }

    return ({
        error: null,
        data: user
    })
}

