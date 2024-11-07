import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import SocietyForm from '../../Components/Admin/SocietyForm';
import { fetchAdminSocieties, fetchAllSociety } from '../../Features/SocietySlice/SocietySlice';
import { useDispatch, useSelector } from 'react-redux';
import SocietyCard from '../../Components/Admin/societyCard';
import { PlusCircle } from 'lucide-react'; // Import an icon from lucide-react


const Socities = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [isClosing, setClosing] = useState(false);
  const dispatch = useDispatch();
  const { admin = [] } = useSelector(state => state.adminSociety); // Access the society list from Redux
  const [currentEditId, setCurrentEditId] = useState(null);
  
  // Pagination state
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 6; // Set the number of items per page

  // // Calculate the index range of the societies to be displayed
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = admin.slice(indexOfFirstItem, indexOfLastItem);

  // Total pages calculation
  // const totalPages = Math.ceil(admin.length / itemsPerPage);

  const handleButtonClick = () => {
    setFormVisible(true);
    setClosing(false);
  };

  useEffect(() => {
    dispatch(fetchAdminSocieties());
     // Fetch all societies on mount
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
          <div className='overflow-y-auto flex flex-row flex-wrap rounded-lg lg:justify-start md:justify-start justify-center h-full'>
            {admin.length > 0 ? (
              admin.map((societyItem) => (
                <SocietyCard
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
                  societyImage={societyItem.image}
                  logo={societyItem.logo}
                />
              ))
            ) : (
              <div onClick={handleButtonClick}  className="text-gray-600 text-3xl md:text-4xl lg:text-4xl w-full flex h-[50vh] md:h-[70vh] ml-0 md:ml-[20vh] justify-center cursor-pointer items-center">
              <PlusCircle className="mr-2 w-5 h-5 mt-1" /> {/* Add icon here */}
              Create your society
            </div>

            )}
          </div>

       
        </div>

        {admin && admin.length === 0 ? (
  <button
    onClick={() => {
      handleButtonClick();
      setCurrentEditId(null); // Reset for creating a new society
    }}
    className='flex items-center gap-2 bg-gray-900 px-4 py-2 text-white hover:bg-[#4880FF] border border-[#264388] rounded-md transition-all duration-300 ease-in-out ml-auto h-10 mt-4 lg:mt-0'
  >
    <Plus />
    <span className='whitespace-nowrap'>Add Society</span>
  </button>
) : null}

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

export default Socities;
