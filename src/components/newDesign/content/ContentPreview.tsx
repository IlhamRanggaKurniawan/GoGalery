import Image from 'next/image'
import React from 'react'

const ContentPreview = ({ contentUrl, type }: { contentUrl: string, type: "image" | "video" }) => {
    console.log(type)
    console.log(contentUrl)

    return (
        <>
            {type === "image" ? (
                <div className='max-w-96'>
                    <Image src={contentUrl} alt='tes' width={1000} height={1000} className='rounded-lg aspect-square object-cover' />
                </div>
            ) : (
                <video
                    width={1000}
                    height={1000}
                    className='rounded-xl w-full aspect-square object-cover'
                >
                    <source src={contentUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
        </>
    )
}

export default ContentPreview