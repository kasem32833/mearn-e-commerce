import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './sidebar'
import AdminHeader from './header'

const AdminLayout = () => {
  return (
    <div className='flex min-h-screen w-full'>
        {/* admin sidebar */}
        <AdminSidebar />
        <div className="flex flex-1 flex-col">
            {/* admin header */}
            <AdminHeader />
            <main className='flex bg-neutral-200 h-full '>
                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default AdminLayout