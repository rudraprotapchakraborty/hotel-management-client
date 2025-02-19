import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import SectionTitle from "../../components/SectionTitle";

const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setError("You must be logged in to view your reviews.");
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        const response = await fetch("https://hotel-management-server-one.vercel.app/meal/");
        if (!response.ok) {
          throw new Error(`Failed to fetch meal data. Status: ${response.status}`);
        }
        const meals = await response.json();

        const userReviews = [];
        meals.forEach((meal) => {
          meal.reviews.forEach((review) => {
            if (review.email === user.email) {
              userReviews.push({
                mealName: meal.name,
                review: review.review,
                mealImage: meal.image,
              });
            }
          });
        });

        setReviews(userReviews);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-orange-500 border-dotted rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-lg text-red-600">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-xl shadow-2xl transition-all duration-300 min-h-screen">
      <SectionTitle heading="My Reviews" subHeading="--- What's cooking? ---" />

      {reviews.length > 0 ? (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 shadow-lg rounded-lg">
            <thead className="bg-orange-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6">Meal Image</th>
                <th className="py-3 px-6 text-left">Meal Name</th>
                <th className="py-3 px-6 text-left">Review</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, index) => (
                <tr
                  key={index}
                  className="text-center border-t hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6">
                    <img
                      src={review.mealImage}
                      className="w-16 h-16 object-cover mx-auto rounded-md shadow-sm"
                      alt={review.mealName}
                    />
                  </td>
                  <td className="py-4 px-6 text-left">{review.mealName}</td>
                  <td className="py-4 px-6 text-left">{review.review}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600 dark:text-white">
          You have not left any reviews yet.
        </p>
      )}
    </div>
  );
};

export default MyReviews;
