import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSocietyByID } from '../../Features/SocietySlice/userSocietySlice';

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

  if (showLoading) return <p className="  text-center text-7xl text-blue-800 animate-spin delay-500 transition-all justify-center items-center flex min-h-screen">o</p>;
  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

  return (
    <div className='p-3 '>
      <div className="flex flex-col p-8 w-full min-h-screen border border-[#313d4f] bg-gray-900 text-gray-200 shadow-lg rounded-xl ">
        <header className="text-center mb-12 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-[#4c82ff] mb-2">{societyData?.societyName.toUpperCase()}</h1>
          <p className="text-lg font-medium text-gray-400">{societyData?.societyType}</p>
          <div className="flex-none">
            <img
              src={societyData?.logo}
              alt={`${societyData?.societyName} logo`}
              className="lg:w-24 lg:h-24 md:w-24 md:h-24 w-14 h-14 object-fill rounded-full border-2 border-gray-700 shadow-lg"
            />
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-10 mb-12 items-start">
          <div className="flex-grow rounded-lg-3xl">
            <img
              src={societyData?.image}
              alt={`${societyData?.societyName}`}
              className="w-full lg:h-[100vh] md:h-[70vh] object-fill rounded-lg shadow-lg border border-gray-700 flex justify-end"
            />
          </div>
        </div>

        <section className="mb-10 border p-6 rounded-xl border-[#313d4f] bg-[#273142] pb-6 shadow-lg-xl">
          <h2 className="text-2xl font-bold text-[#4c82ff] mb-4">About Us</h2>
          <p className="text-gray-300 leading-relaxed">
            {societyData?.description || 'No description provided'}
          </p>
        </section>

        <section className="mb-10 border p-6 rounded-xl border-[#313d4f] bg-[#1b2431] pb-6">
          <h2 className="text-2xl font-semibold text-[#4c82ff] mb-4">Contact Information</h2>
          <div className="space-y-2">
            <p>Email: <a href={`mailto:${societyData?.contactEmail}`} className="hover:underline">{societyData?.contactEmail}</a></p>
            <p>Phone: {societyData?.contactPhone}</p>
          </div>
        </section>

        <section className="mb-10 border p-6 rounded-xl border-[#313d4f] bg-[#273142] shadow-lg-xl pb-6">
          <h2 className="text-2xl font-semibold text-[#4c82ff] mb-4">Meeting Frequency</h2>
          <p className="text-gray-300">{societyData?.meetingFrequency || 'Not specified'}</p>
        </section>

        <section className="mb-10 border p-6 rounded-xl border-[#313d4f] bg-[#1b2431] pb-6 shadow-lg-xl">
          <h2 className="text-2xl font-semibold text-[#4c82ff] mb-4">Our Goals</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            {societyData?.societyGoals?.length
              ? societyData.societyGoals.map((goal, index) => <li key={index}>{goal}</li>)
              : <li>No goals specified</li>}
          </ul>
        </section>

        <section className="mb-10 border p-6 rounded-xl border-[#313d4f] bg-[#273142] pb-6 shadow-lg-xl">
          <h2 className="text-2xl font-semibold text-[#4c82ff] mb-4">Follow Us</h2>
          {societyData?.socialMediaLinks?.length ? (
            <div className="flex flex-col gap-2">
              {societyData.socialMediaLinks.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {link}
                </a>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No social media links provided</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default SocietyPage;
