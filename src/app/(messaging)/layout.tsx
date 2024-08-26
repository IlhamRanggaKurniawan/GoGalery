"use client"

import Header from '@/components/newDesign/Header'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()

    return (
        <div className='mt-12 mb-14'>
            <Header>
                <div className='flex flex-row justify-center gap-6 py-3 w-full'>
                    <Link href="/messages" className={`text-sm ${pathname === "/messages" ? "font-bold" : "font-light"}`}>Contact</Link>
                    <Link href="/group" className={`text-sm ${pathname === "/group" ? "font-bold" : "font-light"}`}>Group</Link>
                </div>
                <Search />
            </Header>
            {children}
        </div>
    )
}

export default Layout