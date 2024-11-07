import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBulletin, deleteBulletin, fetchUserBulletins, updateBulletin } from "../../Features/BulletinSlice/bulletinSlice";
import BulletinCard from "./Bulletincard";

export const Bulletin = ({ currentEditBulletin }) => {
  const [formData, setFormData] = useState({
    title: "",
    societyName: "",
    venue: "",
    link: "",
    description: "", 
  });
  const [currEditedId,serCurrEditedId] = useState(null);

  const {bulletins} = useSelector((state) => state.bulletin)
  console.log(bulletins)

  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(fetchUserBulletins())
},[dispatch])
  const isFormValid = () => {
    return (
      (formData.title?.trim() || "") !== "" &&
      (formData.societyName?.trim() || "") !== "" &&
      (formData.description?.trim() || "") !== ""
    );
  };
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      if (currEditedId) {
        
        dispatch(updateBulletin({bulletinId:currEditedId,bulletinData: formData})).then((data)=>{
          if(data?.payload?.success){
            dispatch(fetchUserBulletins())
            serCurrEditedId(null);
            setFormData({
              title: "",
              societyName: "",
              venue: "",
              link: "",
              description: "",
            })
  
          }
         
  
        })
      
      } else {
        dispatch(addBulletin({
          ...formData
          
        })).then((data) => {

          console.log(data)
          dispatch(fetchUserBulletins())
          if (data?.payload?.success) {
            
            setFormData({
              address: "",
              city: "",
              pincode: "",
              phone: "",
              notes: "",
            })
          }
        })
      }

     
      setFormData({
        title: "",
        societyName: "",
        venue: "",
        link: "",
        description: "", 
      });
    }
  };

  const handleDeleteBulletin = (getBulletinInfo) => {
    dispatch(deleteBulletin({ bulletinId: getBulletinInfo._id })).then((data) => {
        if (data?.payload?.success) {
            dispatch(fetchUserBulletins());
        }
    });
};

  const  handleEditBulletin = (getBulletinInfo)=>{
    serCurrEditedId(getBulletinInfo?._id);
    setFormData({...formData,
      title: getBulletinInfo?.title,
      venue: getBulletinInfo?.venue,
      link: getBulletinInfo?.link,
      societyName: getBulletinInfo?. societyName,
      description: getBulletinInfo?.description,

    })
  }

  return (
    <>
      <div>
      <div className="mb-5 p-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
        {

          bulletins && bulletins.length
            > 0 ? bulletins.map((bulletinItem) => {
            return( <BulletinCard handleDeleteBulletin={ handleDeleteBulletin}
             handleEditBulletin={handleEditBulletin}  bulletininfo={bulletinItem}>
                
             </BulletinCard> ) 


            }) : <div className="text-3xl w-full mt-3 font-bold text-gray-500">Add Bulletin</div>}

      </div>
        <form
          className="w-full mt-5 mx-auto bg-gray-900 text-gray-100 p-6 rounded-md shadow-sm space-y-4 border border-gray-700"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col space-y-1">
            <label htmlFor="title" className="font-semibold text-gray-300">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter Bulletin Title"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-700 text-gray-100 bg-gray-800 p-2 rounded-md focus:outline-none"
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="societyName" className="font-semibold text-gray-300">Society Name</label>
            <input
              type="text"
              name="societyName"
              placeholder="Enter your Society name"
              value={formData.societyName}
              onChange={handleChange}
              className="border border-gray-700 text-gray-300 p-2 rounded-md focus:outline-none bg-gray-800"
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="link" className="font-semibold text-gray-300">Link</label>
            <input
              type="text"
              name="link"
              placeholder="Enter Google form link"
              value={formData.link}
              onChange={handleChange}
              className="border border-gray-700 text-gray-300 p-2 rounded-md focus:outline-none bg-gray-800"
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="venue" className="font-semibold text-gray-300">Venue</label>
            <input
              type="text"
              name="venue"
              placeholder="Enter venue"
              value={formData.venue}
              onChange={handleChange}
              className="border border-gray-700 text-gray-300 p-2 rounded-md focus:outline-none bg-gray-800"
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="description" className="font-semibold text-gray-300">description</label>
            <textarea
              name="description"
              placeholder="Enter any additional notes"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-700 text-gray-300 p-2 rounded-md focus:outline-none bg-gray-800"
            />
          </div>

          <button
            type="submit"
            className={`bg-[#4880FF] text-white py-2 px-4 rounded-md w-full transition-opacity ${isFormValid() ? 'hover:bg-blue-600' : "opacity-50 cursor-not-allowed"
              }`}
            disabled={!isFormValid()} // Disable if form is invalid
          >
            {currEditedId ? "Edit Bulletin" : "Add Bulletin"}
          </button>
        </form>
      </div>
    </>
  );
};
