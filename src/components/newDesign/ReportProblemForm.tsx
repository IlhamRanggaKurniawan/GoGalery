"use client"

import React, { useState } from 'react'
import Button from './Button'
import apiClient from '@/lib/apiClient'
import { useSession } from '@/lib/hooks/useSession'
import { useRouter } from 'next/navigation'

const ReportProblemForm = () => {
    const { user } = useSession()
    const [feedback, setFeedback] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()

            const response = await apiClient.post(`/feedback/create/${user?.id}`, {
                body: {
                    message: feedback
                },
                cache: "no-cache"

            })

            router.push(`/profile/${user?.username}`)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form className='m-4' onSubmit={handleSubmit}>
            <div className='px-4 mb-4'>
                <label className="px-2 mb-1" htmlFor='bio'>Feedback</label>
                <textarea placeholder="feedback" className="rounded-xl w-full p-3 border-2 border-muted resize-none h-32" id='bio' value={feedback} onChange={(e) => setFeedback(e.target.value)} />
            </div>
            <div className='px-4 w-full'>
                <Button className='bg-primary rounded-2xl'>
                    <p className='text-background'>Send Feedback</p>
                </Button>
            </div>
        </form>
    )
}

export default ReportProblemForm