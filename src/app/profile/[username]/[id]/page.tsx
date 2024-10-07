import Content from '@/components/newDesign/content/Content'
import ContentNotFound from '@/components/newDesign/content/ContentNotFound'
import api from '@/lib/api'
import getSession from '@/lib/serverHooks/getSession'
import { Metadata } from 'next'
import React from 'react'

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
const page = async ({ params }: { params: { id: string, username: string } }) => {

    const { user } = await getSession()

    const response = await api.get(`/v1/content/${params.id}?userId=${user.id}`, { cache: "no-cache" })

    return (
        <div>
            {response && params.username === response.content.Uploader.Username ? (
                <Content username={response.content.Uploader.Username} caption={response.content.Caption} contentUrl={response.content.URL} type={response.content.Type} id={response.content.ID} profilePicture={response.content.Uploader.ProfileUrl} isLiked={response.Like.isLiked} isSaved={response.Save.isSaved} likeId={response.Like.likeId} saveId={response.Save.saveId} />
            ) : (
                <ContentNotFound contentId={+params.id} />
            )}
        </div>
    )
}

export default page