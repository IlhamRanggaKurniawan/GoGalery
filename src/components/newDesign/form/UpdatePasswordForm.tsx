"use client"

import React, { useState } from 'react'
import { useSession } from '@/lib/hooks/useSession'
import apiClient from '@/lib/apiClient'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const UpdatePasswordForm = () => {
    const [password, setPassword] = useState("")
    const [confPassword, setConfPassword] = useState("")
    const { user } = useSession()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()

            if (password !== confPassword) return

            const formData = new FormData()

            formData.append("password", password)
            
            const data = await apiClient.patch(`/v1/user`, {
                body: formData,
                cache: "no-cache"
            })

            router.push(`/profile/${data.Username}`)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form className="m-4 flex flex-col gap-3" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="password">New Password</label>
                <Input onChange={(e) => setPassword(e.target.value)} placeholder="New Password" value={password} type="password" id="password" className="border border-slate-300 " />
            </div>
            <div>
                <label htmlFor="confPassword">Confirm Password</label>
                <Input onChange={(e) => setConfPassword(e.target.value)} placeholder="Confirm Password" value={confPassword} type="password" id="confPassword" className="border border-slate-300" />
            </div>
            <Button className="bg-primary rounded-2xl">
                <p className="text-background">Update</p>
            </Button>
        </form>
    )
}

export default UpdatePasswordForm