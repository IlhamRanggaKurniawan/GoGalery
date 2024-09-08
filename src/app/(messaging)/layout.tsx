"use client"

import Header from '@/components/newDesign/Header'
import CreateDirectMessageDialog from '@/components/newDesign/messages/CreateDirectMessageDialog'
import CreateGroupDialog from '@/components/newDesign/messages/CreateGroupDialog'
import { MessageSquareDiff } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()

    return (
        <div className='mt-12 mb-14'>
            <div className='sm:hidden'>
                <Header>
                    <div className='flex flex-row justify-center gap-6 py-3 w-full'>
                        <Link href="/messages" className={`text-sm ${pathname === "/messages" ? "font-bold" : "font-light"}`}>Contact</Link>
                        <Link href="/group" className={`text-sm ${pathname === "/group" ? "font-bold" : "font-light"}`}>Group</Link>
                    </div>
                    {pathname === "/messages" ? (
                        <CreateDirectMessageDialog>
                            <MessageSquareDiff size={30} />
                        </CreateDirectMessageDialog>
                    ) : (
                        <CreateGroupDialog>
                            <MessageSquareDiff size={30} />
                        </CreateGroupDialog>
                    )}
                </Header>
            </div>
            <div className='hidden sm:flex'>
                <Header>
                    {pathname === "/messages" ? (
                        <div className='flex items-center h-12 w-full justify-between px-4'>
                            <h2 className='font-semibold text-lg'>Private Messages</h2>
                            <CreateDirectMessageDialog>
                                <MessageSquareDiff size={30} />
                            </CreateDirectMessageDialog>
                        </div>
                    ) : (
                        <div className='flex items-center h-12 w-full justify-between px-4'>
                            <h2 className='font-semibold text-lg'>Group Chat</h2>
                            <CreateGroupDialog>
                                <MessageSquareDiff size={30} />
                            </CreateGroupDialog>
                        </div>
                    )}
                </Header>
            </div>
            {children}
        </div>
    )
}

export default Layout