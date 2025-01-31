import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useMeal from "../../hooks/useMeal";

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [meal, , ] = useMeal();

    const { data: users = [] } = useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        const res = await axiosSecure.get("/users");
        return res.data;
      },
    });

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-6xl mx-auto p-8">
                {/* Welcome Section */}
                <h2 className="text-4xl font-semibold text-gray-900 dark:text-white">
                    <span>Welcome back, </span>
                    {user?.displayName ? user.displayName : 'Admin'}
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
                        <p>Email: {user?.email || 'Not available'}</p>
                        <p>Meals Managed: {user?.mealsAdded || 0}</p>
                    </div>
                </div>

                {/* Admin Actions */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-xl">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Meal Management</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">Add, update, or remove meals from the menu.</p>
                        <Link to="/dashboard/manageItems">
                            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none transition-all">
                                Manage Meals
                            </button>
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-xl">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Meal</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">Add new meal options to the menu.</p>
                        <Link to="/dashboard/addItems">
                            <button className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none transition-all">
                                Add Meal
                            </button>
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-xl">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">User Management</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">View and manage user accounts and their roles.</p>
                        <Link to="/dashboard/users">
                            <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none transition-all">
                                Manage Users
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Admin Statistics Section */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Total Registered Users</h4>
                        <p className="text-2xl text-gray-900 dark:text-white">{users.length}</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Meals Available</h4>
                        <p className="text-2xl text-gray-900 dark:text-white">{meal.length}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
