import SettingBar from '@/components/myComponents/SettingBar'
import React from 'react'

const page = () => {
  return (
    <div className="mb-14 sm:pl-14 md:pl-16 lg:pl-56 flex sm:mb-0">
        <div className="h-screen mb-14 overflow-y-auto w-screen sm:w-72 sm:mb-0 sm:border-r-2">
          <h1 className="p-3 font-semibold text-xl text-center">Settings</h1>
          <SettingBar />
        </div>
        
    </div>
  )
}

export default page