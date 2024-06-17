import { Bug, KeyRound, Trash, User } from 'lucide-react'
import React from 'react'

const SettingBar = () => {
  return (
    <div className='px-4 flex flex-col gap-3'>
        <div className='flex gap-2 items-center'>
            <User size={27}/>
            <h3>Edit Profile</h3>
        </div>
        <div className='flex gap-2 items-center'>
            <KeyRound size={27}/>
            <h3>Change Password</h3>
        </div>
        <div className='flex gap-2 items-center'>
            <Bug size={27}/>
            <h3>Report a problem</h3>
        </div>
        <div className='flex gap-2 items-center'>
            <Trash size={27} color='red'/>
            <h3 className='text-red-600'>Delete Account</h3>
        </div>
    </div>
  )
}

export default SettingBar