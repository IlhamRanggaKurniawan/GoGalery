import Avatar from '@/components/newDesign/Avatar'
import ContentPreview from '@/components/newDesign/content/ContentPreview'
import ProfileButton from '@/components/newDesign/ProfileButton'
import { Separator } from '@/components/ui/separator'
import api from '@/lib/api'
import getSession from '@/lib/serverHooks/getSession'
import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'

export const generateMetadata = async ({ params }: { params: { username: string } }): Promise<Metadata> => {

  return {
    title: `${params.username} | GoGalery`,
    description: `Check out ${params.username}'s profile on GoGalery.`,
    keywords: `Go, Galery, social media, ${params.username}`,
    authors: [{ name: "GoGalery team" }],
    openGraph: {
      title: `${params.username} on GoGalery`,
      description: `Check out ${params.username}'s profile on GoGalery.`,
      url: `https://gogalery.com/profile/${params.username}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${params.username} on GoGalery`,
      description: `Check out ${params.username}'s profile on GoGalery.`,
      images: ['https://example.com/image.jpg'],
    },
  };
};

const page = async ({ params }: { params: { username: string } }) => {
  const user = await api.get(`/v1/user/${params.username}`, { cache: "no-cache" })

  const { user: session } = await getSession()

  return (
    <div>
      <div className='flex flex-col items-center justify-center gap-3 mt-10'>
        <div className='w-20 h-20'>
          <Avatar profilePicture={user.ProfileUrl} username={user.Username} />
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
      {user.Id !== session.id && (
        <ProfileButton userId={user.Id} />
      )}
      <div className='flex justify-center my-4'>
        <div className="grid grid-cols-3 m-1 gap-[3px] mt-2">
          {user.Contents && user.Contents.map((content: any) => (
            <Link href={`/profile/${params.username}/${content.Id}`} key={content.Id}>
              <ContentPreview contentUrl={content.URL} type={content.Type} />
            </Link>
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