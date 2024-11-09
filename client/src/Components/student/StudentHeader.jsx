import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react'; // Import LogOut icon from lucide-react
import { logoutnUser } from '../../Features/AuthSlice/authSlice';
import CircularProgress from '@mui/material/CircularProgress'; // Material UI loader

const StudentHeader = () => {
    const [activeItem, setActiveItem] = useState("home");
    const { isAuthenticated, user } = useSelector((state) => state.authen);
    const dispatch = useDispatch();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const menuItems = [
        { to: "/Student/home", label: "Home", id: "home" },
        { to: "/Student/about", label: "About", id: "about" },
        { to: "/Student/societies", label: "Societies", id: "societies" },
        { to: "/Student/events", label: "Events", id: "events" },
    ];

    const handleItemClick = (id) => {
        setActiveItem(id);
    };

    const handleLogout = () => {
        setIsLoggingOut(true);

        setTimeout(() => {
            dispatch(logoutnUser());
            setIsLoggingOut(false);
        }, 3000);
    };

    return (
        <div className="bg-[#273142] h-16 p-6 text-white flex items-center shadow-md gap-14">
            <div className="flex gap-2">
                <span className="text-3xl text-[#4c82ff] font-bold">Society</span>
                <span className="text-3xl text-[#ff6b35] font-bold">Hub</span>
            </div>

            <div className="flex gap-7 items-center flex-grow">
                {menuItems.map((item) => (
                    <Link
                        key={item.id}
                        to={item.to}
                        onClick={() => handleItemClick(item.id)}
                        className={`text-lg px-3 py-1 transition-all duration-300 ${
                            activeItem === item.id
                                ? 'text-[#ff6b35] border-b-2 border-[#ff6b35]'
                                : 'hover:text-[#4c82ff] hover:border-b-2 hover:border-[#4c82ff]'
                        }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>

            <div className="flex gap-4">
                {isAuthenticated ? (
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                            {user?.email?.charAt(0).toUpperCase()}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-[#ff6b35] text-lg text-white py-1 px-7 rounded-2xl flex items-center gap-2"
                            disabled={isLoggingOut}
                        >
                            {isLoggingOut ? (
                                <CircularProgress size={24} color="inherit" /> // Material UI loader
                            ) : (
                                <>
                                    <LogOut size={20} /> Logout
                                </>
                            )}
                        </button>
                    </div>
                ) : (
                    <>
                    <Link to =  "/auth/login">
                        <button className="bg-[#ff6b35] text-lg text-white py-1 px-7 rounded-2xl">
                            Login
                        </button>
                        </Link>
                        <Link to =  "/auth/register">
                        <button className="bg-[#4880ff] text-white text-lg py-1 px-7 rounded-2xl">
                            Register
                        </button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default StudentHeader;
