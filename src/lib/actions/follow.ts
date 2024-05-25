"use server"

import prisma from "../dataStorage/db"

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




export const follow  = async ({ followerId, followingId }: { followerId: number, followingId: number }) => {

    const createFollow = await prisma.follow.create({
        data: {
            followerId,
            followingId
        }
    })

    if (!createFollow) {
        return {
            data: null,
            error: "something went wrong"
        }
    }

    return {
        data: "followed",
        error: null
    }
}


export const unfollow = async ({id} : {id: number}) => {
    const unfollow = await prisma.follow.delete({
        where: {
            id
        }
    });

    if(!unfollow) {
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
