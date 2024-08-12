import Button from '@/components/newDesign/Button'
import FormField from '@/components/newDesign/FormField'
import Header from '@/components/newDesign/Header'
import { ChevronLeft } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div>
      <Header>
        <div className="flex gap-2 items-center h-14">
          <ChevronLeft size={30} />
          <h2 className="text-lg font-semibold">Give Us Feedback</h2>
        </div>
      </Header>
      <div className='px-4 mb-4'>
        <label className="px-2 mb-1" htmlFor='bio'>Bio</label>
        <textarea placeholder="Bio" className="rounded-xl w-full p-3 border-2 border-muted resize-none h-32" id='bio' />
      </div>
      <div className='px-4 w-full'>
        <Button className='bg-primary rounded-2xl'>
          <p className='text-background'>Send Feedback</p>
        </Button>
      </div>
    </div>
  )
}

export default page