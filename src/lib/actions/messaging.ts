"use server"

import prisma from "../dataStorage/db"
import pusher from "../pusher"

export interface IDM {
    id: number,
    createdAt: Date,
    participants: [
        {
            id: number,
            username: string
        }
    ]
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
        return
    }

    pusher.trigger(directMessageId ? `dm-${directMessageId}` : `group-${groupId}`, 'new-message', {
        id: chat.id,
        senderId,
        message,
        directMessageId,
        groupId
    });

    return chat
}

export const deleteMessage = async ({ id }: { id: number }) => {
    const chat = await prisma.message.delete({
        where: {
            id
        }
    })

    if (!chat) {
        return
    }

    pusher.trigger(chat.directMessageId ? `dm-${chat.directMessageId}`: `dm-${chat.groupChatId}`, 'delete-message', {
        id
    });

    return chat
}

export const createGroup = async ({ name, member }: { name: string, member: any[] }) => {
    const group = await prisma.groupChat.create({
        data: {
            name,
            member: {
                connect: member.map(user => ({ id: user.id }))
            }
        }
    })

    if (!group) {
        return
    }

    return group
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
        return
    }

    return DM
}

export const getDirectMessageData = async ({ directMessageId }: { directMessageId: number }) => {

    const data = await prisma.directMessage.findUnique({
        where: {
            id: directMessageId
        },
        include: {
            message: {},
            participants: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    })

    if (!data) {
        return
    }

    return data
}

export const getDirectMessage = async ({ userId }: { userId: number }) => {
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

    if (!DM) {
        return
    }

    return DM
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

    if (!group) {
        return
    }

    return group
}

export const getGroupData = async ({ groupChatId }: { groupChatId: number }) => {

    const data = await prisma.groupChat.findUnique({
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

    if (!data) {
        return
    }

    return data
}

export const checkExistingDM = async ({participantIDs}: {participantIDs: number[]}) => {
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

    return dm
}

export const addMembers = async ({members, groupId}: {members: {id: number}[], groupId: number}) => {
    const group = await prisma.groupChat.update({
        where: {
            id: groupId
        },
        data: {
            member: {
                connect: members.map((member) => ({id: member.id}))
            }
        },
    })

    if(!group) return

    return group
}

export const getGroupMembers = async ({id}: {id:number}) => {
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

    if(!group) return

    return group.member
}

export const leaveGroup = async ({userId, groupId} : {userId: number, groupId: number}) => {
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

    if(!group) return

    return group
}