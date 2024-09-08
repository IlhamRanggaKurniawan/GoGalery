"use client"

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import apiClient from '@/lib/apiClient'
import useEffectAfterMount from '@/lib/hooks/useEffectAfterMount'
import { useSession } from '@/lib/hooks/useSession'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDebounce } from 'use-debounce'
import AccountPreview from '../AccountPreview'
import { IUserPreview } from '../../../../types/entity'

const CreateDirectMessageDialog = ({ children }: { children: React.ReactNode }) => {
    const [search, setSearch] = useState("")
    const [users, setUsers] = useState<IUserPreview[]>([])
    const [debouncedSearch] = useDebounce(search, 300)

    const { user: session } = useSession()
    const router = useRouter()

    const findUsers = async () => {
        try {
            if(!search) return
            const users = await apiClient.get(`/user/findall/${search}`, { cache: "no-cache" })

            setUsers(users)
        } catch (error) {
            console.error(error)
        }
    }


    const handleClick = async ({ id }: { id: number }) => {
        try {
            if (!session) return
            const existingDM = await apiClient.get(`/dm/findone?participant1Id=${session.id}&participant2Id=${id}`, { cache: "no-cache" })

            if (existingDM) {
                return router.push(`/messages/${existingDM.ID}`)
            }


            const newDM = await apiClient.post(`/dm/create`, {
                body: {
                    participants: [id, session.id]
                },
                cache: "no-cache"
            })

            router.push(`/messages/${newDM.ID}`)
        } catch (error) {
            console.error(error)
        }
    }

    useEffectAfterMount(() => {
        findUsers()
    }, [debouncedSearch])

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className="h-[460px] flex flex-col gap-2">
                <div className="flex justify-between">
                    <DialogHeader className=" font-medium">Send a new message</DialogHeader>
                    <DialogClose className="flex flex-col gap-2">
                        <X />
                    </DialogClose>
                </div>
                <Separator className=" bg-black" />
                <Input type="text" placeholder="Search.." onChange={(e) => setSearch(e.target.value)} />
                <div className="h-[380px] overflow-y-auto">
                    {search.length === 0 && users.length === 0 && <div className="text-center">Search for user</div>}
                    {users?.map((user) => {
                        if (user.ID === session?.id) return
                        return (
                            <button onClick={() => handleClick({ id: user.ID })} className="w-full text-left" key={user.ID}>
                                <AccountPreview username={user.Username} profilePicture={user.ProfileUrl} />
                            </button>
                        );
                    })}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateDirectMessageDialog