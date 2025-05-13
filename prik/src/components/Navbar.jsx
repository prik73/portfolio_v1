import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-4xl">
      <div className="bg-transparent backdrop-blur-lg rounded-full shadow-lg border border-neutral-700 transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center px-3 py-2">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl font-bold text-white ml-4 hover:text-blue-400 transition-colors duration-300"
          >
            prik.73
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out
                  ${location.pathname === item.path 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-300 hover:bg-neutral-800 hover:text-white'}
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-neutral-900 rounded-2xl shadow-lg mt-2 py-2 transition-all duration-300 ease-in-out">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`
                  block px-4 py-3 mx-2 my-1 rounded-xl text-sm font-medium transition-all duration-300 ease-in-out
                  ${location.pathname === item.path 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-300 hover:bg-neutral-800 hover:text-white'}
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
