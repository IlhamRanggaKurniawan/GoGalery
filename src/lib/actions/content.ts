"use server"

// import { revalidatePath } from "next/cache"
import  supabase  from "../dataStorage/bucket"
import  prisma  from "../dataStorage/db"

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

export interface IContentByUser {

}

export const uploadContent = async ({ formData, uploaderId, revalidate }: { formData: FormData, uploaderId: number, revalidate: string }) => {

    const file = formData.get("file")
    const caption = formData.get("caption") as string

    if (!file || !(file instanceof File) || file.size === 0 || !caption) {
        throw new Error("Please fill all the fields and provide a non-empty file")
    }

    const date = Date.now()
    const fileExtension = file.name.split('.').pop();
    const path = `Content/${date}${file.size}.${fileExtension}`

    const [uploadContent, content] = await Promise.all([
        supabase.storage.from("Connect Verse").upload(path, file),
        prisma.content.create({
            data: {
                uploaderId,
                caption,
                url: `https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/${path}`
            }
        })
    ])

    console.log("halo")

    if (uploadContent.error) {
        console.log(uploadContent.error)
        throw new Error(uploadContent.error.message)
    }


    if (!content) {
        console.log("here")
        throw new Error("something went wrong")
    }

    return {
        error: false,
        message: "Content uploaded successfully",
        statusCode: 200,
        content
    };

}


export const getAllContent = async () => {

    const contents: IContent[] = await prisma.content.findMany({
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



    return contents
}

export const getContentByUsername = async (username : string) => {
    const contents: IContent[] = await prisma.content.findMany({
        where: {
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
            createdAt: "desc"
        }
    }) 

    if (!contents) {
        return
    }

    return contents
}

export const getContentById = async (id : number) => {
    const contents: IContent | null = await prisma.content.findFirst({
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
        }
    }) 

    if (!contents) {
        return
    }

    return contents
}

export const getChainingContent = async ({id} : {id: number}) => {
    const contents: any[] = await prisma.content.findMany({
        where: {
            NOT: {
                id
            }
        },
        include: {
            uploader: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    })

    if(!contents) {
        return
    }

    return contents
}

