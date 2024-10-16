"use client"

import apiClient from '@/lib/apiClient'
import useEffectAfterMount from '@/lib/hooks/useEffectAfterMount'
import { useSession } from '@/lib/hooks/useSession'
import { Bell, BotMessageSquare, CircleUser, Compass, Home, ImageUp, LucideProps, Menu, MessageCircle, Rocket, Search, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import NotificationSheet from './notification/NotificationSheet'
import MenuDropDown from './MenuDropDown'
import SearchSheet from './SearchSheet'

const NavbarIcon = ({ icon: Icon, text, path, className, hidden }: { icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>, text: string, path?: string, className?: string, hidden: boolean }) => {
    const pathName = usePathname()

    const hiddenClassname = "hidden sm:flex justify-center"

    if (!path) {
        return (
            <div className="flex items-center gap-2 p-2">
                <Icon size={25} strokeWidth={2} />
                <span className="hidden lg:inline-block">{text}</span>
            </div>
        )
    }

    const isSpecialPath = ["/explore", "/messages", "/group"].some(specialPath => path.startsWith(specialPath) && pathName.startsWith(specialPath))

    return (
        <>
            {(path === pathName || isSpecialPath) ? (
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
    const { user } = useSession()
    const [AIConvetsationId, setAIConvetsationId] = useState(null)
    const [notifications, setNotifications] = useState([])

    useEffectAfterMount(() => {
        const getAIConversation = async () => {
            if (!user) return

            const AIConversation = await apiClient.get(`/v1/ai/conv`, { cache: "no-cache" })

            if (AIConversation) return setAIConvetsationId(AIConversation.Id)

            const newAIConversation = await apiClient.post(`/v1/ai/conv`, {
                body: {
                },
                cache: "no-cache"
            })

            if (newAIConversation) return setAIConvetsationId(newAIConversation.Id)
        }

        getAIConversation()
    }, [user])

    const getNotification = async () => {
        try {
            const notifications = await apiClient.get(`/v1/notifications`, { cache: "no-cache" })

            setNotifications(notifications)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='h-14 w-full fixed bottom-0 left-0 flex justify-between items-center z-50 bg-background sm:flex-col sm:h-full sm:justify-between sm:pb-4 sm:w-14 md:w-16 lg:w-56 lg:items-start sm:border-r'>
            <Link href="/" title="Home page" className="hidden w-full sm:flex items-center justify-center">
                <div className="flex items-center gap-2 p-2">
                    <Rocket size={25} strokeWidth={2.7} />
                    <span className="hidden lg:inline-block font-bold">GoGalery</span>
                </div>
            </Link>
            <div className='flex w-full px-2 justify-around items-center sm:flex-col gap-2 lg:items-start '>
                <NavbarIcon path='/' icon={Home} text='Home' className='w-full sm:hover:bg-primary sm:hover:text-secondary rounded-lg' hidden={false} />
                <SearchSheet side='left'>
                    <div className='w-full sm:hover:bg-primary sm:hover:text-secondary rounded-lg justify-center lg:justify-start items-center gap-2 p-2 cursor-pointer hidden sm:flex '>
                        <Search size={25} strokeWidth={2} />
                        <span className="hidden lg:inline-block">Search</span>
                    </div>
                </SearchSheet>
                <NavbarIcon path='/explore/fyp' icon={Compass} text='Explore' className='w-full sm:hover:bg-primary sm:hover:text-secondary rounded-lg' hidden={false} />
                <NavbarIcon path='/upload' icon={ImageUp} text='Upload' className='w-full sm:hover:bg-primary sm:hover:text-secondary rounded-lg' hidden />
                <NavbarIcon path='/menu' icon={Menu} text='Menu' className='w-full sm:hidden sm:hover:bg-primary sm:hover:text-secondary rounded-lg' hidden={false} />
                <div className="w-full hidden sm:flex items-center justify-center">
                    <NotificationSheet notifications={notifications}>
                        <div className='w-full sm:hover:bg-primary sm:hover:text-secondary rounded-lg justify-center lg:justify-start items-center gap-2 p-2 cursor-pointer hidden sm:flex' onClick={getNotification}>
                            <Bell size={25} strokeWidth={2} />
                            <span className="hidden lg:inline-block">Notification</span>
                        </div>
                    </NotificationSheet>
                </div>
                <NavbarIcon path='/messages' icon={MessageCircle} text='Private Chat' className='w-full sm:hover:bg-primary sm:hover:text-secondary rounded-lg' hidden={false} />
                <NavbarIcon path='/group' icon={Users} text='Group Chat' className='w-full sm:hover:bg-primary sm:hover:text-secondary rounded-lg' hidden />
                <NavbarIcon path={`/ai/${AIConvetsationId}`} icon={BotMessageSquare} text='Chat Bot' className='w-full sm:hover:bg-primary sm:hover:text-secondary rounded-lg' hidden />
                <NavbarIcon path={`/profile/${user?.username}`} icon={CircleUser} text='Profile' className='w-full sm:hover:bg-primary sm:hover:text-secondary rounded-lg' hidden={false} />
            </div>
            <MenuDropDown />
        </div>
    )
}

export default Navbar