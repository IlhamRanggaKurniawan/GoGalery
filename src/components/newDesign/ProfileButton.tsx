"use client"

import React from 'react'
import Button from './Button'

const ProfileButton = () => {
  return (
    <div className='flex justify-center gap-3 px-4'>
      <Button className='max-w-24 rounded-full bg-red-500 text-primary shadow-lg' onClick={() => console.log("hehe")}>Follow</Button>
      <Button className='max-w-24 rounded-full bg-red-100 text-primary shadow-lg' onClick={() => console.log("haha")}>Message</Button>
    </div>
  )
}

export default ProfileButton