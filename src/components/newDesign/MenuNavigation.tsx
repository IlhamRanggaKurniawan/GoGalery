"use client"

import apiClient from '@/lib/apiClient'
import { useSession } from '@/lib/hooks/useSession'
import { Bookmark, BotMessageSquare, Bug, KeyRound, LogOut, Palette, Trash, Upload, User } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const MenuNavigation = ({ icon: Icon, href, text, type }: { icon: React.ElementType, href?: string, text: string, type?: string }) => {
    const color = text === "Delete Account" ? "text-red-600" : ""
    const { theme, setTheme } = useTheme();
    const { user } = useSession()
    const router = useRouter()

    const logout = async () => {
        try {
            await apiClient.delete(`/v1/user/logout`)

            localStorage.clear()

            router.push("/login")
        } catch (error) {
            console.error(error)
        }
    }

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const fn = type === "theme" ? toggleTheme : logout

    return (
        <div className='h-14 border-b border-slate-200 justify-center px-4'>
            {href ? (
                <Link href={href}>
                    <div className='flex items-center gap-x-4 w-full h-full'>
                        <Icon size={30} className={color} />
                        <h3 className={`text-lg ${color}`}>{text}</h3>
                    </div>
                </Link>
            ) : (
                <div className='flex items-center gap-x-4 w-full h-full' onClick={fn}>
                    <Icon size={30} className={color} />
                    <h3 className={`text-lg ${color}`}>{text}</h3>
                </div>
            )}
        </div>
    )
}

const Menu = () => {
    return (
        <div className='mt-10'>
            <MenuNavigation href='/upload' icon={Upload} text='Upload Content' />
            <MenuNavigation href='/ai/1' icon={BotMessageSquare} text='Ai Chatting' />
            <MenuNavigation href='/setting/profile' icon={User} text='Edit Profile' />
            <MenuNavigation href='/setting/password' icon={KeyRound} text='Change Password' />
            <MenuNavigation href='/saved' icon={Bookmark} text='Saved Content' />
            <MenuNavigation icon={Palette} text='Change Theme' type='theme' />
            <MenuNavigation href='/setting/problem' icon={Bug} text='Report a Problem' />
            <MenuNavigation icon={LogOut} text='Log out' type='logout' />
            <MenuNavigation href='/setting/delete' icon={Trash} text='Delete Account' />
        </div>
    )
}

export default Menu