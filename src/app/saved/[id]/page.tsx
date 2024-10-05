import Content from '@/components/newDesign/content/Content'
import ContentNotFound from '@/components/newDesign/content/ContentNotFound'
import api from '@/lib/api'
import getSession from '@/lib/serverHooks/getSession'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Connect Verse",
    description: "Welcome to the Connect Verse",
    keywords: "connect, verse, social media",
    authors: [{ name: "Connect Verse team" }],
    openGraph: {
      title: "Connect Verse",
      description: "Welcome to the Connect Verse ",
      url: "https://ConnectVerse.com/",
    },
    twitter: {
      card: "summary_large_image",
      title: "Connect Verse",
      description: "Welcome to the Connect Verse ",
    },
  };

const page = async ({ params }: { params: { id: string } }) => {

    const { user } = await getSession()

    const response = await api.get(`/v1/content/${params.id}?userId=${user.id}`, { cache: "no-cache" })

    return (
        <div>
            {response ? (
                <Content username={response.content.Uploader.Username} caption={response.content.Caption} contentUrl={response.content.URL} type={response.content.Type} id={response.content.ID} profilePicture={response.content.Uploader.ProfileUrl} isLiked={response.Like.isLiked} isSaved={response.Save.isSaved} likeId={response.Like.likeId} saveId={response.Save.saveId}/>
            ) : (
                <ContentNotFound contentId={+params.id} />
            )}
        </div>
    )
}

export default page