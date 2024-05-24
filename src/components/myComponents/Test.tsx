"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { follow } from '@/lib/actions/follow'
import { useDebouncedCallback } from 'use-debounce'

const Test = () => {
  const [buttonColor, setButtonColor] = useState("bg-blue-400")


  const followerId = 14
  const followingId = 16

  const debouncedFollow = useDebouncedCallback(
    async ({ followerId, followingId }: { followerId: number, followingId: number }) => {
      const tes = await follow({ followerId, followingId })

      if(!tes) {
        return setButtonColor("bg-blue-400");
      }

      setButtonColor("bg-slate-400");

    },
    500
  )


  return (
    <div>
      <Button onClick={() => debouncedFollow({followerId, followingId})} className={buttonColor}>tes</Button>

    </div>
  )
}

export default Test