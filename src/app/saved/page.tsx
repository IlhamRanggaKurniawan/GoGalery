import ContentPreview from '@/components/newDesign/content/ContentPreview'
import Header from '@/components/newDesign/Header'
import api from '@/lib/api'
import getSession from '@/lib/serverHooks/getSession'
import { Metadata } from 'next'
import Link from 'next/link'
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

const page = async () => {

  const { user } = await getSession()

  const savedContents = await api.get(`/v1/saves/${user.id}`, { cache: "no-cache" })

  return (
    <div>
      <Header>
        <div className="flex gap-2 items-center h-14 justify-center w-full">
          <h2 className="text-lg font-semibold">Saved Content</h2>
        </div>
      </Header>
      <div className='flex justify-center mt-14'>
        <div className="grid grid-cols-3 m-1 gap-[3px] mt-2">
          {savedContents && savedContents.map((save: any) => (
            <Link href={`/saved/${save.Content.ID}`} key={save.Content.ID}>
              <ContentPreview contentUrl={save.Content.URL} type={save.Content.Type} key={save.Content.ID} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page