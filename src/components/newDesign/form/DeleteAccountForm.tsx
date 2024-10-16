/* eslint-disable react/no-unescaped-entities */
"use client"

import React, { useState } from 'react'
import Button from '../Button'
import { Input } from '../../ui/input'
import { useSession } from '@/lib/hooks/useSession'
import apiClient from '@/lib/apiClient'
import { useRouter } from 'next/navigation'

const DeleteAccountForm = () => {
    const [username, setUsername] = useState("")
    const [key, setKey] = useState("")
    const { user } = useSession()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()

            if (key !== "delete my account" && username != user?.username) return

            await apiClient.delete(`/v1/user`)

            localStorage.clear()

            router.push("/login")

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form className="m-4 flex flex-col gap-3" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">enter your username</label>
                <Input onChange={(e) => setUsername(e.target.value)} placeholder="username" value={username} type="text" id="username" />
            </div>
            <div>
                <label htmlFor="text">type "<i>delete my account</i>" below:</label>
                <Input onChange={(e) => setKey(e.target.value)} placeholder="delete my account" value={key} type="text" id="text" />
            </div>
            <Button className="bg-red-500 rounded-2xl">
                <p className="text-white">Delete</p>
            </Button>
        </form>
    )
}

export default DeleteAccountForm