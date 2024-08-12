import React from 'react'
import Avatar from './Avatar'

const Contact = () => {
    return (
        <div className='w-full px-2 mb-1'>
            <div className='rounded-2xl h-16 bg-slate-200 flex items-center px-2 gap-3'>
                <div className='w-14 h-14'>
                    <Avatar profilePicture={"https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/171993024088674146.jpg"} username='tes' />
                </div>
                <h3>Ilham Rangga</h3>
            </div>
        </div>
    )
}

export default Contact