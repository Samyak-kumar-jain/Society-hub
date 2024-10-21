// Header.js
import React from 'react';
import { AlignJustify, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { openDrawer } from '../../Features/AuthSlice/slideBarSlice';
import { logoutnUser } from '../../Features/AuthSlice/authSlice';

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutnUser());
  };

  return (
    <div className='flex sticky items-center bg-[#273142] justify-between px-4 py-3 bg-background '>
      <button onClick={() => dispatch(openDrawer())}>
        <span className='sr-only'>Toggle Menu</span>
        <AlignJustify className='text-[#4880FF]' />
      </button>
      <div className="flex flex-1 justify-end">
        <button onClick={handleLogout} className="flex items-center gap-2 bg-gray-900 hover:bg-[#4880FF] text-teal-50 text-sm border border-white px-3 py-2 rounded-md hover:border-black transition-all duration-300 ease-in-out active:scale-95">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
