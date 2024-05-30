"use client"

import { Separator } from '@/components/ui/separator'
import { useFollowStore } from '@/lib/store/followStore'
import React, { useEffect } from 'react'

const ProfileInfo = ({userId, content}: {userId: number, content: number}) => {
  const {follower, following, countUserFollow} = useFollowStore()

  useEffect(() => {
    countUserFollow({userId})
  }, [countUserFollow, userId, follower, following])

  return (
    <div className="flex justify-between items-center px-5 my-2">
        <div className="flex flex-col items-center w-[30%]">
          <h4>{content}</h4>
          <span>post</span>
        </div>
        <Separator orientation="vertical" className="h-12" />
        <div className="flex flex-col items-center w-[30%]">
          <h4>{follower}</h4>
          <span>follower</span>
        </div>
        <Separator orientation="vertical" className="h-12" />
        <div className="flex flex-col items-center w-[30%]">
          <h4>{following}</h4>
          <span>following</span>
        </div>
      </div>
  )
}

export default ProfileInfo