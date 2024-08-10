"use server"

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
        username: string,
        profileUrl: string | null
    }
}

export const uploadImage = async ({ formData, folder }: { formData: FormData, folder: string }) => {
    const file = formData.get("file") as File

    if (!file || file.size === 0) {
        return ({
            error: "Please fill all the fields and provide a non-empty file",
            statusCode: 400
        })
    }

    const date = Date.now()
    const fileExtension = file.name.split('.').pop();
    const path = `${folder}/${date}${file.size}.${fileExtension}`

    const picture = await supabase.storage.from("Connect Verse").upload(path, file)

    if (!picture || picture.error) {
        return ({
            error: picture.error.message,
            statusCode: 400
        })
    }

    return {
        data: path,
        statusCode: 200,
    };
}

export const updateImage = async ({ formData, path }: { formData: FormData, path: string }) => {

    const file = formData.get("file") as File

    if (!file || file.size === 0) {
        return ({
            error: "Please fill all the fields and provide a non-empty file",
            statusCode: 400
        })
    }

    const { data } = await supabase.storage.from("Connect Verse").update(path, file)

    return {
        data: data?.path,
        statusCode: 200
    }
}

export const deleteImage = async ({ path }: { path: string }) => {
    const image = await supabase.storage.from("Connect Verse").remove([path])

    return {
        data: image,
        statusCode: 200
    }
}

export const uploadContent = async ({ formData, uploaderId }: { formData: FormData, uploaderId: number }) => {

    const caption = formData.get("caption") as string

    if (!caption) {
        return ({
            error: "Please fill all the fields and provide a non-empty file",
            statusCode: 400
        })
    }

    const { data, error } = await uploadImage({ formData, folder: "Content" })

    if (!data) {
        return ({
            error,
            statusCode: 500
        })
    }

    const content = await prisma.content.create({
        data: {
            uploaderId,
            caption,
            url: `https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/${data}`
        }
    })

    if (!content) {
        return ({
            error: "Something went wrong",
            statusCode: 500
        })
    }

    return {
        data: content,
        statusCode: 200,
    };
}

export const deleteContent = async ({ id }: { id: number }) => {
    const content = await prisma.content.delete({
        where: {
            id
        }
    })

    const path = "Content/" + content.url.split("/").pop()

    const image = await deleteImage({ path })

    if (!content || !image) {
        return ({
            error: "Something went wrong",
            statusCode: 500
        })
    }

    return {
        data: content,
        statusCode: 200
    }
}

export const getAllContent = async ({ cursor, pageSize }: { cursor?: number, pageSize: number }) => {

    const contents = await prisma.content.findMany({
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
                    profileUrl: true
                }
            }
        }
    })

    const nextCursor = contents.length === pageSize ? contents[contents.length - 1].id : null

    return {
        data: contents,
        statusCode: 200,
        nextCursor
    };
}

export const getContentByUsername = async ({ accountUsername, cursor, pageSize }: { accountUsername: string, cursor?: number, pageSize: number }) => {

    const contents = await prisma.content.findMany({
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
                    username: true,
                    profileUrl: true
                }
            }
        },
    });


    const nextCursor = contents.length === pageSize ? contents[contents.length - 1].id : null

    return {
        data: contents,
        statusCode: 200,
        nextCursor
    };

};



// export const getContentById = async ({ id }: { id: number, }) => {
//     const content = await prisma.content.findUnique({
//         where: {
//             id
//         },
//         include: {
//             uploader: {
//                 select: {
//                     id: true,
//                     username: true,
//                     profileUrl: true
//                 }
//             }
//         },
//     })

//     if (!content) {
//         return ({
//             error: "Content not found",
//             statusCode: 400
//         })
//     }

//     return ({
//         data: content,
//         statusCode: 200
//     })
// }

export const profileChainingContent = async ({ id, username, pageSize, cursor }: { id: number, username: string, pageSize: number, cursor?: number }) => {
    const contents = await prisma.content.findMany({
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
                    username: true,
                    profileUrl: true
                }
            }
        },
        orderBy: {
            id: "desc"
        }
    })

    const nextCursor = contents.length === pageSize ? contents[contents.length - 1].id : null

    return {
        data: contents,
        statusCode: 200,
        nextCursor
    };
}

export const exploreChainingContent = async ({ pageSize, cursor, id }: { pageSize: number, cursor?: number, id: number }) => {
    const contents = await prisma.content.findMany({
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
                    username: true,
                    profileUrl: true
                }
            }
        },
        orderBy: {
            id: "desc"
        }
    })

    const nextCursor = contents.length === pageSize ? contents[contents.length - 1].id : null

    return {
        data: contents,
        statusCode: 200,
        nextCursor
    };
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
                    username: true,
                    profileUrl: true
                }
            }
        },
        orderBy: {
            id: "desc"
        },
    })

    const nextCursor = contents.length === pageSize ? contents[contents.length - 1].id : null

    return {
        data: contents,
        statusCode: 200,
        nextCursor
    };
}

export const savedChainingContent = async ({ pageSize, cursor, id, username }: { pageSize: number, cursor?: number, id: number, username: string }) => {
    const contents = await prisma.content.findMany({
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
                    username: true,
                    profileUrl: true
                }
            }
        },
        orderBy: {
            id: "desc"
        }
    })

    const nextCursor = contents.length === pageSize ? contents[contents.length - 1].id : null

    return {
        data: contents,
        statusCode: 200,
        nextCursor
    };
}