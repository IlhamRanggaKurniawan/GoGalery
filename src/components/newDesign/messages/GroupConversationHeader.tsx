"use client"

import { useRouter } from "next/navigation"
import Header from "../Header"
import { ChevronLeft, UserRoundPlus } from "lucide-react"
import GroupInfoDialog from "./GroupInfoDialog"
import Avatar from "../Avatar"
import InviteMembersDialog from "./InviteMembersDialog"

const GroupConversationHeader = ({ name, profileUrl, id }: { name: string, profileUrl: string, id: number }) => {

    const router = useRouter()

    return (
        <Header>
            <div className="flex gap-2 items-center h-14 px-2">
                <ChevronLeft size={30} onClick={() => router.back()} className='cursor-pointer' />
                <GroupInfoDialog id={id} groupProfile={profileUrl}>
                    <div className='flex gap-2 items-center '>
                        <div className="flex gap-2 items-center">
                            <div className="h-12 w-12">
                                <Avatar profilePicture={profileUrl} username="tes" />
                            </div>
                        </div>
                        <h2>{name}</h2>
                    </div>
                </GroupInfoDialog>
            </div>
            <div className='mr-2'>
                <InviteMembersDialog groupId={id}>
                    <UserRoundPlus size={30} />
                </InviteMembersDialog>
            </div>
        </Header>
    )
}

export default GroupConversationHeader