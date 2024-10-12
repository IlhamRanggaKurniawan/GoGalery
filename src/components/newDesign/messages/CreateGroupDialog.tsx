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
import AccountPreview from '../AccountPreview';

const CreateGroupDialog = ({ children }: { children: React.ReactNode }) => {

    const [groupName, setGroupName] = useState("")
    const [search, setSearch] = useState("")
    const [debouncedSearch] = useDebounce(search, 300)
    const [users, setUsers] = useState<TUserPreview[]>([])
    const [selectedUsers, setSelectedUsers] = useState<TUserPreview[]>([])

    const router = useRouter();
    const { user: session } = useSession()

    const findUsers = async () => {
        try {
            if (!search || !session) return

            const mutualUsers = await apiClient.get(`/v1/users/${session.id}/mutual`, {
                cache: "no-cache"
            })

            setUsers(mutualUsers)
        } catch (error) {
            console.error(error)
        }
    }

    const handleSelectUser = ({ user }: { user: TUserPreview }) => {
        if (selectedUsers.find((prev) => prev.Id === user.Id)) {
            return setSelectedUsers(selectedUsers.filter((prev) => prev.Id !== user.Id))
        }

        return setSelectedUsers((prev) => [...prev, user])
    }

    const handleCreateGroup = async () => {
        try {
            if (!selectedUsers) return

            const group = await apiClient.post(`/v1/group`, {
                body: {
                    name: groupName,
                    members: [...selectedUsers, { Id: session?.id }]
                },
                cache: "no-cache"
            })

            router.push(`/group/${group.Id}`)
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
                        const isSelected = selectedUsers.some((selectedUser) => selectedUser.Id === user.Id);
                        return (
                            <button className={`w-full text-left rounded-md ${isSelected ? "bg-gray-200" : ""}`} key={user.Id} onClick={() => handleSelectUser({ user })}>
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
                    <DialogClose>
                        <Button className="w-full" onClick={handleCreateGroup}>
                            Create Group
                        </Button>
                    </DialogClose>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default CreateGroupDialog