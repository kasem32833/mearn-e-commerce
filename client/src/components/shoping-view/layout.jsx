import React from 'react'
import { Outlet } from 'react-router-dom'
import ShopingHeader from './header'

const ShopingLayout = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
        {/* common Header */}
        <ShopingHeader />
        <p>This is shopping home or layout page</p>
        <main className='flex flex-col w-full'>
            <Outlet></Outlet>
        </main>
    </div>
  )
}

export default ShopingLayout