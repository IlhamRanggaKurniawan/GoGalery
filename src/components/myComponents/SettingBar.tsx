import { Bug, Trash, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SettingBar = () => {
  return (
    <div className='px-4 flex flex-col gap-3'>
        <Link href="/setting/profile" className='flex gap-2 items-center cursor-pointer'>
            <User size={27}/>
            <h3>Edit Profile</h3>
        </Link>
        <Link href="/setting" className='flex gap-2 items-center cursor-pointer'>
            <Bug size={27}/>
            <h3>Report a problem</h3>
        </Link>
        <Link href="/setting" className='flex gap-2 items-center cursor-pointer'>
            <Trash size={27} color='red'/>
            <h3 className='text-red-600'>Delete Account</h3>
        </Link>
    </div>
  )
}

export default SettingBar