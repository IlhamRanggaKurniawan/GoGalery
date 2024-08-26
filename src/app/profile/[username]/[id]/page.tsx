import Content from '@/components/newDesign/content/Content'
import ContentNotFound from '@/components/newDesign/content/ContentNotFound'
import api from '@/lib/api'
import React from 'react'

const page = async ({ params }: { params: { id: string, username: string } }) => {

    const content = await api.get(`/content/findone/${params.id}`, { cache: "no-cache" })

    return (
        <div>
            {content && params.username === content.Uploader.Username ? (
                <Content username={content.Uploader.Username} caption={content.Caption} contentUrl={content.URL} type={content.Type} id={content.ID} profilePicture={content.Uploader.ProfileUrl} />
            ) : (
                <ContentNotFound contentId={+params.id} />
            )}
        </div>
    )
}

export default page