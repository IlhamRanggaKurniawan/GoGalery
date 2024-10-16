"use client"

import React, { FormEvent, useState } from 'react'
import FormField from './FormField'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { registerSchema } from '@/lib/validation'


const RegisterForm = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const router = useRouter()

    const register = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            if (!username || !password) return;
            const { error } = registerSchema.validate({
                username,
                email,
                password,
                confirmPassword
            }, { abortEarly: true })

            if (error) return setError(error.message)

            setLoading(true);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/user`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    confirmPassword
                })
            })

            const responseJSON = await response.json()

            if (!response.ok) {
                throw new Error(responseJSON.error);
            }

            router.push("/")

            localStorage.setItem("AccessToken", responseJSON.AccessToken);

        } catch (error) {
            setError("register failed: " + error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <form className="w-96 px-4 flex flex-col gap-3" onSubmit={register}>
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl font-semibold text-center">GoGalery</h1>
                    <Separator className="my-1" />
                </div>
                <div>
                    <label htmlFor="password">Username</label>
                    <FormField placeholder="Username" type="text" handleChange={setUsername} value={username} id="username" required />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <FormField placeholder="email" type="email" handleChange={setEmail} value={email} id="email" required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <FormField placeholder="Password" type="password" handleChange={setPassword} value={password} id="password" required />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <FormField placeholder="confirm Password" type="password" handleChange={setConfirmPassword} value={confirmPassword} id="confirmPassword" required />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <Button className="w-full" type="submit" disabled={loading}>
                        Sign Up
                    </Button>
                    <p className='text-red-500 '>{error}</p>
                    <p className="text-sm">Already have an account? <Link href="/login" className="text-yellow-400">Sign In</Link></p>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm