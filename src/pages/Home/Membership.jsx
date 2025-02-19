import { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import useCart from "../../hooks/useCart"; // import useCart hook
import useAxiosSecure from "../../hooks/useAxiosSecure"; // import useAxiosSecure hook
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth"; // import useAuth hook
import { useNavigate, useLocation, Link } from "react-router-dom"; // import useNavigate and useLocation hooks
import Spinner from "../../components/Spinner";

const Membership = () => {
  const [membershipPlans, setMembershipPlans] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for spinner
  const [cart, refetch] = useCart(); // Get cart data and refetch function
  const axiosSecure = useAxiosSecure(); // Initialize axiosSecure
  const { user } = useAuth(); // Get user from useAuth
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Fetch the membership plans from the API
    fetch("https://hotel-management-server-one.vercel.app/membership")
      .then((response) => response.json())
      .then((data) => {
        // Filter out the 'Bronze Plan'
        const filteredPlans = data.filter((plan) => plan.name !== "Bronze Plan");
        setMembershipPlans(filteredPlans);
        setLoading(false); // Stop loading after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching membership plans:", error);
        setLoading(false); // Stop loading on error
      });
  }, []);

  // Function to add a membership plan to the cart
  const addToCart = (plan) => {
    if (user && user.email) {
      const newItem = {
        planId: plan._id,
        name: plan.name,
        price: plan.price,
        features: plan.features,
        email: user.email,
      };

      axiosSecure.post("/carts", newItem)
        .then(() => {
          refetch();
          Swal.fire({
            title: "Success!",
            text: `${plan.name} added to cart.`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          console.error("Error adding item to cart:", error);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } else {
      Swal.fire({
        title: "Please login first!",
        text: "You need to be logged in to add membership plans to cart.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen pt-4">
      {/* Page Header */}
      <SectionTitle heading={"Upgrade to Premium"} subHeading={"--- Choose your membership plan ---"} />

      {/* Spinner/Loader */}
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
          {membershipPlans.map((plan) => (
            <div key={plan._id} className="flex flex-col bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-6">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">{plan.name}</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">{plan.description}</p>
              </div>
              <p className="text-4xl font-bold text-[#BB8506] text-center mb-4">${plan.price}/month</p>
              <ul className="text-gray-600 dark:text-gray-400 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <div>
                <Link to="/dashboard/cart">
                  <button onClick={() => addToCart(plan)} className="inline-block text-white bg-[#BB8506] hover:bg-[#9b6d07] py-2 px-4 rounded-lg text-center transition-colors duration-300">
                    Purchase Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Membership;
