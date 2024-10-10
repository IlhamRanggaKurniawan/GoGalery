import React from 'react'
import { Avatar as AvatarContainer, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Skeleton } from '../ui/skeleton'

const Avatar = ({ profilePicture, username }: { profilePicture?: string | null, username: string }) => {

    return (
        <AvatarContainer className="h-full w-full">
            <AvatarImage src={profilePicture ? profilePicture : `/profile-picture.jpg`} alt="@shadcn" />
            <AvatarFallback>{username}</AvatarFallback>
        </AvatarContainer>
    )
}
export const AvatarSkeleton = () => {
    return(
        <Skeleton className='h-full w-full rounded-full'/>
    )
}

export default Avatar
