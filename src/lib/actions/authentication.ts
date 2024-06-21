"use server"

import prisma from "../dataStorage/db"
import bcrypt from "bcrypt"
import { registerSchema } from "../validation";

const register = async ({ username, email, password }: { username: string; email: string; password: string; }) => {

    const { error } = registerSchema.validate({username, email, password});


    if(error) {
        if(error?.details[0].context?.regex) {
            return {
                error: "Username can only contain alphabets, numbers, underscores"
            }
        }

        return {
            error: error.message,
            statusCode: 400
        }
    }

    const [existingUsername, existingEmail] = await Promise.all([
        prisma.user.findUnique({ where: { username } }),
        prisma.user.findUnique({ where: { email } }),
    ]);

    if (existingEmail || existingUsername) {
        return ({
            error: "email or username already exists",
            statusCode: 409
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        }
    })

    if (!user) {
        return ({
            error: "failed to register",
            statusCode: 500
        })
    }

    return ({
        data: user,
        statusCode: 200
    })

}

export default register
