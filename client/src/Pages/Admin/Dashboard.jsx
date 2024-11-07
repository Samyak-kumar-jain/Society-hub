import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import SocietyForm from '../../Components/Admin/SocietyForm';
import { fetchAdminSocieties, fetchAllSociety } from '../../Features/SocietySlice/SocietySlice';
import { useDispatch, useSelector } from 'react-redux';
import DashboardCard from '../../Components/Admin/DashboardCard';

const Dashboard = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [isClosing, setClosing] = useState(false);
  const dispatch = useDispatch();
  const { societyList } = useSelector((state) => state.adminSociety); // Access the society list from Redux
  const [currentEditId, setCurrentEditId] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Set the number of items per page

  // Calculate the index range of the societies to be displayed
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = societyList.slice(indexOfFirstItem, indexOfLastItem);

  // Total pages calculation
  const totalPages = Math.ceil(societyList.length / itemsPerPage);

  const handleButtonClick = () => {
    setFormVisible(true);
    setClosing(false);
  };

  useEffect(() => {
    dispatch(fetchAllSociety()); // Fetch all societies on mount
  }, [dispatch]);

  const handleCloseForm = () => {
    setClosing(true);
    setTimeout(() => {
      setFormVisible(false);
    }, 300);
  };

  // Function to change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className='p-4 w-full border border-[#264388] rounded-2xl flex flex-col-reverse lg:flex-row bg-gray-900'>
        <div className='w-full flex flex-col p-4 overflow-y-auto'>
          <div className='overflow-y-auto flex flex-row flex-wrap rounded-lg lg:justify-start md:justify-start justify-center'>
            {currentItems.length > 0 ? (
              currentItems.map((societyItem) => (
                <DashboardCard
                  key={societyItem._id}
                  handleButtonClick={handleButtonClick}
                  isEditMode={currentEditId !== null}
                  currentEditId={currentEditId}
                  setCurrentEditId={setCurrentEditId}
                  societyType={societyItem.societyType}
                  societyName={societyItem.societyName}
                  contactEmail={societyItem.contactEmail}
                  contactPhone={societyItem.contactPhone}
                  socialMediaLinks={societyItem.socialMediaLinks}
                  description={societyItem.description}
                  meetingFrequency={societyItem.meetingFrequency}
                  societyId={societyItem._id}
                />
              ))
            ) : (
              <div className='text-gray-600 justify-center items-center'>No societies available</div>
            )}
          </div>

          {/* Pagination Controls */}
          {societyList.length > itemsPerPage && (
            <div className='flex justify-center mt-auto'>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`mx-2 px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-[#4880FF] text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {isFormVisible && (
        <div
          className={`fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-end z-50 transition-opacity duration-300 ease-in-out ${isClosing ? 'opacity-0' : 'opacity-100'}`}
          onClick={handleCloseForm}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <SocietyForm
              onClose={handleCloseForm}
              isEditMode={currentEditId !== null}
              currentEditId={currentEditId}
              setCurrentEditId={setCurrentEditId}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
