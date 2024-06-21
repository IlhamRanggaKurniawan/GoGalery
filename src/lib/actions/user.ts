"use server"

import { hash } from "bcrypt"
import prisma from "../dataStorage/db"

export interface IUserPreview {
    id: number,
    username: string
}

export const updateProfile = async ({ id, data }: { id: number, data: {password?: string, bio?: string} }) => {
    if (data.password) {
        const hashedPassword = await hash(data.password, 10);
        data.password = hashedPassword;
    }

    const user = await prisma.user.update({
        where: {
            id
        },
        data: {
            ...data
        }
    })

    if (!user) {
        return {
            error: "something went wrong",
            statusCode: 500
        }
    }

    return {
        data: user,
        statusCode: 200
    }
}

export const deleteAccount = async ({ id, username }: { id: number, username: string }) => {
    const user = await prisma.user.delete({
        where: {
            id,
            username
        }
    })

    if(!user) {
        return{
            error: "something went wrong",
            statusCode: 500
        }
    }

    return {
        data: user,
        statusCode: 200
    }
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

    return {
        data: users,
        statusCode: 200
    }
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
        return{
            error: "user not found",
            statusCode: 400
        }
    }

    return ({
        data: user,
        statusCode: 200
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

    return {
        data: {users, randomUsers},
        statusCode: 200
    }
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

    return {
        data: mutualFollowers,
        statusCode: 200
    };
}