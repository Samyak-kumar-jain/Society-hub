import React from 'react'
import { useSelector } from 'react-redux';

const AboutSociety = () => {
    const { societyData, loading, error } = useSelector((state) => state.society);

  return (
    <div > <section className="mb-10 border p-6 rounded-xl border-[#313d4f] bg-[#273142] pb-6 shadow-lg-xl">
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
  </section></div>
  )
}

export default AboutSociety