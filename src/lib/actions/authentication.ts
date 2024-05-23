"use server"

import  prisma  from "../dataStorage/db"
import bcrypt from "bcrypt"

interface RegisterParams {
    username: string;
    email: string;
    password: string;
    confPassword: string;
}

const register = async ({ username, email, password, confPassword }: RegisterParams) => {

    if (!username || !email || !password || !confPassword) {
        return ({
            error: true,
            message: "please fill all the fields",
            statusCode: 400
        })
    }

    const [existingUsername, existingEmail] = await Promise.all([
        prisma.user.findUnique({ where: { username } }),
        prisma.user.findUnique({ where: { email } }),
    ]);

    if (existingEmail || existingUsername) {
        return ({
            error: true,
            message: "email or username already exists",
            statusCode: 409
        })
    }

    if (password !== confPassword) {
        return ({
            error: true,
            message: "password doesn't match",
            statusCode: 400
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
            error: true,
            message: "failed to register",
            statusCode: 500
        })
    } 

    return ({
        error: false,
        message: "register success",
        statusCode: 200
    })

}



export default register
