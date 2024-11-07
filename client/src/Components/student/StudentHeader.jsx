import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StudentHeader = () => {
    const [activeItem, setActiveItem] = useState(null); // Track the active item

    const menuItems = [
        { to: "/Student/home", label: "Home", id: "home" },
        { to: "/Student/about", label: "About", id: "about" },
        { to: "/Student/societies", label: "Societies", id: "societies" },
        { to: "/Student/events", label: "Events", id: "events" },
    ];

    // Update the active item on click
    const handleItemClick = (id) => {
        setActiveItem(id);
    };

    return (
        <div className=" bg-[#273142] h-16 p-6 text-white flex items-center shadow-md gap-14">
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
                                ? 'text-[#ff6b35] border-b-2 border-[#ff6b35]' // Active item styles
                                : 'hover:text-[#4c82ff] hover:border-b-2 hover:border-[#4c82ff]' // Hover styles
                        }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>

            <div className="flex gap-4">
                <button className="bg-[#ff6b35] text-lg text-white py-1 px-7 rounded-2xl">
                    Login
                </button>
                <button className="bg-[#4880ff] text-white text-lg py-1 px-7 rounded-2xl">
                    Register
                </button>
            </div>
        </div>
    );
};

export default StudentHeader;
