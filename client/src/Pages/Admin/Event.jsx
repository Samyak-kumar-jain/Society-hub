import React from 'react'
import { Bulletin } from '../../Components/Admin/Bulletin'

const Event = () => {
  return (
    <div className='p-4 w-full border border-[#264388] rounded-2xl flex flex-col-reverse lg:flex-row bg-gray-900'>
    <div className=' container mx-auto grid grid-cols-1 gap-8 py-8'>
      <Bulletin/>
     
    </div>
    </div>
  )
}

export default Event