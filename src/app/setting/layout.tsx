"use client"

import Header from '@/components/newDesign/Header'
import { Bug, KeyRound, LogOut, Palette, Pin, Search, Trash, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className='flex h-screen'>
            <div className='w-72 border-r h-full flex flex-col px-2 gap-2'>
                <h2 className='font-medium text-lg text-center'>Settings</h2>
                <Link href="/setting/profile" className="flex gap-2 items-center cursor-pointer">
                    <User size={27} />
                    <h3>Edit Profile</h3>
                </Link>
                <Link href="/setting/password" className="flex gap-2 items-center cursor-pointer">
                    <KeyRound size={27} />
                    <h3>Update Password</h3>
                </Link>
                <Link href="/saved" className="flex gap-2 items-center cursor-pointer sm:hidden">
                    <Pin size={27} />
                    <h3>Saved Content</h3>
                </Link>
                <Link href="/setting/problem" className="flex gap-2 items-center cursor-pointer">
                    <Bug size={27} />
                    <h3>Report a problem</h3>
                </Link>
                <Link href="/setting/delete" className="flex gap-2 items-center cursor-pointer">
                    <Trash size={27} color="red" />
                    <h3 className="text-red-600">Delete Account</h3>
                </Link>
            </div>
            <div className='w-full h-full'>
                {children}
            </div>
        </div>
    )
}

export default Layout