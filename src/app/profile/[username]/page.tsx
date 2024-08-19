import Avatar from '@/components/newDesign/Avatar'
import Button from '@/components/newDesign/Button'
import ProfileButton from '@/components/newDesign/ProfileButton'
import { Separator } from '@/components/ui/separator'
import api from '@/lib/api'
import Image from 'next/image'
import React from 'react'

const page = async ({ params }: { params: { username: string } }) => {
  const user = await api.get(`/user/findone/${params.username}`, { cache: "no-cache" })

  console.log(user.Contents)

  return (
    <div>
      <div className='flex flex-col items-center justify-center gap-3 mt-10'>
        <div className='w-20 h-20'>
          <Avatar profilePicture={null} username={user.Username} />
        </div>
        <h1 className='text-lg'>{user.Username}</h1>
      </div>
      <div className="flex justify-between items-center px-5 my-4">
        <div className="flex flex-col items-center w-[30%]">
          <h4>200</h4>
          <span>post</span>
        </div>
        <Separator orientation="vertical" className="h-12" />
        <div className="flex flex-col items-center w-[30%]">
          <h4>200</h4>
          <span>follower</span>
        </div>
        <Separator orientation="vertical" className="h-12" />
        <div className="flex flex-col items-center w-[30%]">
          <h4>200</h4>
          <span>following</span>
        </div>
      </div>
      <ProfileButton />
      <div className='flex justify-center my-4'>
        <div className="grid grid-cols-3 m-1 gap-[3px] mt-2">
          {user.Contents.map((content: any) => (
            <div key={content.ID} className='max-w-96'>
              <Image src={content.URL} alt='tes' width={1000} height={1000} className='rounded-lg aspect-square object-cover'  />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page