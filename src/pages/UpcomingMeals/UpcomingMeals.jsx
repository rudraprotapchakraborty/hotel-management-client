import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import MealItem from "../Shared/MealItem"; // You can reuse MealItem here
import SectionTitle from "../../components/SectionTitle"; // Optional section title for a header
import useAxiosSecure from "../../hooks/useAxiosSecure"; // Assuming useAxiosSecure is handling secure axios requests
import { Helmet } from "react-helmet-async";
import Spinner from "../../components/Spinner"

const UpcomingMeals = () => {
  const [upcomingMeals, setUpcomingMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure(); // Assuming it's for secure API calls

  useEffect(() => {
    // Fetching upcoming meals where 'upcoming' is true
    axiosSecure
      .get(
        "https://hotel-management-server-one.vercel.app/meal?upcoming=true"
      )
      .then((response) => {
        setUpcomingMeals(response.data);
        setLoading(false);
      })
      // .catch((error) => {
      //   console.error("Error fetching upcoming meals:", error);
      //   Swal.fire({
      //     title: "Error!",
      //     text: "Failed to load upcoming meals.",
      //     icon: "error",
      //     confirmButtonText: "Try Again",
      //   });
      //   setLoading(false);
      // });
  }, [axiosSecure]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">

      <Helmet>
        <title>Hotel Management | Upcoming Meals</title>
      </Helmet>

      {/* Page Header */}
      <SectionTitle
        heading={"Upcoming Meals"}
        subHeading={"--- Don't miss out on our upcoming delicious meals ---"}
      />

      {/* Loading State */}
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
          {upcomingMeals.length > 0 ? (
            upcomingMeals.map((meal) => <MealItem key={meal._id} item={meal} />)
          ) : (
            <div className="text-center text-gray-600 dark:text-white col-span-full">
              No upcoming meals available at the moment.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UpcomingMeals;
