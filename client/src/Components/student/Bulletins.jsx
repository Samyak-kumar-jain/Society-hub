import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { joinSociety, leaveSociety, societyBulletinsById } from '../../Features/SocietySlice/eachSocietyBulletin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const Bulletins = ({ societyId }) => {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isMember } = useSelector((state) => state.eachBuletin);
  const { isAuthenticated } = useSelector((state) => state.authen);
  const { bulletinsBySociety } = useSelector((state) => state.eachBuletin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      setOpenLoginDialog(true);
    } else {
      if (!bulletinsBySociety[societyId] || bulletinsBySociety[societyId].data.length === 0) {
        dispatch(societyBulletinsById(societyId));
      }
    }
  }, [isAuthenticated, societyId, dispatch, bulletinsBySociety]);

  const bulletins = bulletinsBySociety[societyId]?.data || [];

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenLoginDialog(false);
      toast.success("Login successful!");
    }, 3000);
  };

  const handleJoinSociety = () => {
    setLoading(true);
    dispatch(joinSociety(societyId))
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          toast.success("You have successfully joined the society!");
          if (!bulletins.length) {
            dispatch(societyBulletinsById(societyId));
          }
        }, 3000);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Error joining the society.");
      });
  };

  const handleLeaveSociety = () => {
    setLoading(true);
    dispatch(leaveSociety(societyId))
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          toast.info("You have left the society.");
        }, 3000);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Error leaving the society.");
      });
  };

  const handleCloseDialog = () => {
    setOpenLoginDialog(false);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen relative">
      <ToastContainer position="top-right" autoClose={3000} />
      <Backdrop open={loading} style={{ zIndex: 1300 }} >
        <CircularProgress size={30} color="blue" />
      </Backdrop>
      {openLoginDialog && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 relative">
            <button
              onClick={handleCloseDialog}
              className="absolute top-2 right-2 text-white text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-blue-600">Login Required</h2>
            <p className="mb-4">Please log in to see events of the society</p>
            <div className="flex justify-end">
              <button
                onClick={handleLogin}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
      {isAuthenticated && !loading && (
        <div className="max-w-lg mx-auto mt-6 border border-gray-600 bg-gray-800 p-6 rounded-lg shadow-md text-center">
          {!isMember ? (
            <>
              <p className="text-gray-100 mb-4 text-bold text-xl">To see the bulletins and join the society</p>
              <button
                onClick={handleJoinSociety}
                className="bg-orange-600 text-white px-4 py-2 rounded"
              >
                Join Society
              </button>
            </>
          ) : (
            <button
              onClick={handleLeaveSociety}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Leave Society
            </button>
          )}
        </div>
      )}
      {isAuthenticated && isMember && !loading && (
        <div className="w-full mt-8 p-2 rounded-lg shadow-md">
          <div className="gap-6">
            {bulletins.length > 0 ? (
              bulletins.map((bulletinItem, index) => (
                <div key={index} className="border border-gray-700 p-4 rounded-lg shadow-md flex flex-col justify-between w-full">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">{bulletinItem.title}</h3>
                  <p className="text-gray-300 mb-4">{bulletinItem.description}</p>
                  <div className="mt-auto">
                    <p className="text-sm text-gray-400">Posted by: {bulletinItem.author}</p>
                    <p className="text-sm text-gray-400">Date: {bulletinItem.date}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">No bulletins available at the moment.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Bulletins;
