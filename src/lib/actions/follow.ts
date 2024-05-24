"use server"

import prisma from "../dataStorage/db"


export const follow = async ({ followerId, followingId }: { followerId: number, followingId: number }) => {

    const isFollowing = await prisma.follow.findFirst({
        where: {
            followerId,
            followingId
        }
    })

    if (isFollowing) {
        const id = isFollowing?.id
        await prisma.follow.delete({
            where: {
                id
            }
        })

        return null
    }

    const createFollow = await prisma.follow.create({
        data: {
            followerId,
            followingId
        }
    })

    return createFollow
}

