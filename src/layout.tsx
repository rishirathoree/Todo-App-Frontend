import React from 'react'
import Appnavbar from '@/components/ui/app-navbar'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex justify-between lg:w-8/12 md:w-10/12 sm:w-full mx-auto h-screen'>
            <div className='w-full overflow-hidden overflow-y-scroll scrollbar-hidden h-screen '>
                <Appnavbar />
                {children}
                </div>
        </div>
    )
}

export default Layout