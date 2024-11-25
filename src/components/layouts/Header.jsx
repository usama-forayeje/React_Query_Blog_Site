import { NavLink } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark", !isDarkMode);
  };

  return (
    <header className="p-2 bg-gradient-to-r from-indigo-50 via-gray-100 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-md">
      <div className="flex items-center justify-between max-w-full mx-auto">
        {/* Logo Section */}
        <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 hover:scale-105 transition-transform cursor-pointer">
          <NavLink to="/">Forayaje Blogs</NavLink>
        </h1>

        {/* Navigation Menu */}
        <nav className="hidden md:flex space-x-8">
          <NavLink
            to="/"
            className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
          >
            Contact
          </NavLink>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-6">
          {/* Dark/Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full shadow-lg hover:bg-indigo-500 hover:text-white transition-transform transform hover:scale-110"
          >
            {isDarkMode ? <span className="text-xl">🌙</span> : <span className="text-xl">☀️</span>}
          </button>

          {/* Notification Button */}
          <div className="relative">
            <button className="p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform">
              <span className="text-xl">🔔</span>
            </button>
            {/* Notification Count */}
            <span className="absolute top-0 right-0 -mt-2 -mr-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="flex md:hidden mt-4 justify-center space-x-6">
        <NavLink
          to="/"
          className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
        >
          Contact
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;