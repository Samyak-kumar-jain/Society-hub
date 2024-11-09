import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSocietyByID } from '../../Features/SocietySlice/userSocietySlice';
import LabTabs from '../../Components/student/Tabs';
import { Backdrop, CircularProgress, Box } from '@mui/material'; // Import Backdrop

const SocietyPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { societyData, loading, error } = useSelector((state) => state.society);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    dispatch(getSocietyByID(id));
  }, [dispatch, id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showLoading) {
    return (
      <Backdrop
        sx={{
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent dark background
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backdropFilter: 'blur(1px)', // Optional blur effect
        }}
        open={showLoading}
      >
        <CircularProgress size={30} sx={{ color: '#4c82ff' }} />
        <Box sx={{ marginTop: 2 }}>
          <p className="text-center ml-3 text-1xl font-bold text-blue-800"></p>
        </Box>
      </Backdrop>
    );
  }

  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

  return (
    <div className='p-3 '>
      <div className="flex flex-col lg:p-8 md:p-8 p-3 w-full min-h-screen border border-[#313d4f] bg-gray-900 text-gray-200 shadow-lg rounded-xl ">
        <header className="text-center mb-12 flex justify-between items-center">
          <h1 className="lg:text-3xl text-xl font-extrabold text-[#4c82ff] lg:mb-2 mb-1">{societyData?.societyName.toUpperCase()}</h1>
          <p className="text-lg font-medium text-gray-400">{societyData?.societyType}</p>
          <div className="flex-none">
            <img
              src={societyData?.logo}
              alt={`${societyData?.societyName} logo`}
              className="lg:w-14 lg:h-14 md:w-14 md:h-14 w-10 h-10 object-fill rounded-full border-2 border-gray-700 shadow-lg"
            />
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-10 mb-12 items-start">
          <div className="flex-grow rounded-lg-3xl">
            <img
              src={societyData?.image}
              alt={`${societyData?.societyName}`}
              className="w-full lg:h-[100vh] md:h-[70vh] object-fill rounded-lg shadow-lg border border-gray-700 flex justify-end brightness-95"
            />
          </div>
        </div>

        <LabTabs societyId={id} />
      </div>
    </div>
  );
};

export default SocietyPage;
