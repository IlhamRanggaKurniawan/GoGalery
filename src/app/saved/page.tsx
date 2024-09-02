import Content from '@/components/newDesign/content/Content'
import ContentPreview from '@/components/newDesign/content/ContentPreview'
import Header from '@/components/newDesign/Header'
import api from '@/lib/api'
import getSession from '@/lib/serverHooks/getSession'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {

  const { user } = await getSession()

  const savedContents = await api.get(`/saved/findall/${user.id}`, { cache: "no-cache" })

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