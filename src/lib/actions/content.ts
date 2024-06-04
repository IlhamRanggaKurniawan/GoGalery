"use server"

// import { revalidatePath } from "next/cache"
import supabase from "../dataStorage/bucket"
import prisma from "../dataStorage/db"

export interface IContent {
    id: number,
    uploaderId: number,
    caption: string,
    url: string,
    createdAt: Date,
    updatedAt: Date,
    uploader: {
        id: number,
        username: string
    }
}

export const uploadContent = async ({ formData, uploaderId }: { formData: FormData, uploaderId: number }) => {

    const file = formData.get("file") as File
    const caption = formData.get("caption") as string

    if (!file || file.size === 0 || !caption) {
        throw new Error("Please fill all the fields and provide a non-empty file")
    }

    const date = Date.now()
    const fileExtension = file.name.split('.').pop();
    const path = `Content/${date}${file.size}.${fileExtension}`

    const picture = await supabase.storage.from("Connect Verse").upload(path, file)

    if (!picture || picture.error) {
        console.log(picture.error)
        throw new Error(picture.error.message)
    }

    const content = await prisma.content.create({
        data: {
            uploaderId,
            caption,
            url: `https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/${path}`
        }
    })

    if (!content) {
        throw new Error("something went wrong")
    }

    return {
        error: false,
        message: "Content uploaded successfully",
        statusCode: 200,
        content
    };
}


export const getAllContent = async ({ cursor, pageSize }: { cursor?: number, pageSize: number }) => {

    const contents: IContent[] = await prisma.content.findMany({
        take: pageSize,
        cursor: cursor ? { id: cursor } : undefined,
        skip: cursor ? 1 : 0,
        orderBy: {
            id: "desc"
        },
        include: {
            uploader: {
                select: {
                    id: true,
                    username: true,
                }
            }
        }
    })

    if (!contents) {
        throw new Error("something went wrong")
    }

    const nextCursor = contents.length === pageSize ? contents[contents.length - 1].id : null

    return { contents, nextCursor }
}

export const getContentByUsername = async ({ accountUsername, cursor, pageSize }: { accountUsername: string, cursor?: number, pageSize: number }) => {

    const contents: IContent[] = await prisma.content.findMany({
        take: pageSize,
        cursor: cursor ? { id: cursor } : undefined,
        skip: cursor ? 1 : 0,
        where: {
            uploader: {
                username: accountUsername
            }
        },
        orderBy: {
            id: "desc"
        },
        include: {
            uploader: {
                select: {
                    id: true,
                    username: true
                }
            }
        },
    });

    if (!contents) {
        throw new Error("something went wrong")
    }

    const nextCursor = contents.length === pageSize ? contents[contents.length - 1].id : null

    return { contents, nextCursor };
};



export const getContentById = async ({ id }: { id: number, }) => {
    const content: IContent | null = await prisma.content.findUnique({
        where: {
            id
        },
        include: {
            uploader: {
                select: {
                    id: true,
                    username: true
                }
            }
        },
    })

    if (!content) {
        return
    }

    return content
}

export const profileChainingContent = async ({ id, username, pageSize, cursor }: { id: number, username: string, pageSize: number, cursor?: number }) => {
    const contents: IContent[] | null = await prisma.content.findMany({
        take: pageSize,
        cursor: cursor ? { id: cursor } : undefined,
        skip: cursor ? 1 : 0,
        where: {
            id: {
                lt: id
            },
            uploader: {
                username
            }
        },
        include: {
            uploader: {
                select: {
                    id: true,
                    username: true
                }
            }
        },
        orderBy: {
            id: "desc"
        }
    })

    if (!contents) {
        return
    }

    const nextCursor = contents.length === pageSize ? contents[contents.length - 1].id : null

    return { contents, nextCursor };
}

export const exploreChainingContent = async ({ pageSize, cursor, id }: { pageSize: number, cursor?: number, id: number }) => {
    const contents: IContent[] | null = await prisma.content.findMany({
        take: pageSize,
        cursor: cursor ? { id: cursor } : undefined,
        skip: cursor ? 1 : 0,
        where: {
            id: {
                not: id
            }
        },
        include: {
            uploader: {
                select: {
                    id: true,
                    username: true
                }
            }
        },
        orderBy: {
            id: "desc"
        }
    })

    if (!contents) {
        return
    }

    const nextCursor = contents.length === pageSize ? contents[contents.length - 1].id : null

    return { contents, nextCursor };
}

export const getContentByFollowing = async ({ userId, cursor, pageSize }: { userId: number, cursor?: number, pageSize: number }) => {

    const contents = await prisma.content.findMany({
        take: pageSize,
        cursor: cursor ? { id: cursor } : undefined,
        skip: cursor ? 1 : 0,
        where: {
            uploader: {
              following: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
        include: {
            uploader: {
                select: {
                    id: true,
                    username: true
                }
            }
        },
        orderBy: {
            id: "desc"
        },
    })

    const nextCursor = contents.length === pageSize ? contents[contents.length - 1].id : null

    return { contents, nextCursor };
}

export const savedChainingContent = async ({ pageSize, cursor, id, username }: { pageSize: number, cursor?: number, id: number, username: string }) => {
    const contents: IContent[] | null = await prisma.content.findMany({
        take: pageSize,
        cursor: cursor ? { id: cursor } : undefined,
        skip: cursor ? 1 : 0,
        where: {
            id: {
                not: id
            },
            Save: {
                some: {
                    user: {
                        username
                    }
                }
            }
        },
        include: {
            uploader: {
                select: {
                    id: true,
                    username: true
                }
            }
        },
        orderBy: {
            id: "desc"
        }
    })

    if (!contents) {
        return
    }
    const nextCursor = contents.length === pageSize ? contents[contents.length - 1].id : null

    return { contents, nextCursor };
}