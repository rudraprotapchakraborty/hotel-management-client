import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useCart from "../../hooks/useCart";
import { FaUser } from "react-icons/fa"; // Font Awesome User Icon
import { useState } from "react";
import Spinner from "../../components/Spinner"

const UserHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [cart] = useCart();
  const [imageError, setImageError] = useState(false); // Track if image fails to load

  // Fetching user-related data (e.g., order history and user badge)
  const { data: userInfo = {}, isLoading } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  if(isLoading){
    return <Spinner></Spinner>
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto p-6">
        {/* Welcome Section */}
        <h2 className="text-4xl font-semibold text-gray-900 dark:text-white">
          Welcome back,{" "}
          <span className="text-orange-600">{user?.displayName || "User"}</span>
        </h2>

        <div className="mt-6 flex items-center space-x-6">
          {/* Profile Image with Error Handling */}
          {user?.photoURL && !imageError ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
              onError={() => setImageError(true)} // Set error state when image fails
            />
          ) : (
            <div className="w-20 h-20 flex items-center justify-center bg-gray-300 dark:bg-gray-600 rounded-full">
              <FaUser className="w-10 h-10 text-gray-500 dark:text-gray-300" />
            </div>
          )}

          <div className="text-sm text-gray-800 dark:text-gray-200">
            <p>Email: {user?.email || "Not available"}</p>
            <p>
              Badge:{" "}
              <span className="font-semibold text-orange-600">
                {userInfo?.badge || "N/A"}
              </span>
            </p>
          </div>
        </div>

        {/* User Actions */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              My Requested Meals
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Explore the meals you've requested.
            </p>
            <Link to="/dashboard/requestedMeals">
              <button className="mt-4 bg-orange-600 text-white py-2 px-6 rounded-lg hover:bg-orange-700 transition-colors focus:outline-none">
                View Meals
              </button>
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              My Reviews
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Check out the reviews you've written.
            </p>
            <Link to="/dashboard/myReviews">
              <button className="mt-4 bg-orange-600 text-white py-2 px-6 rounded-lg hover:bg-orange-700 transition-colors focus:outline-none">
                View Reviews
              </button>
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Payment History
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Keep track of your past payments and their status.
            </p>
            <Link to="/dashboard/paymentHistory">
              <button className="mt-4 bg-orange-600 text-white py-2 px-6 rounded-lg hover:bg-orange-700 transition-colors focus:outline-none">
                View Payments
              </button>
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              My Cart
            </h4>
            <p className="text-2xl text-gray-900 dark:text-white">
              {cart.length}
            </p>
            <Link to="/dashboard/cart">
              <button className="mt-4 bg-orange-600 text-white py-2 px-6 rounded-lg hover:bg-orange-700 transition-colors focus:outline-none">
                View Cart
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
