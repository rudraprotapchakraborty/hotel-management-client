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
          `http://localhost:5000/requests?email=${user.email}`
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

  if (loading) return <div className="text-center text-lg text-gray-700">Loading...</div>;
  if (error) return <div className="text-center text-lg text-red-600">Error: {error}</div>;

  return (
    <div className="p-6">
      <SectionTitle
        heading="Requested Meals"
        subHeading="--- What's cooking? ---"
      ></SectionTitle>
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
          <thead className="bg-orange-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6">Image</th>
              <th className="py-3 px-6 text-left">Meal Name</th>
              <th className="py-3 px-6 text-left">Requested Time</th>
            </tr>
          </thead>
          <tbody>
            {requestedMeals.length > 0 ? (
              requestedMeals.map((meal, index) => (
                <tr key={index} className="text-center border-t hover:bg-gray-100 transition-colors">
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
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-600">
                  You have not requested any meals yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedMeals;
