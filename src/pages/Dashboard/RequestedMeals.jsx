import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import SectionTitle from "../../components/SectionTitle";

const RequestedMeals = () => {
  const { user } = useAuth(); // Get logged-in user info
  const [requestedMeals, setRequestedMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequestedMeals = async () => {
      try {
        const response = await fetch(
          `https://hotel-management-server-one.vercel.app/requests?email=${user.email}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch requested meals. Status: ${response.status}`
          );
        }
        const data = await response.json();
        setRequestedMeals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchRequestedMeals();
    }
  }, [user?.email]);

  if (loading) {
    return (
      <div className="text-center text-lg text-gray-700">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-lg text-red-600">Error: {error}</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-xl shadow-2xl transition-all duration-300 min-h-screen">
      <SectionTitle
        heading="Requested Meals"
        subHeading="--- What's cooking? ---"
      ></SectionTitle>
      {requestedMeals.length > 0 ? (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 shadow-lg rounded-lg">
            <thead className="bg-orange-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6">Image</th>
                <th className="py-3 px-6 text-left">Meal Name</th>
                <th className="py-3 px-6 text-left">Requested Time</th>
              </tr>
            </thead>
            <tbody>
              {requestedMeals.map((meal, index) => (
                <tr
                  key={index}
                  className="text-center border-t hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6">
                    <img
                      src={meal.image}
                      alt={meal.mealName}
                      className="w-16 h-16 object-cover mx-auto rounded-md shadow-sm"
                    />
                  </td>
                  <td className="py-4 px-6 text-left">{meal.mealName}</td>
                  <td className="py-4 px-6 text-left">
                    {new Date(meal.time).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600 dark:text-white">
          You have not requested any meals yet.
        </p>
      )}
    </div>
  );
};

export default RequestedMeals;
