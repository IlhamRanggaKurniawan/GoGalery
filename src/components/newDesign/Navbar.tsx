"use client"

import { AirVent, Bell, BotMessageSquare, CircleUser, Compass, Home, ImageUp, LucideProps, MessageCircle, Search, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavbarIcon = ({ icon: Icon, text, path, className }: { icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>, text: string, path: string, className?: string }) => {
    const pathName = usePathname()

    console.log(pathName)

    return (
        <>
            {path === pathName ? (
                <Link href={path} title="Home page" className={className}>
                    <div className="flex items-center gap-2 p-2">
                        <Icon size={25} color='black' fill='gray' strokeWidth={2.7} />
                        <span className="hidden lg:inline-block font-bold">Home</span>
                    </div>
                </Link>
            ) : (
                <Link href={path} title="Home page" className={className}>
                    <div className="flex items-center gap-2 p-2">
                        <Icon size={25} color='black' strokeWidth={2} />
                        <span className="hidden lg:inline-block">Home</span>
                    </div>
                </Link>
            )}
        </>
    )
}

const Navbar = () => {

    return (
        <div className='h-14 w-full fixed bottom-0 left-0 flex justify-between items-center sm:flex-col sm:h-full sm:justify-between sm:pb-4 sm:w-14 md:w-16 lg:w-56 lg:items-start'>
            <Link href={"/"} title="Home page" className="hidden sm:block">
                <div className="flex items-center gap-2 p-2">
                    <Home size={25} color='black' fill='gray' strokeWidth={2.7} />
                    <span className="hidden lg:inline-block font-bold">Home</span>
                </div>
            </Link>
            <div className='flex w-full justify-around items-center sm:flex-col gap-2 lg:items-start'>
                <NavbarIcon path='/' icon={Home} text='tes' />
                <NavbarIcon path='/tes' icon={Search} text='tes' className='hidden sm:block' />
                <NavbarIcon path='/tes' icon={Compass} text='tes' />
                <NavbarIcon path='/tes' icon={ImageUp} text='tes' />
                <NavbarIcon path='/tes' icon={Bell} text='tes' className='hidden sm:block' />
                <NavbarIcon path='/tes' icon={MessageCircle} text='tes' />
                <NavbarIcon path='/tes' icon={Users} text='tes' className='hidden sm:block' />
                <NavbarIcon path='/tes' icon={BotMessageSquare} text='tes' className='hidden sm:block' />
                <NavbarIcon path='/tes' icon={CircleUser} text='tes' />
            </div>
            <NavbarIcon path='/tes' icon={BotMessageSquare} text='tes' className='hidden sm:block' />
        </div>
    )
}

export default Navbar