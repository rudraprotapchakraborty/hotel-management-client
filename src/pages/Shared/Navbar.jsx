import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { FaMoon, FaSun, FaBell, FaShoppingCart, FaUser } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import useAdmin from "../../hooks/useAdmin";
import logo from "../../../public/logo.png";
import useCart from "../../hooks/useCart";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const profileRef = useRef(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [cart] = useCart();
  const [imageError, setImageError] = useState(false); // Track image load error

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = () => {
    logOut();
  };

  return (
    <div
      className={`sticky top-0 z-50 w-full backdrop-blur-md shadow-md transition-all duration-300 ${
        darkMode ? "bg-gray-900 bg-opacity-95" : "bg-orange-300 bg-opacity-95"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="w-9 md:w-11 filter drop-shadow-[0_0_6px_white] pb-2"
          />
          <h1
            className={`text-sm md:text-2xl font-bold ${
              darkMode ? "text-orange-400" : "text-orange-600"
            }`}
          >
            &lt;Hotel Management/&gt;
          </h1>
        </NavLink>

        {/* Desktop Links */}
        <ul className="hidden lg:flex gap-8 items-center font-semibold">
          <li>
            <NavLink
              to="/"
              className={`transition duration-200 hover:scale-105 ${
                darkMode
                  ? "text-gray-300 hover:text-orange-400"
                  : "text-gray-700 hover:text-orange-500"
              }`}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/meals"
              className={`transition duration-200 hover:scale-105 ${
                darkMode
                  ? "text-gray-300 hover:text-orange-400"
                  : "text-gray-700 hover:text-orange-500"
              }`}
            >
              Meals
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/upcomingMeals"
              className={`transition duration-200 hover:scale-105 ${
                darkMode
                  ? "text-gray-300 hover:text-orange-400"
                  : "text-gray-700 hover:text-orange-500"
              }`}
            >
              Upcoming Meals
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/cart">
              <button className="btn btn-ghost p-0">
                <FaShoppingCart
                  className={darkMode ? "text-gray-300" : "text-gray-700"}
                />
                <div className="badge badge-secondary">+{cart.length}</div>
              </button>
            </NavLink>
          </li>
        </ul>

        {/* Actions: Dark Mode & Profile/Login */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <div className="flex items-center">
            <label
              htmlFor="darkModeToggle"
              className="relative inline-block w-12 h-6"
            >
              <input
                type="checkbox"
                id="darkModeToggle"
                checked={darkMode}
                onChange={toggleDarkMode}
                className="opacity-0 w-0 h-0 absolute"
              />
              <span className="slider block w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full">
                <span
                  className={`dot block w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                    darkMode ? "translate-x-6" : "translate-x-0"
                  }`}
                >
                  {/* The icons will slide with the dot */}
                  <span
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                      darkMode ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <FaSun className="text-orange-500" />
                  </span>
                  <span
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                      darkMode ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <FaMoon className="text-orange-500" />
                  </span>
                </span>
              </span>
            </label>
          </div>

          {/* Profile or Join Us */}
          {user ? (
            <div className="relative" ref={profileRef}>
              {user.photoURL && !imageError ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-7 h-7 md:w-10 md:h-10 rounded-full cursor-pointer"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div
                  className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center bg-gray-300 dark:bg-gray-600 rounded-full cursor-pointer"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                >
                  <FaUser className="w-6 h-6 text-gray-500 dark:text-gray-300" />
                </div>
              )}

              {profileMenuOpen && (
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-2 z-50 ${
                    darkMode
                      ? "bg-gray-800 text-gray-200"
                      : "bg-white text-gray-700"
                  }`}
                >
                  <span className="block px-4 py-2 text-sm font-bold">
                    {user.displayName}
                  </span>
                  <NavLink
                    to={
                      isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"
                    }
                    className="block px-4 py-2 hover:bg-orange-500 hover:text-white rounded-lg"
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={handleLogOut}
                    className="w-full text-red-500 font-semibold text-left px-4 py-2 hover:bg-orange-500 hover:text-white rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <NavLink to="/login">
                <button className="px-4 py-2 rounded-lg shadow-md bg-orange-500 text-white hover:bg-orange-600">
                  Join Us
                </button>
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${
                darkMode ? "text-gray-300" : "text-gray-700"
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
              className={`absolute right-4 top-16 w-56 rounded-lg shadow-md py-2 ${
                darkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-700"
              }`}
            >
              <li>
                <NavLink
                  to="/"
                  className="block px-4 py-2 hover:bg-orange-500 hover:text-white rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/meals"
                  className="block px-4 py-2 hover:bg-orange-500 hover:text-white rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Meals
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/upcomingMeals"
                  className="block px-4 py-2 hover:bg-orange-500 hover:text-white rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Upcoming Meals
                </NavLink>
              </li>
              <button
                onClick={handleLogOut}
                className="w-full text-left text-red-500 font-semibold px-4 py-2 hover:bg-orange-500 hover:text-white rounded-lg"
              >
                Logout
              </button>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
