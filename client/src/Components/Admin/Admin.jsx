import React from 'react'

import { Outlet } from 'react-router-dom'
import Header from "../../Components/Admin/Header"
import TemporaryDrawer from './Slidebar'

const Admin = () => {
  
  return (
   <div className='flex  min-h-screen w-full bg-[#1B2431]'>
   
   <TemporaryDrawer/>

    <div className='flex flex-1 flex-col'>
           <Header/>
           
           
           
      

        <div className='flex-1 flex  bg-muted/40  md:p-6'>
        
        <Outlet/>

        </div>
    </div>
   </div>
  )
}

export default Admin 