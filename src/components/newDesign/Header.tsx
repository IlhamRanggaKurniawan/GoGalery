import React from 'react'

const Header = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full h-fit bg-background sticky top-0 flex-row items-center px-4 justify-between '>
            {children}
        </div>
    )
}

export default Header