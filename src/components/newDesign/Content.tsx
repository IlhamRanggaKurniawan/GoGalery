"use client"

import React from 'react'
import Avatar from './Avatar'
import { Bookmark, EllipsisVertical, Heart, MessageCircle, Share } from 'lucide-react'
import Image from 'next/image'
import ContentDescription from '../myComponents/content/ContentDescription'

const Content = () => {
    return (
        <div className='p-2'>
            <div className='px-2 bg-slate-100 rounded-2xl w-full sm:max-w-[500px]'>
                <div className='flex items-center justify-between py-2'>
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10'>
                            <Avatar profilePicture={null} username='ilham' />
                        </div>
                        <h2 className='text-sm'>ilham rangga kurniawan</h2>
                    </div>
                    <EllipsisVertical />
                </div>
                <Image src="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/171993024088674146.jpg" alt='tes' width={1000} height={1000} className='rounded-xl' />
                <div className='py-2 flex justify-between'>
                    <div className='flex gap-4'>
                        <Heart size={23} />
                        <MessageCircle size={23} />
                        <Share size={23} />
                    </div>
                    <Bookmark size={23} />
                </div>
                <ContentDescription caption='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam, totam! Fugiat ad labore cum asperiores corrupti assumenda nostrum excepturi voluptas reprehenderit fugit numquam est iste tempore maxime soluta commodi praesentium quam, veritatis alias! Facere sequi reiciendis explicabo, cumque quisquam excepturi corporis repellendus accusantium nemo rerum quas corrupti! Ea praesentium aliquid eum fugit! Quo, eveniet sequi harum assumenda sed odio natus omnis eos suscipit corrupti enim quas voluptatum laboriosam voluptatem rem doloribus ipsa illum. Vel dolorem, eveniet non nam reiciendis odio ad recusandae! Sit aliquam nihil commodi dolorum alias ipsam voluptatibus labore ad odio similique. Perferendis necessitatibus sapiente fuga sint doloremque.' />
            </div>
        </div>
    )
}

export default Content