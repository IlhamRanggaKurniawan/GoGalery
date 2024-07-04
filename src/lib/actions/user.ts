"use server"

import { hash } from "bcrypt"
import prisma from "../dataStorage/db"
import { updateImage, uploadImage } from "./content"
import supabase from "../dataStorage/bucket"

export interface IUserPreview {
    id: number,
    username: string,
    profileUrl: string | null
}

export const updateProfile = async ({ id, input, formData }: { id: number, input: { password?: string, bio?: string, profileUrl?: string }, formData?: FormData }) => {

    if (formData) {
        if (input.profileUrl) {
            const path = input.profileUrl.split("/").pop()

            if (!path) {
                return {
                    error: "something went wrong",
                    statusCode: 500
                }
            }

            const { data: image } = await updateImage({ formData, path: "Profile%20Picture/" + path })

            input.profileUrl = `https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/${image}`
        } else {
            const { data } = await uploadImage({ formData, folder: "Profile%20Picture" })

            if (data) input.profileUrl = `https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/${data}`
        }
    }

    if (input.password) {
        const hashedPassword = await hash(input.password, 10);
        input.password = hashedPassword;
    }

    const user = await prisma.user.update({
        where: {
            id
        },
        data: {
            ...input
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
            username: true,
            profileUrl: true
        }
    })

    return {
        data: users,
        statusCode: 200
    }
}

export const getUserProfile = async ({ username }: { username: string }) => {
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
        return {
            error: "user not found",
            statusCode: 400
        }
    }

    return ({
        data: user,
        statusCode: 200
    })
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
            username: true,
            profileUrl: true
        }
    });

    return {
        data: mutualFollowers,
        statusCode: 200
    };
}