import React, { useState } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  onLogout: () => void;
  setShowLoginModal: (show: boolean) => void;
  setShowSignupModal: (show: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  onLogout,
  setShowLoginModal,
  setShowSignupModal,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const loggedInUser = localStorage.getItem("loggedInUser");

  return (
    <div className="bg-pic">
      <nav className="bg-[#000000c9] text-white fixed top-0 right-0 left-0 z-[100]">
        <div className="container flex justify-between items-center">
          <Link to="/">
            <img src="/chef-logo.png" className="w-[100px]" alt="Logo" />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-xl font-bold hover:text-orange-300 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/saved"
              className="text-xl font-bold hover:text-orange-300 transition duration-300"
            >
              Saved Recipes
            </Link>
            <Link
              to="/about"
              className="text-xl font-bold hover:text-orange-300 transition duration-300"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-xl font-bold hover:text-orange-300 transition duration-300"
            >
              Contact Us
            </Link>
            {loggedInUser ? (
              <div className="relative">
                <img
                  src="/profile-pic.png"
                  alt="Profile"
                  className="w-[50px] h-[50px] rounded-full cursor-pointer"
                  onClick={toggleDropdown}
                />
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={toggleDropdown}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={onLogout}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="text-xl font-bold hover:text-orange-300 transition duration-300"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowSignupModal(true)}
                  className="text-xl font-bold hover:text-orange-300 transition duration-300"
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
      <div className="hero">
        <div className="container mx-auto flex justify-center items-center text-white flex-col">
          <h1 className="text-[66px] font-bold text-center pt-[160px]">Recipe Finder</h1>
          <h2 className="text-[26px] font-bold text-center">Find your next recipe</h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
