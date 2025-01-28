import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { FaMoon, FaShoppingCart, FaSun } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import useCart from "../../hooks/useCart";
import useAdmin from "../../hooks/useAdmin";
import logo from "../../../public/logo.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [cart] = useCart();
  const profileRef = useRef(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

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

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/meals", label: "Meals" },
    { path: "/upcomingMeals", label: "Upcoming Meals" },
    ...(user && isAdmin
      ? [{ path: "/dashboard/adminHome", label: "Dashboard" }]
      : user
      ? [{ path: "/dashboard/userHome", label: "Dashboard" }]
      : []),
  ];

  return (
    <div
      className={`sticky top-0 z-50 w-full backdrop-blur-md shadow-md transition-all duration-300 ${
        darkMode ? "bg-gray-900 bg-opacity-95" : "bg-white bg-opacity-95"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-9" />
          <h1
            className={`text-lg md:text-2xl font-bold ${
              darkMode ? "text-orange-400" : "text-orange-500"
            }`}
          >
            &lt;Hotel Management/&gt;
          </h1>
        </NavLink>

        {/* Desktop Links */}
        <ul className="hidden lg:flex gap-8 items-center font-semibold">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={`transition duration-200 ease-in-out hover:scale-105 ${
                  darkMode
                    ? "text-gray-300 hover:text-orange-400"
                    : "text-gray-700 hover:text-orange-500"
                }`}
              >
                {label}
              </NavLink>
            </li>
          ))}
          {user && (
            <li>
              <NavLink to="/dashboard/cart">
                <button className="relative flex items-center gap-2 px-4 py-2 rounded-lg shadow-md bg-orange-500 hover:bg-orange-600 text-white transition-all">
                  <FaShoppingCart />
                  <span className="badge badge-secondary">{cart.length}</span>
                </button>
              </NavLink>
            </li>
          )}
        </ul>

        {/* Actions: Dark Mode & Profile */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full shadow-md transition-all ${
              darkMode
                ? "bg-orange-600 text-white hover:bg-orange-500"
                : "bg-orange-400 text-white hover:bg-orange-500"
            }`}
          >
            {darkMode ? <FaMoon /> : <FaSun />}
          </button>

          {/* Profile Section */}
          {user ? (
            <div className="relative" ref={profileRef}>
              <img
                src={user.photoURL || ""}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              />
              {profileMenuOpen && (
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-2 z-50 ${
                    darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700"
                  }`}
                >
                  <span className="block px-4 py-2 text-sm">{user.displayName}</span>
                  <button
                    onClick={handleLogOut}
                    className="w-full text-left px-4 py-2 hover:bg-orange-500 hover:text-white rounded-lg"
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
                  Login
                </button>
              </NavLink>
              <NavLink to="/signup">
                <button className="px-4 py-2 rounded-lg shadow-md bg-orange-500 text-white hover:bg-orange-600">
                  Sign Up
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
                darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700"
              }`}
            >
              {navLinks.map(({ path, label }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className="block px-4 py-2 transition hover:bg-orange-500 hover:text-white rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
