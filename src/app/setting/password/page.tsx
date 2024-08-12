import FormField from '@/components/newDesign/FormField'
import Header from '@/components/newDesign/Header'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div>
      <Header>
        <div className="flex gap-2 items-center h-14">
          <ChevronLeft size={30} />
          <h2 className="text-lg font-semibold">Change Password</h2>
        </div>
      </Header>
      <form className="mx-4 flex flex-col gap-3">
        <div>
          <label htmlFor="password">New Password</label>
          <FormField handleChange={() => console.log()} placeholder="New Password" value="" type="text" id="password" />
        </div>
        <div>
          <label htmlFor="confPassword">Confirm Password</label>
          <FormField handleChange={() => console.log()} placeholder="Confirm Password" value="" type="text" id="confPassword" />
        </div>
        <Button className="bg-primary rounded-2xl">
          <p className="text-background">Update</p>
        </Button>
      </form>
    </div>
  )
}

export default page