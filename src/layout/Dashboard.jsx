import {
  FaCalendar,
  FaHome,
  FaList,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [cart] = useCart();
  const [isAdmin] = useAdmin();

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900 transition-all duration-300">
      {/* Sidebar */}
      <div className="w-64 bg-orange-400 dark:bg-gray-800 p-6">
        <ul className="menu space-y-4 text-gray-900 dark:text-white">
          {/* Admin Links */}
          {isAdmin ? (
            <>
              <li>
                <NavLink
                  to="/dashboard/adminHome"
                  className="flex items-center space-x-2 hover:bg-orange-500 px-4 py-3 rounded-lg transition-all duration-200"
                >
                  <FaHome />
                  <span>Admin Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/addItems"
                  className="flex items-center space-x-2 hover:bg-orange-500 px-4 py-3 rounded-lg transition-all duration-200"
                >
                  <FaUtensils />
                  <span>Add Items</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageItems"
                  className="flex items-center space-x-2 hover:bg-orange-500 px-4 py-3 rounded-lg transition-all duration-200"
                >
                  <FaList />
                  <span>Manage Items</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/users"
                  className="flex items-center space-x-2 hover:bg-orange-500 px-4 py-3 rounded-lg transition-all duration-200"
                >
                  <FaUsers />
                  <span>All Users</span>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              {/* User Links */}
              <li>
                <NavLink
                  to="/dashboard/userHome"
                  className="flex items-center space-x-2 hover:bg-orange-500 px-4 py-3 rounded-lg transition-all duration-200"
                >
                  <FaHome />
                  <span>User Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/requestedMeals"
                  className="flex items-center space-x-2 hover:bg-orange-500 px-4 py-3 rounded-lg transition-all duration-200"
                >
                  <FaUtensils />
                  <span>Requested Meals</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myReviews"
                  className="flex items-center space-x-2 hover:bg-orange-500 px-4 py-3 rounded-lg transition-all duration-200"
                >
                  <FaUtensils />
                  <span>My Reviews</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/cart"
                  className="flex items-center space-x-2 hover:bg-orange-500 px-4 py-3 rounded-lg transition-all duration-200"
                >
                  <FaShoppingCart />
                  <span>My Cart ({cart.length})</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/paymentHistory"
                  className="flex items-center space-x-2 hover:bg-orange-500 px-4 py-3 rounded-lg transition-all duration-200"
                >
                  <FaCalendar />
                  <span>Payment History</span>
                </NavLink>
              </li>
            </>
          )}
          <div className="divider my-4"></div>
          <li>
            <NavLink
              to="/"
              className="flex items-center space-x-2 hover:bg-gray-300 dark:hover:bg-gray-700 px-4 py-3 rounded-lg transition-all duration-200"
            >
              <FaHome />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/meals"
              className="flex items-center space-x-2 hover:bg-gray-300 dark:hover:bg-gray-700 px-4 py-3 rounded-lg transition-all duration-200"
            >
              <FaList />
              <span>Meals</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8 bg-gray-100 dark:bg-gray-900 transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
