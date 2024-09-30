import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import apiClient from '@/lib/apiClient';
import useEffectAfterMount from '@/lib/hooks/useEffectAfterMount';
import { useSession } from '@/lib/hooks/useSession';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { use, useState } from 'react'
import { useDebounce } from 'use-debounce';
import { IUserPreview } from '../../../../types/entity';
import AccountPreview from '../AccountPreview';

const CreateGroupDialog = ({ children }: { children: React.ReactNode }) => {

    const [groupName, setGroupName] = useState("")
    const [search, setSearch] = useState("")
    const [debouncedSearch] = useDebounce(search, 300)
    const [users, setUsers] = useState<IUserPreview[]>([])
    const [selectedUsers, setSelectedUsers] = useState<IUserPreview[]>([])

    const router = useRouter();
    const { user: session } = useSession()

    const findUsers = async () => {
        try {
            if (!search || !session) return

            const mutualUsers = await apiClient.get(`/v1/user/${session.id}/mutual`, {
                cache: "no-cache"
            })

            setUsers(mutualUsers)
        } catch (error) {
            console.error(error)
        }
    }

    const handleSelectUser = ({ user }: { user: IUserPreview }) => {
        if (selectedUsers.find((prev) => prev.ID === user.ID)) {
            return setSelectedUsers(selectedUsers.filter((prev) => prev.ID !== user.ID))
        }

        return setSelectedUsers((prev) => [...prev, user])
    }

    const handleCreateGroup = async () => {
        try {
            if (!selectedUsers) return

            const group = await apiClient.post(`/v1/group`, {
                body: {
                    name: groupName,
                    members: [...selectedUsers, { ID: session?.id }]
                },
                cache: "no-cache"
            })

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
            <DialogContent>
                <div className="flex justify-between">
                    <DialogHeader className=" font-medium">Create a group</DialogHeader>
                    <DialogClose className="flex flex-col gap-2">
                        <X />
                    </DialogClose>
                </div>
                <Input type="text" placeholder="Group name" onChange={(e) => setGroupName(e.target.value)} />
                <Separator className=" bg-black" />
                <Input type="text" placeholder="Add members" onChange={(e) => setSearch(e.target.value)} />
                <div className="h-96">
                    {users.map((user) => {
                        const isSelected = selectedUsers.some((selectedUser) => selectedUser.ID === user.ID);
                        return (
                            <button className={`w-full text-left rounded-md ${isSelected ? "bg-gray-200" : ""}`} key={user.ID} onClick={() => handleSelectUser({ user })}>
                                <AccountPreview username={user.Username} profilePicture={user.ProfileUrl} />
                            </button>
                        );
                    })}
                </div>
                {selectedUsers.length === 0 ? (
                    <Button className="w-full" variant={"secondary"} disabled>
                        Create Group
                    </Button>
                ) : (
                    <Button className="w-full" onClick={handleCreateGroup}>
                        Create Group
                    </Button>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default CreateGroupDialog