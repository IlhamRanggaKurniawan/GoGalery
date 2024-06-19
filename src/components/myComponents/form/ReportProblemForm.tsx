"use client"

import { Button } from '@/components/ui/button'
import { sendFeedback } from '@/lib/actions/feedback'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

const ReportProblemForm = () => {
    const {data: session} = useSession()
    const [feedback, setFeedback] = useState("")

    const handleSubmit = async () => {
        if(!session) return

        await sendFeedback({id: session.user.id, message: feedback})
    }

  return (
    <form className="py-5 px-6 sm:py-10 sm:px-10 flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
        <h2 className="font-medium text-lg mb-2">Give us feedback</h2>
        <textarea placeholder="feedback / problem" className="rounded-xl w-full p-3 border-2 border-secondary resize-none h-32" onChange={(e) => setFeedback(e.target.value)} required/>
        <div className="flex justify-end">
            <Button  className="max-w-24">Submit</Button>
        </div>
      </form>
  )
}

export default ReportProblemForm