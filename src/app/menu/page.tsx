import Header from '@/components/newDesign/Header'
import Menu from '@/components/newDesign/MenuNavigation'
import React from 'react'

const page = () => {
    return (
        <>
            <Header>
                <div className='w-full h-12 flex items-center justify-center'>
                    <h2>Menu</h2>
                </div>
            </Header>
            <Menu />
        </>
    )
}

export default page