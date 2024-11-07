import React from 'react';
import { AlignJustify, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { openDrawer } from '../../Features/AuthSlice/slideBarSlice';
import { logoutnUser } from '../../Features/AuthSlice/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authen);

  const handleLogout = () => {
    dispatch(logoutnUser());
  };

  return (
    <div className='flex sticky items-center bg-[#273142] justify-between px-4 py-3 bg-background'>
      {/* Left: Menu Button */}
      <button onClick={() => dispatch(openDrawer())}>
        <span className='sr-only'>Toggle Menu</span>
        <AlignJustify className='text-[#4880FF]' />
      </button>

      {/* Middle: Search Bar */}
      <div className='flex flex-1 justify-center mx-2'>
        <input
          type='text'
          placeholder='Search...'
          className='w-full md:w-1/2 lg:w-1/3 px-4 py-2  bg-gray-800 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4880FF] transition-all duration-200'
        />
      </div>

      {/* Right: Avatar and Logout Button */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Circular Avatar */}
        <div className='w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center'>
          <p className='w-full h-full rounded-full object-cover text-white flex items-center justify-center text-lg'>
            {user.email[0]}
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 bg-gray-900 hover:bg-[#4880FF] text-teal-50 text-sm border border-gray-900 px-2 py-1 rounded-md hover:border-black transition-all duration-300 ease-in-out active:scale-95"
        >
          <LogOut className="w-5 h-5" />
          <span className="hidden md:block">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
