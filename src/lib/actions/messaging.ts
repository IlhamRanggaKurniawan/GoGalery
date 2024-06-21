"use server"

import prisma from "../dataStorage/db"
import pusher from "../pusher"
import { IUserPreview } from "./user"

export interface IMessage {
    id: number,
    senderId: number,
    message: string
}

export interface IContact {
    id: number,
    participants: IUserPreview[],
    createdAt: Date
}

export interface IGroup {
    id: number,
    name: string,
    pictureUrl: string | null,
    createdAt: Date
}

export const sendMessage = async ({ message, senderId, directMessageId, groupId }: { message: string, senderId: number, directMessageId?: number, groupId?: number }) => {

    const chat = directMessageId ? await prisma.message.create({
        data: {
            senderId,
            message,
            directMessageId
        }
    }) : await prisma.message.create({
        data: {
            senderId,
            message,
            groupChatId: groupId
        }
    });

    if (!chat) {
        return {
            error: "something went wrong",
            statusCode: 500
        }
    }

    pusher.trigger(directMessageId ? `dm-${directMessageId}` : `group-${groupId}`, 'new-message', {
        id: chat.id,
        senderId,
        message,
    });

    return {
        data: chat,
        statusCode: 200
    }
}

export const deleteMessage = async ({ id }: { id: number }) => {
    const chat = await prisma.message.delete({
        where: {
            id
        }
    })

    if (!chat) {
        return {
            error: "something went wrong",
            statusCode: 500
        }
    }


    pusher.trigger(chat.directMessageId ? `dm-${chat.directMessageId}` : `group-${chat.groupChatId}`, 'delete-message', {
        id
    });

    return {
        data: chat,
        statusCode: 200
    }
}

export const createGroup = async ({ name, member }: { name: string, member: IUserPreview[] }) => {
    const group = await prisma.groupChat.create({
        data: {
            name,
            member: {
                connect: member.map(user => ({ id: user.id }))
            }
        }
    })

    if (!group) {
        return {
            error: "something went wrong",
            statusCode: 500
        }
    }

    return {
        data: group,
        statusCode: 200
    }
}

export const createDM = async ({ participants }: { participants: { id: number }[] }) => {
    const DM = await prisma.directMessage.create({
        data: {
            participants: {
                connect: participants.map(user => ({ id: user.id }))
            }
        }
    })

    if (!DM) {
        return {
            error: "something went wrong",
            statusCode: 500
        }
    }

    return {
        data: DM,
        statusCode: 200
    }
}

export const getDirectMessageData = async ({ directMessageId }: { directMessageId: number }) => {

    const data = await prisma.directMessage.findUnique({
        where: {
            id: directMessageId
        },
        include: {
            message: true,
            participants: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    })

    if (!data) {
        return {
            error: "direct message not found",
            statusCode: 500
        }
    }


    return {
        data,
        statusCode: 200
    }
}

export const getContacts = async ({ userId }: { userId: number }) => {
    const DM = await prisma.directMessage.findMany({
        where: {
            participants: {
                some: {
                    id: userId
                }
            }
        },
        include: {
            participants: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    })

    return {
        data: DM,
        statusCode: 200
    }
}

export const getGroup = async ({ userId }: { userId: number }) => {
    const group = await prisma.groupChat.findMany({
        where: {
            member: {
                some: {
                    id: userId
                }
            }
        }
    })

    return {
        data: group,
        statusCode: 200
    }
}

export const getGroupData = async ({ groupChatId }: { groupChatId: number }) => {
    const group = await prisma.groupChat.findUnique({
        where: {
            id: groupChatId
        },
        include: {
            message: true,
            member: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    })

    if (!group) {
        return ({
            error: "something went wrong",
            statusCode: 500
        })
    }

    return {
        data: group,
        statusCode: 200
    }
}

export const checkExistingDM = async ({ participantIDs }: { participantIDs: number[] }) => {
    const dm = await prisma.directMessage.findFirst({
        where: {
            participants: {
                every: {
                    id: {
                        in: participantIDs
                    }
                }
            }
        }
    })

    return {
        data: dm,
        statusCode: 200
    }
}

export const addMembers = async ({ members, groupId }: { members: { id: number }[], groupId: number }) => {
    const group = await prisma.groupChat.update({
        where: {
            id: groupId
        },
        data: {
            member: {
                connect: members.map((member) => ({ id: member.id }))
            }
        },
    })

    if (!group) {
        return ({
            error: "something went wrong",
            statusCode: 500
        })
    }

    return {
        data: group,
        statusCode: 200
    }
}

export const getGroupMembers = async ({ id }: { id: number }) => {
    const group = await prisma.groupChat.findUnique({
        where: {
            id
        },
        select: {
            member: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    })

    if (!group) {
        return ({
            error: "something went wrong",
            statusCode: 500
        })
    }

    return {
        data: group.member,
        statusCode: 200
    }
}

export const leaveGroup = async ({ userId, groupId }: { userId: number, groupId: number }) => {
    const group = await prisma.groupChat.update({
        where: {
            id: groupId
        },
        data: {
            member: {
                disconnect: {
                    id: userId
                }
            }
        }
    })

    if (!group) {
        return ({
            error: "something went wrong",
            statusCode: 500
        })
    }

    return {
        data: group,
        statusCode: 200
    }
}