"use server"

import prisma from "../dataStorage/db"

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

    console.log(mutualFollowers)

    if(!mutualFollowers) return

    return mutualFollowers;
}