import Avatar from '@/components/newDesign/Avatar'
import Button from '@/components/newDesign/Button'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div>
      <div className='flex flex-col items-center justify-center gap-3'>
        <div className='w-20 h-20'>
          <Avatar profilePicture={null} username='tes' />
        </div>
        <h1>Ilham Rangga</h1>
      </div>
      <div className='flex justify-center gap-4 mt-4'>
        <div className='flex flex-col items-center w-20'>
          <p>200</p>
          <h3>Post</h3>
        </div>
        <div className='flex flex-col items-center w-20'>
          <p>200</p>
          <h3>following</h3>
        </div>
        <div className='flex flex-col items-center w-20'>
          <p>200</p>
          <h3>followers</h3>
        </div>
      </div>
      <div className='flex justify-center gap-3 px-4'>
        <Button className='max-w-24 rounded-full bg-red-500 text-primary shadow-lg' >Follow</Button>
        <Button className='max-w-24 rounded-full bg-red-100 text-primary shadow-lg' >Message</Button>
      </div>
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