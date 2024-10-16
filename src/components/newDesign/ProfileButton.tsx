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

      const checkFollowing = await apiClient.get(`/v1/follow/${userId}`, { cache: "no-cache" })

      if (checkFollowing) setFollowId(checkFollowing.Id)
    }

    checkDMAndFollow()
  }, [user])

  const followToggle = useDebouncedCallback(
    async () => {
      try {
        if (!user) return

        if (followId) {
          await apiClient.delete(`/v1/follow/${followId}`)
          setFollowId(null)
        } else {
          const follow = await apiClient.post(`/v1/follow/${userId}`, {
            body: {},
            cache: "no-cache"
          })
          setFollowId(follow.Id)
        }
      } catch (error) {
        console.error(error)
      }
    }, 300)

  const handleDirectMessage = async () => {
    try {
      if (!user) return

      const directMessage = await apiClient.get(`/v1/direct/user/${userId}`, { cache: "no-cache" })

      if (directMessage) {
        return router.push(`/messages/${directMessage.Id}`)
      }

      const newDM = await apiClient.post(`/v1/direct`, {
        body: {
          participants: [user.id, userId]

        },
        cache: "force-cache"
      })

      router.push(`/messages/${newDM.Id}`)
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