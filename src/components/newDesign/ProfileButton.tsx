"use client"

import React, { useState } from 'react'
import Button from './Button'
import { useSession } from '@/lib/hooks/useSession'
import useEffectAfterMount from '@/lib/hooks/useEffectAfterMount'
import apiClient from '@/lib/apiClient'
import { useDebouncedCallback } from 'use-debounce'
import { useRouter } from 'next/navigation'

const ProfileButton = ({ userId }: { userId: number }) => {
  const { user } = useSession()
  const [followId, setFollowId] = useState(null)
  const router = useRouter()


  useEffectAfterMount(() => {
    if (user?.id === userId || !user?.id) return

    const checkDMAndFollow = async () => {

      const checkFollowing = await apiClient.get(`/follow/findone?followerId=${user.id}&followingId=${userId}`, { cache: "no-cache" })

      if (checkFollowing) setFollowId(checkFollowing.ID)
    }

    checkDMAndFollow()
  }, [user])

  const followToggle = useDebouncedCallback(
    async () => {
      try {
        if (!user) return

        if (followId) {
          await apiClient.delete(`/follow/delete/${followId}`)
          setFollowId(null)
        } else {
          const follow = await apiClient.post(`/follow/create`, {
            body: {
              followingId: userId,
              followerId: user.id
            },
            cache: "no-cache"
          })
          setFollowId(follow.ID)
        }
      } catch (error) {
        console.error(error)
      }
    }, 300)

  const handleDirectMessage = async () => {
    try {
      if (!user) return

      const directMessage = await apiClient.get(`/dm/findone?participant1Id=${user.id}&participant2Id=${userId}`, { cache: "no-cache" })

      if (directMessage) {
        return router.push(`/messages/${directMessage.ID}`)
      }

      const newDM = await apiClient.post(`/dm/create`, {
        body: {
          participants: [user.id, userId]

        },
        cache: "force-cache"
      })

      router.push(`/messages/${newDM.ID}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='flex justify-center gap-3 px-4'>
      {followId ? (
        <Button className='max-w-24 rounded-full bg-card text-primary shadow-lg' onClick={followToggle}>Unfollow</Button>
      ) : (
        <Button className='max-w-24 rounded-full bg-blue-500 text-white shadow-lg' onClick={followToggle}>Follow</Button>
      )}
      <Button className='max-w-24 rounded-full bg-card text-primary shadow-lg' onClick={handleDirectMessage}>Message</Button>
    </div>
  )
}

export default ProfileButton