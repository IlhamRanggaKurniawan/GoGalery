"use client"

import React, { useState } from 'react'
import Button from './Button'
import { useSession } from '@/lib/hooks/useSession'
import useEffectAfterMount from '@/lib/hooks/useEffectAfterMount'
import apiClient from '@/lib/apiClient'

const ProfileButton = ({ userId }: { userId: number }) => {
  const { user } = useSession()
  const [followId, setFollowId] = useState(null)
  const [isExistingDM, setIsExistingDM] = useState(false)

  useEffectAfterMount(() => {
    if (user?.id === userId || !user?.id) return

    const checkDMAndFollow = async () => {

      const checkFollowing = await apiClient.get(`/follow/findone?followerId=${user.id}&followingId=${userId}`, { cache: "no-cache" })

      if (checkFollowing) setFollowId(checkFollowing.ID)

      const checkDM = await apiClient.get(`/dm/findone?participant1Id=${user.id}&participant2Id=${userId}`, { cache: "no-cache" })

      if (checkDM) setIsExistingDM(true)

    }

    checkDMAndFollow()
  }, [user])

  const followToggle = async () => {
    if (!user) return

    if (followId) {
      await apiClient.delete(`/follow/delete/${followId}`)
      setFollowId(null)
    } else {
      const follow = await apiClient.post(`/follow/create`, {
        body: {
          followingId: user.id,
          followerId: userId,
        },
        cache: "no-cache"
      })
      setFollowId(follow.ID)
    }


  }

  return (
    <div className='flex justify-center gap-3 px-4'>
      {followId ? (
        <Button className='max-w-24 rounded-full bg-slate-200 text-primary shadow-lg' onClick={() => console.log("haha")}>Unfollow</Button>
      ) : (
        <Button className='max-w-24 rounded-full bg-blue-500 text-white shadow-lg' onClick={() => console.log("hehe")}>Follow</Button>
      )}
      <Button className='max-w-24 rounded-full bg-red-100 text-primary shadow-lg' onClick={() => console.log("haha")}>Message</Button>
    </div>
  )
}

export default ProfileButton