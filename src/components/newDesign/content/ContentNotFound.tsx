/* eslint-disable react/no-unescaped-entities */
import React from 'react'

const ContentNotFound = ({ contentId }: { contentId: number }) => {
    return (
        <div className='px-2 bg-slate-100 rounded-2xl w-full max-w-[500px]'>
            <div className="w-full h-full aspect-square flex items-center justify-center">
                <p>content with id "{contentId}" not found</p>
            </div>
        </div>
    )
}

export default ContentNotFound