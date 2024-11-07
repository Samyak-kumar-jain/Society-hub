import React from "react";
import {Link } from "react-router-dom"

const SocietyCard = ({ societyId,title, imageUrl, isAuthenticated }) => {
  return (
    <div className="lg:w-52 md:w-44 w-72 flex-shrink-0 p-4 bg-[#273142] border border-[#313d4f] rounded-lg shadow-lg text-center text-white cursor-pointer 
      transform transition duration-300 hover:bg-gradient-to-r hover:from-[#2d3748] hover:to-[#1a202c]  ">
      
      <h3 className="text-md font-semibold flex justify-start text-start mb-6">{title}</h3>
      <img src={imageUrl} alt={title} className="w-full md:h-40 lg:h-40 h-44 rounded-lg lg:object-cover object-fill  mb-2 shadow-lg" />
      
      {isAuthenticated && (
        <Link to ={`/student/society/${societyId}`}>
        <button className="mt-5 px-4 py-1 bg-[#4c82ff] hover:bg-[#2a54b7] text-sm rounded-md w-full">
          View More
        </button></Link>
      )}
    </div>
  );
};

export default SocietyCard;
