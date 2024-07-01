"use server"

import prisma from "../dataStorage/db"
import { createNotification } from "./notification"

export const isFollowing = async ({ followerId, followingId }: { followerId: number, followingId: number }) => {

    const isFollow = await prisma.follow.findFirst({
        where: {
            followerId,
            followingId
        }
    })

    return {
        data: isFollow,
        statusCode: 200,
    };
}

export const follow = async ({ followerId, followingId }: { followerId: number, followingId: number }) => {

    const follow = await prisma.follow.create({
        data: {
            followerId,
            followingId
        },
        include: {
            follower: {
                select: {
                    id: true,
                    username: true,
                    profileUrl: true
                }
            }
        }
    })

    if (!follow) {
        return {
            error: "something went wrong",
            statusCode: 500
        }
    }

    await createNotification({
        receiverId: followingId,
        type: "follow",
        content: "following you",
        senderId: follow.followerId
    })

    return {
        data: follow,
        statusCode: 200,
    };
}


export const unfollow = async ({ id }: { id: number }) => {
    const unfollow = await prisma.follow.delete({
        where: {
            id
        }
    });

    if (!unfollow) {
        return ({
            error: "something went wrong",
            statusCode: 500
        })
    }

    return {
        data: unfollow,
        statusCode: 200,
    };
}

export const countFollow = async ({ userId }: { userId: number }) => {
    const follower = await prisma.follow.count({
        where: {
            followingId: userId
        }
    })

    const following = await prisma.follow.count({
        where: {
            followerId: userId
        }
    })

    return {
        data: { follower, following },
        statusCode: 200,
    };
}
