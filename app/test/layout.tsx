'use client';
import { SidebarComponent } from '@/components/SidebarComponent';
import React, { useState } from 'react'
import '@/app/globals.css'
import { MenuIcon } from '@/components/icons/MenuIcon';

export default function AdminLayout(

    {children}:Readonly<{children:React.ReactNode;}>

) {

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)    

    console.log('sidebarOpen', sidebarOpen)

    return (
    
    <html>
        <body className="flex  none-scroll-bar">

            <header>

            </header>

            {/* // MenuIcon */}

            <MenuIcon onClick={() => setSidebarOpen(!sidebarOpen)} classname='w-8 h-8 bottom-0 m-4 fixed cursor-pointer lg:hidden '/>

            <aside className={`h-screen ${ sidebarOpen && 'hidden' } lg:block sticky left-0 z-10`}>

                <SidebarComponent/>
            
            </aside>

         
            <main className='flex-1  '>

                {children}

            </main>

            <footer>

            </footer>

        </body>
    </html>

)
}
