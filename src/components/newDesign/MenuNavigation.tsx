import { LucideProps } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const MenuNavigation = ({ icon: Icon, href, text }: { icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>, href: string, text: string }) => {

    const color = text === "Delete Account" ? "text-red-600" : ""

    return (
        <div className='h-14 border-b border-slate-200 justify-center px-4'>
            <Link href={href}>
                <div className='flex items-center gap-x-4 w-full h-full'>
                    <Icon size={30} className={color}/>
                    <h3 className={`text-lg ${color}`}>{text}</h3>
                </div>
            </Link>
        </div>
    )
}

export default MenuNavigation