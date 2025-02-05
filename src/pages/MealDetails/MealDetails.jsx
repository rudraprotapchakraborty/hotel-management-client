import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const MealDetails = () => {
  const { user } = useAuth(); // Get user from context
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [newUser, setNewUser] = useState(""); // User input state
  const [newReview, setNewReview] = useState(""); // Review input state
  const [isLiked, setIsLiked] = useState(false); // Track if liked
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const fetchMealData = async () => {
      try {
        const response = await fetch(`https://hotel-management-server-one.vercel.app/meal/${id}`);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch meal data. Status: ${response.status}`
          );
        }
        const data = await response.json();
        setMeal(data);
        setLikes(data.likes || 0);
        setIsLiked(data.isLiked || false); // Initialize like status
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMealData();
  }, [id]);

  const handleLike = async () => {
    if (!user) {
      navigate("/login"); // Redirect to login page if not logged in
      return;
    }

    try {
      const res = await fetch(`https://hotel-management-server-one.vercel.app/meal/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setLikes(likes + 1);
        setIsLiked(true);
        Swal.fire({
          title: "Liked!",
          text: "You have liked this meal.",
          icon: "success",
          confirmButtonText: "Close",
        });
      } else {
        toast.error("Failed to update likes.");
      }
    } catch (error) {
      console.error("Error liking meal:", error);
      toast.error("Failed to update likes.");
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReview) {  // Only check for newReview as user name is taken from `user.displayName`
      toast.error("Please write a review.");
      return;
    }
  
    try {
      const res = await fetch(`https://hotel-management-server-one.vercel.app/meal/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user.displayName,  // Use the logged-in user's name
          email: user.email,
          review: newReview,
        }),
      });
  
      const data = await res.json();
  
      if (res.ok && data.success) {
        setMeal((prevMeal) => ({
          ...prevMeal,
          reviews: [...prevMeal.reviews, { user: user.displayName, review: newReview }],  // Update reviews
        }));
        setNewReview("");  // Reset the review input
        Swal.fire({
          title: "Review Added!",
          text: "Your review has been successfully added.",
          icon: "success",
          confirmButtonText: "Close",
        });
      } else {
        toast.error("Failed to add review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to add review.");
    }
  };
  

  const handleRequest = async () => {
    if (!user || !user.email) {
      navigate("/login"); // Redirect to login page if not logged in
      return;
    }

    const requestData = {
      email: user.email,
      mealName: meal.name,
      image: meal.image,
      time: new Date().toISOString(),
    };

    try {
      const res = await fetch(`https://hotel-management-server-one.vercel.app/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        Swal.fire({
          title: "Request Sent!",
          text: "Your meal request has been submitted.",
          icon: "success",
          confirmButtonText: "Close",
        });
      } else {
        toast.error("Failed to send request.");
      }
    } catch (error) {
      console.error("Error sending request:", error);
      toast.error("Failed to send request.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white text-black dark:bg-gray-800 dark:text-white transition-all ease-in-out duration-300">
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Meal Info - Display Meal */}
        <div className="meal-info bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-semibold text-center mb-4">
            {meal.name}
          </h1>
          <img
            src={meal.image}
            alt={meal.name}
            className="w-full max-w-sm rounded-lg shadow-md mb-4 mx-auto"
          />
          <p className="text-base font-medium mb-2">
            <strong>Distributor:</strong> {meal.distributor}
          </p>
          <p className="text-base font-medium mb-2">
            <strong>Description:</strong> {meal.description}
          </p>
          <p className="text-base font-medium mb-2">
            <strong>Ingredients:</strong> {meal.ingredients.join(", ")}
          </p>
          <p className="text-base font-medium mb-2">
            <strong>Posted on:</strong>{" "}
            {new Date(meal.post_time).toLocaleDateString()}
          </p>
          <p className="text-base font-medium mb-2">
            <strong>Price:</strong> {meal.price} $
          </p>
          <p className="text-base font-medium mb-2">
            <strong>Rating:</strong> {meal.rating}{" "}
            <span className="text-yellow-500">★</span>
          </p>

          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={handleLike}
              className="btn bg-orange-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-orange-700 transition-colors duration-300 text-lg border-none"
              disabled={isLiked} // Disable button if liked
            >
              {isLiked ? `Liked (${likes})` : `Like (${likes})`}
            </button>

            <button
              onClick={handleRequest}
              className="btn bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 text-lg border-none"
            >
              Request Meal
            </button>
          </div>
        </div>

        {/* Reviews - Display Reviews */}
        <div className="reviews bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Reviews ({meal.reviews.length})
          </h2>
          {meal.reviews.length > 0 ? (
            meal.reviews.map((review, index) => (
              <div
                key={index}
                className="review mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
              >
                <p className="text-base font-medium mb-2">
                  <strong>{review.user}:</strong>
                </p>
                <p className="text-base">{review.review}</p>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}

          {/* Add Review Form */}
          <form onSubmit={handleSubmitReview} className="mt-6">
            <textarea
              placeholder="Write a review..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 rounded-md"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
