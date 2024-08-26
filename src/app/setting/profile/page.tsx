import Avatar from '@/components/newDesign/Avatar'
import Button from '@/components/newDesign/Button'
import FormField from '@/components/newDesign/FormField'
import Header from '@/components/newDesign/Header'
import { ChevronLeft } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div>
      <div className='bg-muted flex flex-col items-center rounded-2xl mx-3 p-6 gap-6'>
        <div className='w-28 h-28'>
          <Avatar profilePicture={null} username='tes' />
        </div>
        <p>Ilham Rangga</p>
      </div>
      <div className='px-4 my-4'>
        <label className="px-2 mb-1" htmlFor='bio'>Bio</label>
        <textarea placeholder="Bio" className="rounded-xl w-full p-3 border-2 border-muted resize-none" id='bio' />
      </div>
      <div className='px-4'>
        <Button className='bg-primary rounded-2xl'>
          <p className='text-background'>Update</p>
        </Button>
      </div>
    </div>
  )
}

export default page