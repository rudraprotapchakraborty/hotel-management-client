import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useCart from "../../hooks/useCart";

const UserHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [cart] = useCart();

  // Fetching some user-related data (e.g., order history)
  const { data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto p-6">
        {/* Welcome Section */}
        <h2 className="text-4xl font-semibold text-gray-900 dark:text-white">
          <span>Welcome back, </span>
          {user?.displayName ? user.displayName : "User"}
        </h2>

        <div className="mt-6 flex items-center space-x-6">
          {/* Profile Image */}
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          )}

          <div className="text-sm text-gray-800 dark:text-gray-200">
            <p>Email: {user?.email || "Not available"}</p>
            <p>
              Member since:{" "}
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        {/* User Actions */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center transition-transform transform hover:scale-105">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Payment History
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              View your past payment history and track their status.
            </p>
            <Link to="/dashboard/paymentHistory">
              <button className="mt-4 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 focus:outline-none">
                Payment History
              </button>
            </Link>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              My Cart
            </h4>
            <p className="text-2xl text-gray-900 dark:text-white">
              {cart.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
