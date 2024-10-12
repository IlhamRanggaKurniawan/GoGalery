import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import { AvatarSkeleton } from '../Avatar'

const ContentSkeleton = () => {
    return (
        <div className='p-2 w-full flex justify-center'>
            <div className='px-2 rounded-2xl w-full max-w-[500px]'>
                <div className='flex items-center gap-4 py-2'>
                    <div className='w-10 h-10 flex-shrink-0'>
                        <AvatarSkeleton />
                    </div>
                    <Skeleton className='w-full h-10 rounded-3xl' />
                </div>
                <Skeleton className='rounded-xl w-full aspect-square' />
                <div className='py-2 flex justify-between mt-2'>
                    <div className='flex gap-4'>
                        <Skeleton className='h-6 w-6 rounded-full' />
                        <Skeleton className='h-6 w-6 rounded-full' />
                        <Skeleton className='h-6 w-6 rounded-full' />
                    </div>
                    <Skeleton className='h-6 w-6 rounded-full' />
                </div>
            </div>
        </div>
    )
}

export default ContentSkeleton