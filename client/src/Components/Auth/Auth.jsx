import React from 'react'
import { Outlet } from 'react-router-dom'

const Auth = () => {
  return (
    <div className='flex min-h-screen w-full'>
        <div className="hidden lg:flex items:center justify-center bg-blue-800 w-1/2 px-12">
        <div className='max-w-md text-center flex text-primary-foreground justify-center items-center'>
          <div className='flex flex-col space-y-5'>
            <h1 className='tracking-tight text-7xl font-extrabold justify-center text-white'>
                S o c i e t y
            </h1>
            <h2 className='text-7xl font-extrabold tracking-tight text-white'>H u b </h2>
            </div>
        </div>
        </div>
        <div className='flex flex-1 items-center
        justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
            <Outlet/>

        </div>

    </div>
  )
}

export default Auth