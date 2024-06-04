"use server"

import prisma from "../dataStorage/db"
import { createNotification } from "./notification"

export interface IComment {
    id: number,
    contentId: number,
    userId: number,
    text: string,
    createdAt: Date,
    updatedAt: Date,
    user: {
        id: number,
        username: string
    },
    content: {
        uploader: {
            username: string,
            role: string
        }
    }
}


export const sendComment = async ({ userId, contentId, text }: { userId: number, contentId: number, text: string }) => {
    const comment = await prisma.comment.create({
        data: {
            userId,
            contentId,
            text
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                }
            },
            content: {
                select: {
                    uploader: {
                        select: {
                            id: true,
                            username: true,
                            role: true
                        }
                    }
                }
            }
        }
    })

    if (!comment) {
        return
    }

    await createNotification({
        receiverId: comment.content.uploader.id,
        type: "comment",
        content: `${comment.user.username} comment on your post`,
        senderId: comment.userId
    })

    return comment
}

export const updateComment = async ({ commentId, text }: { commentId: number, text: string }) => {
    const comment = await prisma.comment.update({
        where: {
            id: commentId
        },
        data: {
            text
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                }
            },
            content: {
                select: {
                    uploader: {
                        select: {
                            username: true,
                            role: true
                        }
                    }
                }
            }
        }
    })

    if (!comment) {
        return
    }

    return comment
}

export const deleteComment = async ({ commentId }: { commentId: number }) => {
    const comment = await prisma.comment.delete({
        where: {
            id: commentId
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                }
            },
            content: {
                select: {
                    uploader: {
                        select: {
                            username: true,
                            role: true
                        }
                    }
                }
            }
        }
    })

    if (!comment) {
        return
    }

    return comment
}

export const getComments = async ({ contentId }: { contentId: number }) => {
    const comments = await prisma.comment.findMany({
        where: {
            contentId
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                }
            },
            content: {
                select: {
                    uploader: {
                        select: {
                            username: true,
                            role: true
                        }
                    }
                }
            }
        }
    })

    if (!comments) {
        return
    }

    return comments
}