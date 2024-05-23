import { Separator } from '@/components/ui/separator'
import React from 'react'

const ProfileInfo = () => {
  return (
    <div className="flex justify-between items-center px-5 my-2">
        <div className="flex flex-col items-center w-[30%]">
          <h4>911</h4>
          <span>post</span>
        </div>
        <Separator orientation="vertical" className="h-12" />
        <div className="flex flex-col items-center w-[30%]">
          <h4>911</h4>
          <span>follower</span>
        </div>
        <Separator orientation="vertical" className="h-12" />
        <div className="flex flex-col items-center w-[30%]">
          <h4>911</h4>
          <span>following</span>
        </div>
      </div>
  )
}

export default ProfileInfo