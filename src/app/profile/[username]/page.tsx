import Avatar from '@/components/newDesign/Avatar'
import Button from '@/components/newDesign/Button'
import ContentPreview from '@/components/newDesign/content/ContentPreview'
import ProfileButton from '@/components/newDesign/ProfileButton'
import Video from '@/components/newDesign/content/Video'
import { Separator } from '@/components/ui/separator'
import api from '@/lib/api'
import getSession from '@/lib/serverHooks/getSession'
import Image from 'next/image'
import React from 'react'

const page = async ({ params }: { params: { username: string } }) => {
  const user = await api.get(`/user/findone/${params.username}`, { cache: "no-cache" })

  const { user: session } = await getSession()

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
      {user.ID !== session.id && (
        <ProfileButton userId={user.ID} />
      )}
      <div className='flex justify-center my-4'>
        <div className="grid grid-cols-3 m-1 gap-[3px] mt-2">
          {user.Contents && user.Contents.map((content: any) => (
            <ContentPreview key={content.ID} contentUrl={content.URL} type={content.Type}/>
          ))}
        </div>
      </div>
      {user && !user.Contents.length && (
        <div className='flex justify-center items-center w-full h-full'>
          <h1 className='text-center'>No Content Posted yet by {user.Username}</h1>
        </div>
      )}
    </div>
  )
}

export default page