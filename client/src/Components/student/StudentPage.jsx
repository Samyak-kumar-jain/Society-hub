import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentHeader from './StudentHeader'
import Footer from './Footer'


const StudentPage = () => {
  return (
    <div className='flex flex-col bg-[#1b2431]  '>
        <StudentHeader/>
      

      <div className='flex flex-col w-full bg-[#1b2431] min-h-screen  '>
        <Outlet/> 
      </div>
      <Footer></Footer>
    </div>
  )
}

export default StudentPage