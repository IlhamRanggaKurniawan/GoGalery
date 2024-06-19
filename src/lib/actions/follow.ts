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

    if (!isFollow) {
        return {
            data: null,
            status: false
        }
    }

    return {
        data: isFollow,
        status: true
    }
}




export const follow = async ({ followerId, followingId }: { followerId: number, followingId: number }) => {

    const follow = await prisma.follow.create({
        data: {
            followerId,
            followingId
        },
        include: {
            follower: {

            }
        }
    })

    if (!follow) {
        return {
            data: null,
            error: "something went wrong"
        }
    }

    await prisma.notification.create({
        data: {
            userId: followingId,
            type: "follow",
            content: `${follow.follower.username} follow you`
        }
    })

    await createNotification({
        receiverId: followingId,
        type: "follow",
        content: `${follow.follower.username} follow you`,
        senderId: follow.followerId
    })

    return {
        data: follow,
        error: null
    }
}


export const unfollow = async ({ id }: { id: number }) => {
    const unfollow = await prisma.follow.delete({
        where: {
            id
        }
    });

    if (!unfollow) {
        return {
            data: null,
            error: "something went wrong"
        }
    }

    return {
        data: 'unfollowed',
        error: null
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

    return { follower, following }
}
