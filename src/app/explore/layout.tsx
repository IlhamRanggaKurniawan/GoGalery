"use client"

import Header from '@/components/newDesign/Header'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()

    return (
        <div className='mt-12'>
            <Header>
                <div className='flex flex-row justify-center gap-6 py-3 w-full'>
                    <Link href="/explore/trending" className={`text-sm ${pathname === "/explore/trending" ? "font-bold" : "font-light"}`}>Trending</Link>
                    <Link href="/explore/fyp" className={`text-sm ${pathname === "/explore/fyp" ? "font-bold" : "font-light"}`}>For You</Link>
                    <Link href="/explore/following" className={`text-sm ${pathname === "/explore/following" ? "font-bold" : "font-light"}`}>Following</Link>
                </div>
                <Link href="/search" className='sm:hidden'>
                    <Search />
                </Link>
            </Header>
            {children}
        </div>
    )
}

export default Layout