"use server"

import { supabase } from "../dataStorage/bucket"
import { prisma } from "../dataStorage/db"

export interface IContent {
    id: number,
    uploaderId: number,
    caption: string,
    url: string,
    createdAt: Date,
    updatedAt: Date,
    uploader: {
        username: string
    }
}

export interface IContentByUser {

}

export const uploadContent = async ({ formData, uploaderId }: { formData: FormData, uploaderId: number }) => {

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

    if (uploadContent.error) {
        throw new Error(uploadContent.error.message)
    }


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


export const getAllContent = async () => {
    const contents: IContent[] = await prisma.content.findMany({
        include: {
            uploader: {
                select: {
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

// export const getContentByUser = async ({username} : {username : string}) => {
//     const contentByUser: any[] = await prisma.user.findMany({
//         where: {
//             username
//         }

//     })

//     console.log(contentByUser)
// }

