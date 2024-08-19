import Content from '@/components/newDesign/content/Content'
import Header from '@/components/newDesign/Header'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div>
      <Header>
        <div className="flex gap-2 items-center h-14">
          <ChevronLeft size={30} />
          <h2 className="text-lg font-semibold">Saved Content</h2>
        </div>
      </Header>
      <div className='flex justify-center'>
        <div className="grid grid-cols-3 m-1 gap-[3px] mt-2">
          <Image src="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/171993024088674146.jpg" alt='tes' width={1000} height={1000} className='rounded-lg max-w-96' />
          <Image src="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/171993024088674146.jpg" alt='tes' width={1000} height={1000} className='rounded-lg max-w-96' />
          <Image src="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/171993024088674146.jpg" alt='tes' width={1000} height={1000} className='rounded-lg max-w-96' />
          <Image src="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/171993024088674146.jpg" alt='tes' width={1000} height={1000} className='rounded-lg max-w-96' />
          <Image src="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/171993024088674146.jpg" alt='tes' width={1000} height={1000} className='rounded-lg max-w-96' />
          <Image src="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/171993024088674146.jpg" alt='tes' width={1000} height={1000} className='rounded-lg max-w-96' />
          <Image src="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/171993024088674146.jpg" alt='tes' width={1000} height={1000} className='rounded-lg max-w-96' />
          <Image src="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/171993024088674146.jpg" alt='tes' width={1000} height={1000} className='rounded-lg max-w-96' />
        </div>
      </div>
    </div>
  )
}

export default page