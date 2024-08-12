"use client"

import { AirVent, Bell, BotMessageSquare, CircleUser, Compass, Home, ImageUp, LucideProps, Menu, MessageCircle, Rocket, Search, Settings2, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavbarIcon = ({ icon: Icon, text, path, className, hidden }: { icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>, text: string, path: string, className?: string, hidden: boolean }) => {
    const pathName = usePathname()

    const hiddenClassname = "hidden sm:flex justify-center"

    return (
        <>
            {path === pathName ? (
                <Link href={path} title="Home page" className={`${hidden && hiddenClassname} bg-primary text-background flex justify-center lg:justify-start ${className}`}>
                    <div className="flex items-center gap-2 p-2">
                        <Icon size={25} strokeWidth={2.7} />
                        <span className="hidden lg:inline-block font-bold">{text}</span>
                    </div>
                </Link>
            ) : (
                <Link href={path} title="Home page" className={`${hidden && hiddenClassname} flex justify-center lg:justify-start ${className}`}>
                    <div className="flex items-center gap-2 p-2">
                        <Icon size={25} strokeWidth={2} />
                        <span className="hidden lg:inline-block">{text}</span>
                    </div>
                </Link>
            )}
        </>
    )
}

const Navbar = () => {

    return (
        <div className='h-14 w-full fixed bottom-0 left-0 flex justify-between items-center z-50 bg-background sm:flex-col sm:h-full sm:justify-between sm:pb-4 sm:w-14 md:w-16 lg:w-56 lg:items-start sm:border-r'>
            <Link href="/" title="Home page" className="hidden w-full sm:flex items-center justify-center">
                <div className="flex items-center gap-2 p-2">
                    <Rocket size={25} color='black' strokeWidth={2.7} />
                    <span className="hidden lg:inline-block font-bold">Connect Verse</span>
                </div>
            </Link>
            <div className='flex w-full px-2 justify-around items-center sm:flex-col gap-2 lg:items-start '>
                <NavbarIcon path='/' icon={Home} text='Home' className='w-full sm:hover:bg-primary sm:hover:text-secondary rounded-lg' hidden={false} />
                <NavbarIcon path='/tes' icon={Search} text='Search' className='w-full sm:hover:bg-primary sm:hover:text-secondary rounded-lg' hidden />
                <NavbarIcon path='/explore/fyp' icon={Compass} text='Explore' className='w-full sm:hover:bg-primary sm:hover:text-secondary rounded-lg' hidden={false} />
                <NavbarIcon path='/upload' icon={ImageUp} text='Upload' className='w-full sm:hover:bg-primary sm:hover:text-secondary rounded-lg' hidden />
                <NavbarIcon path='/menu' icon={Menu} text='Menu' className='w-full sm:hidden sm:hover:bg-primary sm:hover:text-secondary rounded-lg' hidden={false} />
                <NavbarIcon path='/notification' icon={Bell} text='Notification' className='w-full sm:hover:bg-primary sm:hover:text-secondary rounded-lg' hidden />
                <NavbarIcon path='/messages' icon={MessageCircle} text='Private Chat' className='w-full sm:hover:bg-primary sm:hover:text-secondary rounded-lg' hidden={false} />
                <NavbarIcon path='/group' icon={Users} text='Group Chat' className='w-full sm:hover:bg-primary sm:hover:text-secondary rounded-lg' hidden />
                <NavbarIcon path='/ai' icon={BotMessageSquare} text='Chat Bot' className='w-full sm:hover:bg-primary sm:hover:text-secondary rounded-lg' hidden />
                <NavbarIcon path='/ilham' icon={CircleUser} text='Profile' className='w-full sm:hover:bg-primary sm:hover:text-secondary rounded-lg' hidden={false} />
            </div>
            <div className='hidden  w-full justify-around items-center sm:flex sm:flex-col gap-2 lg:items-start px-2'>
                <NavbarIcon path='/tes' icon={Settings2} text='More' className='w-full sm:hover:bg-primary sm:hover:text-secondary rounded-lg' hidden />
            </div>
        </div>
    )
}

export default Navbar