import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import React from 'react'

const Contact = ({id} : {id: string}) => {
  return (
    <Link href={`${id}`} className='h-14 flex items-center gap-3 p-2'>
        <Avatar className='w-12 h-12'>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>ilham</AvatarFallback>
        </Avatar>
        <h4 className='truncate'>Ilham rangga kurniawan</h4>
        
    </Link>
  )
}

export default Contact