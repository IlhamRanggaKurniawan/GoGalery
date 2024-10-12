"use client"

import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import apiClient from '@/lib/apiClient'
import { useDebounce } from 'use-debounce'
import { useSession } from '@/lib/hooks/useSession'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SheetClose } from '@/components/ui/sheet'
import AccountPreview from '../AccountPreview'

const InviteMembersDialog = ({ groupId, children }: { groupId: number, children: React.ReactNode }) => {
    const [users, setUsers] = useState<any[]>([])
    const [search, setSearch] = useState("")
    const [groupMembers, setGroupMembers] = useState<any[]>([])
    const [selectedUsers, setSelectedUsers] = useState<any[]>([])
    const [debouncedSearch] = useDebounce(search, 300)
    const { user } = useSession()

    const handleSelectUser = (user: any) => {
        if (selectedUsers.find((prev) => prev.id === user.id)) {
            return setSelectedUsers(selectedUsers.filter((prev) => prev.id !== user.id));
        }

        setSelectedUsers([...selectedUsers, user]);
    };

    useEffect(() => {
        const getGroupData = async () => {
            const group = await apiClient.get(`/v1/group/${groupId}`, {
                cache: "no-cache"
            })

            setGroupMembers(group.Members)
        }

        getGroupData()
    }, [groupId])

    useEffect(() => {
        const searchMutualUsers = async () => {
            try {
                if (!user?.id) return
                const users = await apiClient.get(`/v1/user/${user?.id}/mutual`, {
                    cache: "no-cache"
                })

                setUsers(users)
            } catch (error) {
                console.error(error)
            }
        }

        searchMutualUsers()
    }, [debouncedSearch, user?.id])

    const addMembers = async () => {
        try {
            if (!groupId) return;

            const group = await apiClient.post(`/v1/group/members/${groupId}`, {
                body: {
                    members: selectedUsers
                },
                cache: "no-cache"
            })

            setGroupMembers(group.Members)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <div className="flex justify-between">
                    <DialogHeader className="font-medium">Invite users</DialogHeader>
                    <DialogClose className="flex flex-col gap-2">
                        <X />
                    </DialogClose>
                </div>
                <Separator className=" bg-black" />
                <Input type="text" placeholder="Add members" onChange={(e) => setSearch(e.target.value)} />
                <div className="h-96 overflow-y-auto">
                    {users.map((user) => {
                        if (groupMembers.some((member) => member.Id === user.Id)) return 
                        const isSelected = selectedUsers.some((selectedUser) => selectedUser.Id === user.Id);

                        return (
                            <button className={`w-full text-left rounded-md ${isSelected ? "bg-gray-200" : ""}`} key={user.Id} onClick={() => handleSelectUser(user)}>
                                <AccountPreview username={user.Username} profilePicture={user.ProfileUrl} />
                            </button>
                        );
                    })}
                </div>
                {selectedUsers.length === 0 ? (
                    <Button className="w-full" variant={"secondary"} disabled>
                        Invite users
                    </Button>
                ) : (
                    <SheetClose>
                        <Button className="w-full" onClick={addMembers}>
                            Invite users
                        </Button>
                    </SheetClose>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default InviteMembersDialog