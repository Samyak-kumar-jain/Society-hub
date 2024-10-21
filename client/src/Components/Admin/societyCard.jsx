import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteSociety, fetchAllSociety } from "../../Features/SocietySlice/SocietySlice";

const SocietyCard = ({
  description,
  contactEmail,
  societyName,
  contactPhone,
  socialMediaLinks,
  societyGoals,
  meetingFrequency,
  handleButtonClick,
  setCurrentEditId,
  societyId,
}) => {
  const dispatch = useDispatch();

  const handleDelete = (societyId) => {
    dispatch(deleteSociety(societyId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllSociety());
      }
    });
  };

  return (
    <div className="w-[300px] flex flex-col gap-4 border border-[#244c89] m-4 p-4 shadow-lg bg-slate-800 transition duration-200 hover:shadow-xl h-auto rounded-xl">
      {/* Header: Title, Email, Phone */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[#67a4ff] font-extrabold text-3xl truncate">{societyName}</h2>
        <div className="flex justify-between text-sm text-gray-400 gap-5">
          <span className='truncate'>{contactEmail}</span>
          <span className="text-[#67a4ff]">{contactPhone}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm font-normal text-gray-300 line-clamp-3">{description}</p>

      {/* Additional Information */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-normal text-gray-500">
          <strong>Social Media Links:</strong> {socialMediaLinks || "N/A"}
        </p>
        {/* <p className="text-sm font-normal text-gray-300">
          <strong>Society Goals:</strong> {societyGoals || "N/A"}
        </p> */}
        <p className="text-sm font-normal text-gray-500">
          <strong>Meeting Frequency:</strong> {meetingFrequency || "N/A"}
        </p>
      </div>

      {/* Buttons: Edit and Delete */}
      <div className="flex justify-between items-center mt-auto gap-3">
        {/* Edit Button */}
        <button
          className="p-2 text-white w-full border border-[#244c89] bg-gray-700 hover:bg-teal-500 rounded-lg text-sm transform transition-transform duration-150 ease-in-out active:scale-90"
          onClick={() => {
            handleButtonClick();
            setCurrentEditId(societyId); // Pass the current society ID for editing
          }}
        >
          Edit
        </button>

        {/* Delete Button */}
        <button
          className="p-2 text-white bg-gray-700 border border-[#244c89] hover:bg-red-600 rounded-lg text-sm transform transition-transform duration-150 ease-in-out active:scale-90 w-full"
          onClick={() => handleDelete(societyId)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SocietyCard;
