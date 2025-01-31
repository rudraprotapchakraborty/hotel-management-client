import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const MealDetails = () => {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [likes, setLikes] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        const fetchMealData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/meal/${id}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch meal data. Status: ${response.status}`);
                }
                const data = await response.json();
                setMeal(data);
                setLikes(data.likes || 0);
                setReviews(data.reviews || []);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchMealData();
    }, [id]);

    const handleLike = async () => {
        try {
            const response = await fetch(`http://localhost:5000/meal/like/${id}`, {
                method: "POST",
            });
            const data = await response.json();
            if (data.success) {
                setLikes(likes + 1);
                toast.success("You liked this meal!");
            } else {
                toast.error("Failed to like the meal.");
            }
        } catch (error) {
            toast.error("Error liking the meal.");
        }
    };

    const handleRequestMeal = async () => {
        if (!isSubscribed) {
            toast.error("You must have a subscription to request a meal.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/meal/request/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: "user123",
                    mealId: id,
                    status: "pending",
                }),
            });
            const data = await response.json();
            if (data.success) {
                toast.success("Meal request sent successfully!");
            } else {
                toast.error("Failed to request the meal.");
            }
        } catch (error) {
            toast.error("Error requesting the meal.");
        }
    };

    const handleAddReview = async () => {
        if (!reviewText.trim() || rating === 0) {
            toast.error("Please enter both a review and a rating.");
            return;
        }

        const newReview = {
            name: "Anonymous",
            details: reviewText,
            rating: rating
        };

        try {
            const response = await fetch(`http://localhost:5000/meal/review/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newReview),
            });
            const data = await response.json();
            if (data.success) {
                setReviews([...reviews, data.review]);
                setReviewText("");
                setRating(0);
                toast.success("Review added!");
            } else {
                toast.error("Failed to add review.");
            }
        } catch (error) {
            toast.error("Error adding review.");
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
            <div className="max-w-2xl mx-auto p-6">
                {/* Meal Info - Smaller Card Design */}
                <div className="meal-info bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md p-6 mb-6">
                    <h1 className="text-3xl font-semibold text-center mb-4">{meal.name}</h1>
                    <img src={meal.image} alt={meal.name} className="w-full max-w-sm rounded-lg shadow-md mb-4 mx-auto" />
                    <p className="text-base font-medium mb-2"><strong>Recipe:</strong> {meal.recipe}</p>
                    <p className="text-base mb-2"><strong>Category:</strong> {meal.category}</p>
                    <p className="text-xl font-semibold text-orange-600 mb-4"><strong>Price:</strong> ${meal.price}</p>
                </div>

                {/* Like Button */}
                <div className="flex justify-center gap-4 mb-4">
                    <button
                        onClick={handleLike}
                        className="btn bg-orange-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-orange-700 transition-colors duration-300 text-lg border-none"
                    >
                        Like {likes}
                    </button>

                    <button
                        onClick={handleRequestMeal}
                        className="btn bg-green-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 text-lg border-none"
                    >
                        Request Meal
                    </button>
                </div>

                {/* Review Section */}
                <div className="review-section mt-6">
                    <h2 className="text-2xl font-semibold text-center mb-4">Reviews</h2>
                    <div className="reviews-list space-y-4">
                        {reviews.map((review, index) => (
                            <div key={index} className="review bg-gray-200 dark:bg-gray-600 rounded-lg shadow-md p-4">
                                <h3 className="text-lg font-semibold">{review.name}</h3>
                                <p className="text-sm">{review.details}</p>
                                <p className="text-sm font-bold">Rating: {review.rating}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6">
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Add your review here..."
                            className="textarea w-full p-4 rounded-lg bg-transparent shadow-md mb-4 text-base border-none dark:bg-transparent dark:text-white"
                        ></textarea>
                        <div className="rating mb-4">
                            <label className="mr-2">Rating:</label>
                            <select
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                                className="bg-transparent text-base border-none dark:text-white"
                            >
                                <option value={0}>Select Rating</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                        </div>
                        <button
                            onClick={handleAddReview}
                            className="btn bg-orange-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-orange-700 transition-colors duration-300 text-lg border-none"
                        >
                            Add Review
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealDetails;
