import React from 'react'
import { Avatar as AvatarContainer, AvatarFallback, AvatarImage } from '../ui/avatar'

const Avatar = ({ profilePicture, username }: { profilePicture?: string | null, username: string }) => {
    return (
        <AvatarContainer className="h-full w-full">
            <AvatarImage src={profilePicture ? profilePicture : `/profile-picture.jpg`} alt="@shadcn" />
            <AvatarFallback>{username}</AvatarFallback>
        </AvatarContainer>
    )
}

export default Avatar