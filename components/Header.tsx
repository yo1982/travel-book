
import React, { useState } from 'react';

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <li>
    <a href={href} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200">
      {children}
    </a>
  </li>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
             <a href="#" className="text-2xl font-bold text-blue-600">Travel.io</a>
          </div>

          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              <NavLink href="#">Flights</NavLink>
              <NavLink href="#">Hotels</NavLink>
              <NavLink href="#">Holidays</NavLink>
              <NavLink href="#">Discover</NavLink>
            </ul>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600">Contact us</a>
            <button className="text-sm font-medium text-blue-600 border border-blue-600 rounded-full px-4 py-2 hover:bg-blue-50 transition-colors duration-200">
              Sign in
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500 hover:text-gray-600 focus:outline-none">
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <li><a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Flights</a></li>
            <li><a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Hotels</a></li>
            <li><a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Holidays</a></li>
            <li><a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Discover</a></li>
          </ul>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-5">
              <a href="#" className="block text-base font-medium text-gray-700 hover:text-blue-600">Contact us</a>
              <button className="mt-2 w-full text-left text-base font-medium text-blue-600 border border-blue-600 rounded-full px-4 py-2 hover:bg-blue-50 transition-colors duration-200">
                Sign in
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
