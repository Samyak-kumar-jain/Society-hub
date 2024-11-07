import React, { useEffect, useState } from 'react';
import { X, PlusCircle, Trash2 } from 'lucide-react';
import ImageUpload from './ImageUpload';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { addNewSociety, editSociety, fetchAdminSocieties, fetchAllSociety } from '../../Features/SocietySlice/SocietySlice';
import { toast } from 'react-toastify'; // Import toast

const SocietyForm = ({ onClose, isEditMode, currentEditId, setcurrentEditId, setFormVisible }) => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadImgUrl, setImgUploadUrl] = useState('');
  const [image2File, setImage2File] = useState(null);
  const [uploadImg2Url, setImgUpload2Url] = useState('');
  const [imagLoadingState, setImageLoadingState] = useState(false);

  const dispatch = useDispatch();

  // Initial form state with only defined fields
  const initialFormState = {
    image: null,
    
    logo: null,
    description: '',
    societyName: '',
    societyType: '',
    contactPersonName: '',
    contactEmail: '',
    contactPhone: '',
    socialMediaLinks: '',
    societyGoals: '',
    meetingFrequency: '',
    feedback: '',
  };

  // Form fields state
  const [formData, setFormData] = useState(initialFormState);

  // State for managing responsibilities
  const [responsibilities, setResponsibilities] = useState([{ id: 1, value: '' }]);

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle changes to responsibilities
  const handleResponsibilityChange = (index, e) => {
    const newResponsibilities = [...responsibilities];
    newResponsibilities[index].value = e.target.value;
    setResponsibilities(newResponsibilities);
  };

  // Add new responsibility field
  const addResponsibility = () => {
    setResponsibilities([...responsibilities, { id: responsibilities.length + 1, value: '' }]);
  };

  // Remove responsibility field
  const removeResponsibility = (index) => {
    const newResponsibilities = responsibilities.filter((_, i) => i !== index);
    setResponsibilities(newResponsibilities);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const SocietyData = {
      ...formData,
      image: uploadImgUrl,
      logo: uploadImg2Url,
      responsibilities: responsibilities.map((r) => r.value),
    };

    if (currentEditId !== null) {
      // Edit mode
      dispatch(editSociety({
        id: currentEditId,
        formData: SocietyData,
      })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAdminSocieties());
          setFormData(initialFormState);
          setcurrentEditId(null);
          setImageFile(null);
          setImage2File(null);
          setImgUploadUrl('');
          setImgUpload2Url('');
          toast.success('Society edited successfully');
          onClose(); // Close the form on success
        }
      });
    } else {
      // Add new society
      dispatch(addNewSociety(SocietyData)).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAdminSocieties());
          setFormData(initialFormState);
          setImageFile(null);
          setImage2File(null);
          setImgUploadUrl('');
          setImgUpload2Url('');
          toast.success('Society added successfully');
          onClose(); // Close the form on success
        }
      });
    }
  };

  // Check if the required fields are filled
  const isSubmitDisabled = !formData.societyName || !formData.contactEmail || !formData.contactPhone;

  return (
    <div className='fixed top-0 right-0 w-full lg:w-1/3 md:w-72 h-full bg-gray-900 shadow-lg p-6 transition-transform transform translate-x-0 duration-300 ease-in-out opacity-100 overflow-y-auto max-h-full border border-gray-700'>
      <X onClick={onClose} className='mb-4 mr-2 cursor-pointer bg-[#4880FF] right-0 absolute text-white p-1 border rounded-md hover:bg-red-500'>Close</X>
      <h1 className='flex mb-7 justify-center text-slate-100 font-semibold text-3xl'>
        {currentEditId !== null ? 'Edit Society' : 'Add Society'}
      </h1>

      <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
        <ImageUpload
          isEditMode={isEditMode}
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadImgUrl={uploadImgUrl}
          setImgUploadUrl={setImgUploadUrl}
          setImageLoadingState={setImageLoadingState}
          imagLoadingState={imagLoadingState}
        />

        {/* Society Name */}
        <div>
          <label className='block mb-1 text-[#4880FF]'>Society Name <span className="text-red-500">*</span></label>
          <input
            name="societyName"
            type="text"
            placeholder="Enter society name"
            className='border rounded-md p-2 w-full bg-slate-800 text-white border-[#4880FF] focus:outline-none focus:ring-2 focus:ring-[#4880FF]'
            value={formData.societyName}
            onChange={handleInputChange}
          />
        </div>

        {/* Society Type */}
        <div>
          <label className='block mb-1 text-[#4880FF]'>Society Type</label>
          <select
            name="societyType"
            className='border rounded-md p-2 w-full bg-slate-800 text-white border-[#4880FF] focus:outline-none focus:ring-2 focus:ring-[#4880FF]'
            value={formData.societyType}
            onChange={handleInputChange}
          >
            <option value="">Select type</option>
            <option value="Academic">Academic</option>
            <option value="Cultural">Cultural</option>
            <option value="Sports">Sports</option>
            <option value="Service">Service</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Contact Email */}
        <div>
          <label className='block mb-1 text-[#4880FF]'>Contact Email <span className="text-red-500">*</span></label>
          <input
            name="contactEmail"
            type="email"
            placeholder="Enter contact email"
            className='border rounded-md p-2 w-full bg-slate-800 text-white border-[#4880FF] focus:outline-none focus:ring-2 focus:ring-[#4880FF]'
            value={formData.contactEmail}
            onChange={handleInputChange}
          />
        </div>

        {/* Contact Phone Number */}
        <div>
          <label className='block mb-1 text-[#4880FF]'>Contact Phone Number <span className="text-red-500">*</span></label>
          <input
            name="contactPhone"
            type="text"
            placeholder="Enter contact phone number"
            className='border rounded-md p-2 w-full bg-slate-800 text-white border-[#4880FF] focus:outline-none focus:ring-2 focus:ring-[#4880FF]'
            value={formData.contactPhone}
            onChange={handleInputChange}
          />
        </div>

        {/* Social Media Links */}
        <div>
          <label className='block mb-1 text-[#4880FF]'>Social Media Links</label>
          <input
            name="socialMediaLinks"
            type="text"
            placeholder="Enter social media links (comma separated)"
            className='border rounded-md p-2 w-full bg-slate-800 text-white border-[#4880FF] focus:outline-none focus:ring-2 focus:ring-[#4880FF]'
            value={formData.socialMediaLinks}
            onChange={handleInputChange}
          />
        </div>

        {/* Society Goals */}
        <div>
          <label className='block mb-1 text-[#4880FF]'>Society Goals</label>
          <textarea
            name="societyGoals"
            placeholder="Describe society goals"
            className='border rounded-md p-2 w-full bg-slate-800 text-white border-[#4880FF] focus:outline-none focus:ring-2 focus:ring-[#4880FF]'
            value={formData.societyGoals}
            onChange={handleInputChange}
          />
        </div>

        {/* Logo Upload */}
        <div>
          <label className='block mb-1 text-[#4880FF]'>Upload Logo</label>
          <ImageUpload
            isEditMode={isEditMode}
            imageFile={image2File}
            setImageFile={setImage2File}
            uploadImgUrl={uploadImg2Url}
            setImgUploadUrl={setImgUpload2Url}
            setImageLoadingState={setImageLoadingState}
            imagLoadingState={imagLoadingState}
          />
        </div>

        {/* Responsibilities */}
        <div>
          <label className='block mb-1 text-[#4880FF]'>Responsibilities</label>
          {responsibilities.map((responsibility, index) => (
            <div key={responsibility.id} className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder={`Responsibility ${index + 1}`}
                className='border rounded-md p-2 w-full bg-slate-800 text-white border-[#4880FF] focus:outline-none focus:ring-2 focus:ring-[#4880FF]'
                value={responsibility.value}
                onChange={(e) => handleResponsibilityChange(index, e)}
              />
              <button type="button" onClick={() => removeResponsibility(index)}>
                <Trash2 className="text-red-500" />
              </button>
            </div>
          ))}
          <button type="button" onClick={addResponsibility} className='flex items-center text-[#4880FF] mt-2'>
            <PlusCircle className='mr-1' /> Add Responsibility
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-[#4880FF] text-white py-2 px-4 rounded-md transition-opacity ${isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}

           // Disable button until required fields are filled
        >
          {currentEditId !== null ? 'Update Society' : 'Add Society'}
        </button>
      </form>
    </div>
  );
};

export default SocietyForm;
