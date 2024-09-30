import React from 'react'

const Header = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full bg-background fixed top-0 left-0 flex flex-row items-center justify-between z-50 sm:pl-12 md:pl-14 lg:pl-56'>
            {children}
        </div>
    )
}

export default Header