"use server"

import { supabase } from "../dataStorage/bucket"
import { prisma } from "../dataStorage/db"

export const upload = async ({ formData, uploaderId }: { formData: FormData, uploaderId: number }) => {

    const file = formData.get("file")
    const caption = formData.get("caption") as string

    if (!file || !(file instanceof File) || file.size === 0 || !caption) {
        return {
            error: true,
            message: "Please fill all the fields and provide a non-empty file",
            statusCode: 400
        };
    }

    const date = Date.now()
    const fileExtension = file.name.split('.').pop();

    const { data, error } = await supabase.storage.from("Connect Verse").upload(`Content/${date}${file.size}.${fileExtension}`, file)

    if (error) {
        return {
            error: true,
            message: error.message,
            statusCode: 400,
        }
    }

    const content = await prisma.content.create({
        data: {
            uploaderId,
            caption,
            url: data.path
        }
    })


    if (!content) {
        return {
            error: true,
            message: "something went wrong",
            statusCode: 500,
        }
    }

    return {
        error: false,
        message: "Content uploaded successfully",
        statusCode: 200,
        content
    };

}
