import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0a1f44] text-white py-10 px-4 md:px-20 ">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between">
        
        {/* About Section */}
        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          <h2 className="text-lg font-semibold mb-4">Society Hub</h2>
          <p className="text-sm mb-4">
            Society Hub is your gateway to discovering and engaging with college societies.
            Our platform connects students with vibrant communities, helping them grow, learn,
            and make unforgettable memories.
          </p>
          <div className="flex space-x-4 text-xl">
            <i className="fab fa-instagram hover:text-gray-300"></i>
            <i className="fab fa-youtube hover:text-gray-300"></i>
            <i className="fab fa-linkedin hover:text-gray-300"></i>
            <i className="fab fa-facebook hover:text-gray-300"></i>
            <i className="fab fa-xing hover:text-gray-300"></i>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="w-1/2 md:w-1/6 mb-8 md:mb-0">
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#home" className="hover:text-gray-300">Home</a></li>
            <li><a href="#societies" className="hover:text-gray-300">Societies</a></li>
            <li><a href="#events" className="hover:text-gray-300">Events</a></li>
            <li><a href="#reviews" className="hover:text-gray-300">Reviews</a></li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="w-1/2 md:w-1/6 mb-8 md:mb-0">
          <h2 className="text-lg font-semibold mb-4">Support</h2>
          <ul className="space-y-2">
            <li><a href="#feedback" className="hover:text-gray-300">Feedback</a></li>
            <li><a href="#help" className="hover:text-gray-300">Help</a></li>
            <li><a href="#faqs" className="hover:text-gray-300">FAQs</a></li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="w-full md:w-1/3">
          <h2 className="text-lg font-semibold mb-4">Subscribe to our Newsletter</h2>
          <form className="flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Enter your e-mail..."
              className="p-2 rounded-l-md w-full sm:w-auto sm:flex-1 mb-4 sm:mb-0"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-r-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2024 Society Hub. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Replace '#' with the appropriate links for each person */}
            <a href="#" className="hover:text-gray-300">Samyak</a>
            <a href="#" className="hover:text-gray-300">Shivam</a>
            <a href="#" className="hover:text-gray-300">Shubham</a>
            <a href="#" className="hover:text-gray-300">Sidharth</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
