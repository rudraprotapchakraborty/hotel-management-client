import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [activeLink, setActiveLink] = useState("");
  const [scrolling, setScrolling] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [nameVisible, setNameVisible] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setNameVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogOut = () => {
    logOut();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          onClick={() => setActiveLink("home")}
          className={`${activeLink === "home"
            ? "text-orange-500"
            : darkMode
              ? "text-gray-300 hover:text-orange-300"
              : "text-gray-700 hover:text-orange-500"
            } transition-transform duration-200 ease-in-out transform hover:scale-105`}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/menu"
          onClick={() => setActiveLink("menu")}
          className={`${activeLink === "menu"
            ? "text-orange-500"
            : darkMode
              ? "text-gray-300 hover:text-orange-300"
              : "text-gray-700 hover:text-orange-500"
            } transition-transform duration-200 ease-in-out transform hover:scale-105`}
        >
          Menu
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/order"
          onClick={() => setActiveLink("order")}
          className={`${activeLink === "order"
            ? "text-orange-500"
            : darkMode
              ? "text-gray-300 hover:text-orange-300"
              : "text-gray-700 hover:text-orange-500"
            } transition-transform duration-200 ease-in-out transform hover:scale-105`}
        >
          Order
        </NavLink>
      </li>
    </>
  );
  
  return (
    <div
      className={`sticky z-50 backdrop-blur-md shadow-xl rounded-full w-11/12 mx-auto md:px-8 md:py-4 transition-all duration-300 ${scrolling ? "top-0" : "top-4"
        } ${darkMode ? "bg-gray-900 bg-opacity-90" : "bg-white bg-opacity-90"}`}
    >
      <div className="flex justify-between items-center">
        {/* Brand Logo */}
        <NavLink>
          <button
            className={`text-sm md:text-2xl font-bold transition-transform duration-300 transform hover:scale-105 ${darkMode
              ? "text-orange-300 hover:text-orange-400"
              : "text-orange-500 hover:text-orange-600"
              }`}
          >
            <div className="flex items-center gap-2">
              <img src="" className="w-9" alt="" />
              <p>
                <span
                  className={`${darkMode ? "text-orange-500" : "text-orange-700"
                    }`}
                >
                  &lt;H
                </span>
                otel Management
                <span
                  className={`${darkMode ? "text-orange-500" : "text-orange-700"
                    }`}
                >
                  /&gt;
                </span>
              </p>
            </div>
          </button>
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden lg:flex">
          <ul className="flex font-bold gap-10">{links}</ul>
        </div>

        {/* Dark Mode Toggle & User Actions */}
        <div className="flex items-center md:gap-4">
          {/* Dark Mode Button */}
          <button
            onClick={toggleDarkMode}
            className={`p-1.5 md:p-2 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 ${darkMode
              ? "bg-orange-700 hover:bg-orange-600 text-white"
              : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
          >
            {darkMode ? (
              <FaMoon className="text-sm md:text-xl" />
            ) : (
              <FaSun className="text-sm md:text-xl" />
            )}
          </button>

          {/* User Info */}
          {user ? (
            <div className="flex items-center relative">
              <div ref={profileRef} className="flex items-center relative">
                {/* Conditional rendering for profile photo or icon */}
                {user?.photoURL ? (
                  <img
                    className="w-[40px] h-[40px] mr-2 rounded-full cursor-pointer"
                    src={user?.photoURL}
                    alt="User Avatar"
                    onClick={() => setNameVisible((prev) => !prev)} // Toggle visibility on click
                  />
                ) : (
                  <FaUserCircle
                    className="w-[40px] h-[40px] mr-2 cursor-pointer text-gray-500"
                    onClick={() => setNameVisible((prev) => !prev)} // Toggle visibility on click
                  />
                )}

                {nameVisible && (
                  <span
                    className={`absolute top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-xs px-3 py-1 rounded-md ${darkMode ? "bg-gray-800" : "bg-gray-900"
                      }`}
                  >
                    {user?.displayName}
                  </span>
                )}
              </div>

              <button
                onClick={handleLogOut}
                className="btn ml-2 bg-orange-500 hover:bg-orange-600 text-white border-none"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex">
              <NavLink to="/login">
                <button className="btn mr-2 bg-orange-500 hover:bg-orange-600 text-white border-none">
                  Login
                </button>
              </NavLink>
              <NavLink to="/signup">
                <button className="btn bg-orange-500 hover:bg-orange-600 text-white border-none">
                  Sign Up
                </button>
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="btn btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>

          {isMenuOpen && (
            <ul
              className={`absolute right-4 top-12 p-4 space-y-4 rounded-lg shadow-xl font-bold z-50 ${darkMode
                ? "bg-black bg-opacity-90 text-gray-300"
                : "bg-white text-gray-700"
                }`}
            >
              {links}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
