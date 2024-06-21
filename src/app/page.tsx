import StraightContentInfinityScroll from '@/components/myComponents/content/StraightContentInfinityScroll'
import HomePageBar from '@/components/myComponents/HomePageBar'
import { getContentByFollowing } from '@/lib/actions/content'
import React from 'react'

const page = () => {
  return (
    <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-4">
      <HomePageBar />
      <div className="flex flex-col gap-4 pt-12 sm:pt-0 w-full">
        <StraightContentInfinityScroll contentFuction={getContentByFollowing} />
      </div>
    </div>
  )
}

export default page