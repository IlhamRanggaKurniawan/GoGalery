import Content from '@/components/newDesign/content/Content'
import ContentNotFound from '@/components/newDesign/content/ContentNotFound'
import api from '@/lib/api'
import getSession from '@/lib/serverHooks/getSession'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "GoGalery",
    description: "Welcome to the GoGalery",
    keywords: "Go, Galery, social media",
    authors: [{ name: "GoGalery team" }],
    openGraph: {
      title: "GoGalery",
      description: "Welcome to the GoGalery ",
      url: "https://gogalery.com/",
    },
    twitter: {
      card: "summary_large_image",
      title: "GoGalery",
      description: "Welcome to the GoGalery ",
    },
  };

const page = async ({ params }: { params: { id: string } }) => {

    const { user } = await getSession()

    const response = await api.get(`/v1/content/${params.id}`, { cache: "no-cache" })

    return (
        <div>
            {response ? (
                <Content username={response.content.Uploader.Username} caption={response.content.Caption} contentUrl={response.content.URL} type={response.content.Type} id={response.content.Id} profilePicture={response.content.Uploader.ProfileUrl} isLiked={response.Like.isLiked} isSaved={response.Save.isSaved} likeId={response.Like.likeId} saveId={response.Save.saveId}/>
            ) : (
                <ContentNotFound contentId={+params.id} />
            )}
        </div>
    )
}

export default page