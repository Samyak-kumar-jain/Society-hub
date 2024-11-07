import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react'; // Import the search icon from lucide-react
import { useDispatch, useSelector,} from "react-redux";
import { fetchAllSociety } from '../../Features/SocietySlice/SocietySlice';
import SocietyCard from './SocietyCard';
import cardsData from '../../data/JoinSocietyData';


const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Track authentication status
  const [searchTerm, setSearchTerm] = useState(""); // Track search input

  const dispatch = useDispatch();
  const { societyList } = useSelector((state) => state.adminSociety);
  
  useEffect(() => {
    dispatch(fetchAllSociety());
  }, [dispatch]);
  
  // Filter societies based on search term
  const filteredSocieties = societyList.filter((society) =>
    society.societyName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:px-20 px-6 lg:pt-14 md:pt-14 pt-5 pb-9">
        <div className="bg-[#273142] h-[40vh] md:h-[370px] w-full border border-[#313d4f] rounded-xl flex flex-col items-center justify-center text-white space-y-6 p-4">
          <div className="text-center space-y-1">
            <span className="text-3xl md:text-5xl font-semibold block">
              Find the right
              <span className="text-3xl md:text-5xl font-semibold text-[#ff6b35] ml-2">Society</span>
            </span>
            <span className="text-3xl md:text-5xl font-semibold block">that matches your interest</span>
          </div>

          {/* Search Bar */}
          <div className="bg-white p-1 flex items-center rounded-md shadow-md lg:mt-4 w-full md:w-3/4 max-w-sm  md:mt-4">
            <input
              type="text"
              placeholder="Search societies"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow outline-none px-2 py-2 text-gray-700 rounded-l-md text-sm md:text-base"
            />
            <button className="bg-[#4c82ff] text-white px-3 py-2 rounded-md font-semibold flex items-center justify-center">
              <Search className="h-5 w-5" /> {/* Icon added here */}
            </button>
          </div>
        </div>
      </div>

      {/* Societies Section */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-28 mt-2 md:mt-5 lg:mt-9">
        <div className="">
          <p className="text-start text-2xl md:text-3xl lg:text-4xl text-white font-semibold w-full flex justify-center">
            Popular Societies
          </p>
          <div className="relative mt-10 mb-7 overflow-x-auto">
            <div className="flex lg:gap-8 md:gap-8 space-x-11 lg:space-x-0 p-5 overflow-x-auto">
              {filteredSocieties.length > 0 ? (
                filteredSocieties.map((society) => (
                  <SocietyCard
                    societyId = {society._id}
                    key={society._id}
                    imageUrl={society.image}
                    title={society.societyName}
                    isAuthenticated={isAuthenticated}
                  />
                ))
              ) : (
                <p className="text-center text-white">No societies found</p>
              )}
            </div>
          </div>
        </div>
      </div>
       {/* why join society */}
       <div className="flex flex-col space-y-4 md:px-20 px-6 ">
      <p className="flex justify-center items-center lg:text-5xl md:text-5xl text-4xl lg:mb-11 mb-5 lg:mt-16 mt-9 text-yellow-200">
        Why join a society
      </p>
      <div className="flex flex-wrap gap-6 justify-center">
        {cardsData.map((card) => (
           <div className={`bg-[#273142] px-8 py-4 space-y-3 ${card.roundedCorners}`}>
           <h2 className="text-lg text-yellow-200">{card.title}</h2>
           <p className="w-72 text-white text-md">{card.description}</p>
         </div>
        ))}
      </div>
    </div>

    
    {/*ready to join */}
    <div className="flex justify-center items-center mt-5 mb-6 w-full min-h-96 bg-[#1c2534] px-4">
        <div className="bg-[#2a3648] text-center p-5 md:p-10 rounded-lg shadow-lg w-full max-w-5xl ">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-100 mb-4">
            Ready To <span className="text-orange-500">Join</span>?
          </h2>
          <p className="text-gray-300 mb-4 md:mb-8 text-lg md:text-xl flex justify-center text-center">
            Start exploring societies, join events, and become part of our vibrant campus community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-14 justify-center">
            <button className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition-colors">
              Explore Societies
            </button>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors">
              Sign Up Now
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
