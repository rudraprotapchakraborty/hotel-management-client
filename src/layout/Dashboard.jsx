import {
  FaCalendar,
  FaHome,
  FaList,
  FaMoon,
  FaShoppingCart,
  FaSun,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Dashboard = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const [cart] = useCart();
  const [isAdmin] = useAdmin();

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900 transition-all duration-300">
      {/* Sidebar */}
      <div className="w-64 bg-orange-100 dark:bg-gray-800 p-6 rounded-l-xl shadow-2xl">
        <ul className="space-y-4 text-gray-900 dark:text-white">
          {/* Admin Links */}
          {isAdmin ? (
            <>
              <li>
                <NavLink
                  to="/dashboard/adminHome"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive ? "bg-orange-500" : ""
                    }`
                  }
                >
                  <FaHome />
                  <span className="font-medium">Admin Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/addItems"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive ? "bg-orange-500" : ""
                    }`
                  }
                >
                  <FaUtensils />
                  <span className="font-medium">Add Items</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageItems"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive ? "bg-orange-500" : ""
                    }`
                  }
                >
                  <FaList />
                  <span className="font-medium">Manage Items</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/users"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive ? "bg-orange-500" : ""
                    }`
                  }
                >
                  <FaUsers />
                  <span className="font-medium">All Users</span>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              {/* User Links */}
              <li>
                <NavLink
                  to="/dashboard/userHome"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive ? "bg-orange-500" : ""
                    }`
                  }
                >
                  <FaHome />
                  <span className="font-medium">User Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/requestedMeals"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive ? "bg-orange-500" : ""
                    }`
                  }
                >
                  <FaUtensils />
                  <span className="font-medium">Requested Meals</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myReviews"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive ? "bg-orange-500" : ""
                    }`
                  }
                >
                  <FaUtensils />
                  <span className="font-medium">My Reviews</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/cart"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive ? "bg-orange-500" : ""
                    }`
                  }
                >
                  <FaShoppingCart />
                  <span className="font-medium">My Cart ({cart.length})</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/paymentHistory"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive ? "bg-orange-500" : ""
                    }`
                  }
                >
                  <FaCalendar />
                  <span className="font-medium">Payment History</span>
                </NavLink>
              </li>
            </>
          )}
          <div className="divider my-4"></div>
          <li>
            <NavLink
              to="/"
              className="flex items-center space-x-3 hover:bg-gray-300 dark:hover:bg-gray-700 px-4 py-3 rounded-lg transition-all duration-200"
            >
              <FaHome />
              <span className="font-medium">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/meals"
              className="flex items-center space-x-3 hover:bg-gray-300 dark:hover:bg-gray-700 px-4 py-3 rounded-lg transition-all duration-200"
            >
              <FaList />
              <span className="font-medium">Meals</span>
            </NavLink>
          </li>
        </ul>
        <div className="flex items-center space-x-3 ml-4 mt-8">
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
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8 bg-gray-100 dark:bg-gray-900 transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
