import React, { useState } from 'react';
import { Edit2Icon, Trash2 } from 'lucide-react';

const BulletinCard = ({ bulletininfo, handleDeleteBulletin, handleEditBulletin }) => {
  const [borderColor, setBorderColor] = useState('border-gray-700');

  return (
    <div className={`border ${borderColor} rounded-lg p-4 transition-colors duration-200 `}>
    <div className="grid gap-3 mt-4 border-gray-600 p-4 max-w-full overflow-hidden">
  <label className="bg-gray-800 rounded-lg p-2 leading-6 text-sm font-semibold border border-gray-600 text-gray-200 w-full">
    Title: {bulletininfo?.title}
  </label>
  
  <label className='text-gray-300 w-full overflow-hidden overflow-ellipsis whitespace-nowrap'>
    Description: <span className='overflow-wrap break-words text-gray-400 '>{bulletininfo?.description}</span>
  </label>
  
  <label className='text-gray-300  w-full overflow-hidden overflow-ellipsis whitespace-nowrap'>
    Link: <span className='overflow-wrap break-words text-gray-400 '>{bulletininfo?.link}</span>
  </label>
  
  <label className='text-gray-300  w-full overflow-hidden overflow-ellipsis whitespace-nowrap'>
    Venue: <span className='text-gray-400  overflow-wrap break-words'>{bulletininfo?.venue}</span>
  </label>
  
  <label className='text-gray-300  w-full overflow-hidden overflow-ellipsis whitespace-nowrap'>
    Society Name: <span className='overflow-wrap break-words text-gray-400 '>{bulletininfo?.societyName}</span>
  </label>
</div>

      <div className="flex justify-between items-center gap-5 mt-4">
        <button
          onClick={() => handleEditBulletin(bulletininfo)}
          className="flex justify-center items-center w-full bg-slate-800 rounded-lg p-2 hover:bg-green-500"
          onMouseEnter={() => setBorderColor('border-green-500')}
          onMouseLeave={() => setBorderColor('border-gray-700')}
        >
          <Edit2Icon className="text-white text-sm w-5 h-5" />
        </button>
        <button
          onClick={() => handleDeleteBulletin(bulletininfo)}
          className="flex justify-center items-center w-full bg-slate-800 rounded-lg p-2 hover:bg-red-500"
          onMouseEnter={() => setBorderColor('border-red-500')}
          onMouseLeave={() => setBorderColor('border-gray-700')}
        >
          <Trash2 className="text-white text-sm w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default BulletinCard;
