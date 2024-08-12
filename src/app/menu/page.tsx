import Header from '@/components/newDesign/Header'
import MenuNavigation from '@/components/newDesign/MenuNavigation'
import { Bookmark, BotMessageSquare, Bug, KeyRound, LogOut, Palette, Trash, Upload, User } from 'lucide-react'
import React from 'react'

const page = () => {
    return (
        <>
            <Header>
                <div className='w-full h-12 flex items-center justify-center'>
                    <h2>Menu</h2>
                </div>
            </Header>
            <div>
                <MenuNavigation href='/upload' icon={Upload} text='Upload Content' />
                <MenuNavigation href='/ai/1' icon={BotMessageSquare} text='Ai Chatting' />
                <MenuNavigation href='/setting/profile' icon={User} text='Edit Profile' />
                <MenuNavigation href='/ai' icon={KeyRound} text='Change Password' />
                <MenuNavigation href='/ai' icon={Bookmark} text='Saved Content' />
                <MenuNavigation href='/ai' icon={Palette} text='Change Theme' />
                <MenuNavigation href='/ai' icon={Bug} text='Report a Problem' />
                <MenuNavigation href='/ai' icon={LogOut} text='Log out' />
                <MenuNavigation href='/ai' icon={Trash} text='Delete Account' />
            </div>
        </>
    )
}

export default page