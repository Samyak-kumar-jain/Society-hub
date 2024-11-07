import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteSociety, fetchAdminSocieties, fetchAllSociety } from "../../Features/SocietySlice/SocietySlice";
import { Edit, Trash2 } from 'lucide-react'; // Import icons from lucide-react

const DashboardCard = ({
  description,
  contactEmail,
  societyName,
  contactPhone,
  socialMediaLinks,
  meetingFrequency,
  handleButtonClick,
  setCurrentEditId,
  societyId,
}) => {
  const dispatch = useDispatch();

  const handleDelete = (societyId) => {
    dispatch(deleteSociety(societyId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAdminSocieties());
      }
    });
  };

  return (
    <div className="w-[300px] flex flex-col gap-4 border border-[#244c89] m-4 p-4 bg-[#1B2431] transition duration-200 hover:shadow-xl h-auto rounded-xl shadow-2xl">
      {/* Header: Title, Email, Phone */}
      <div className="flex flex-col-reverse">
        <h2 className="text-[#67a4ff] font-extrabold text-3xl truncate">
          {societyName}
        </h2>
        
      </div>

      <div className="flex justify-between text-sm text-gray-400 gap-5">
        <span className='truncate'>{contactEmail}</span>
        <span className="text-[#67a4ff]">{contactPhone}</span>
      </div>

      {/* Description */}
      <p className="text-sm font-normal text-gray-300 line-clamp-3">{description}</p>

      {/* Additional Information */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-normal text-gray-500">
          <strong>Social Media Links:</strong> {socialMediaLinks || "N/A"}
        </p>
        <p className="text-sm font-normal text-gray-500">
          <strong>Meeting Frequency:</strong> {meetingFrequency || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default DashboardCard;
