"use server"

import { prisma } from "../dataStorage/db"
import bcrypt from "bcrypt"


const register = async (formData: FormData) => {

    const username = formData.get("username") as string | null
    const email = formData.get("email") as string | null
    const password = formData.get("password") as string | null
    const confPassword = formData.get("confPassword") as string | null

    if (!username || !email || !password || !confPassword) {
        throw new Error("please fill all the fields")
    }
    
    try {
        const [existingUsername, existingEmail] = await Promise.all([
            prisma.user.findUnique({ where: { username } }),
            prisma.user.findUnique({ where: { email } }),
        ]);

        if(existingEmail || existingUsername ) {
            throw new Error("email or username already used")
        }

        if(password !== confPassword ) {
            throw new Error("password doesn't match")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })

        console.log(user)

        return user
    } catch (error) {
        console.log(error)
    }
}

export default register