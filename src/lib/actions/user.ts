"use server"

import { hash } from "bcrypt"
import prisma from "../dataStorage/db"

export const updateProfile = async ({ id, data }: { id: number, data: any }) => {
    const updateData = data

    if (data.password) {
        const hashedPassword = await hash(data.password, 10);
        updateData.password = hashedPassword;
    }

    const user = await prisma.user.update({
        where: {
            id
        },
        data: {
            ...updateData
        }
    })

    if (!user) return

    return user
}

export const deleteAccount = async ({id, username}: {id: number, username: string}) => {
    await prisma.user.delete({
        where: {
            id,
            username
        }
    })
}

export const findUser = async ({ username }: { username: string }) => {
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
        },
        select: {
            id: true,
            username: true
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
                    content: true
                }
            },
            content: {
                orderBy: {
                    createdAt: "desc"
                }
            }
        },
    })

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

export const getUserWefollow = async ({ id, username }: { id: number, username: string }) => {
    const users = await prisma.user.findMany({
        where: {
            following: {
                some: {
                    followerId: {
                        equals: id
                    }
                }
            },
            username: {
                contains: username
            }
        },
        select: {
            id: true,
            username: true
        }
    })

    const randomUsers = await prisma.user.findMany({
        where: {
            username: {
                contains: username
            },
            id: {
                notIn: users.map(user => user.id)
            }
        },
        select: {
            id: true,
            username: true
        }
    })

    return { users, randomUsers }
}

export const getMutualFollowers = async ({ id, username }: { id: number, username: string }) => {
    const mutualFollowers = await prisma.user.findMany({
        where: {
            following: {
                some: {
                    followerId: id
                }
            },
            followers: {
                some: {
                    followingId: id
                }
            },
            username: {
                contains: username
            }
        },
        select: {
            id: true,
            username: true
        }
    });

    if (!mutualFollowers) return

    return mutualFollowers;
}