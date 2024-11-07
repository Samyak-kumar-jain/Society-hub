import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteSociety, fetchAdminSocieties, fetchAllSociety } from "../../Features/SocietySlice/SocietySlice";
import { Edit, Trash2 } from 'lucide-react';

const SocietyCard = ({
  description,
  contactEmail,
  societyName,
  contactPhone,
  socialMediaLinks,
  meetingFrequency,
  handleButtonClick,
  setCurrentEditId,
  societyId,
  logo,
  societyImage,
}) => {
  const dispatch = useDispatch();

  const handleDelete = async (societyId) => {
    const resultAction = await dispatch(deleteSociety(societyId));
    if (resultAction?.payload?.success) {
      dispatch(fetchAdminSocieties());
      dispatch(fetchAllSociety());
    }
  };

  return (
    <div className="w-full max-w-[300px] lg:max-w-full flex flex-col m-4 p-6 bg-[#1B2431] transition duration-300 hover:shadow-lg rounded-xl shadow-xl ">
      {/* Logo in Top Left Corner */}
      <div className="flex justify-start mb-4">
        {logo ? (
          <img
            src={logo}
            alt="Society Logo"
            className="w-12 h-12 rounded-full object-contain border-2 border-[#67a4ff] shadow-lg transform transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center shadow-md text-gray-300 text-sm p-1">
            <span>No Logo</span>
          </div>
        )}
      </div>

      {/* Main Content Container */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center sm:gap-6">
        {/* Left: Society Image or Placeholder */}
        <div className="flex-shrink-0">
          {societyImage ? (
            <img
              src={societyImage}
              alt="Society"
              className="w-48 h-40 object-cover rounded-md border-2 border-[#67a4ff] shadow-lg transform transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-48 h-40 bg-gray-800 flex items-center justify-center text-white rounded-md shadow-md">
              <span className="text-gray-300">No Image</span>
            </div>
          )}
        </div>

        {/* Right: Society Details */}
        <div className="flex-grow flex flex-col justify-between bg-gray-900 p-3 rounded-xl w-full ">
          <div>
            {/* Header: Title, Email, Phone */}
            <h2 className="text-[#67a4ff] font-extrabold text-xl mb-2 sm:text-2xl">{societyName}</h2>
            <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-400 mb-2">
              <span className="truncate">{contactEmail}</span>
              <span className="text-[#67a4ff]">{contactPhone}</span>
            </div>

            {/* Description */}
            <p className="text-sm font-normal text-gray-300 line-clamp-3">{description}</p>

            {/* Additional Information */}
            <div className="flex flex-col gap-2 mt-4">
              <p className="text-sm font-normal text-gray-500">
                <strong>Social Media Links:</strong> {socialMediaLinks || "N/A"}
              </p>
              <p className="text-sm font-normal text-gray-500">
                <strong>Meeting Frequency:</strong> {meetingFrequency || "N/A"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4 justify-end">
            {/* Edit Icon */}
            <button
              className="flex items-center justify-center w-8 h-8 bg-[#67a4ff] hover:bg-[#4b8cc2] text-white rounded-full shadow transition-transform transform hover:scale-110"
              onClick={() => {
                handleButtonClick();
                setCurrentEditId(societyId); // Pass the current society ID for editing
              }}
              aria-label="Edit Society"
            >
              <Edit size={16} />
            </button>
            {/* Delete Icon */}
            <button
              className="flex items-center justify-center w-8 h-8 bg-red-600 hover:bg-red-500 text-white rounded-full shadow transition-transform transform hover:scale-110"
              onClick={() => handleDelete(societyId)}
              aria-label="Delete Society"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocietyCard;
