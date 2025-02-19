import SectionTitle from "../../components/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const Testimonials = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch("https://hotel-management-server-one.vercel.app/meal")
      .then((res) => res.json())
      .then((data) => {
        setMeals(data);
      });
  }, []);

  // Duplicate meals if there are less than 3 to prevent the loop warning
  const duplicatedMeals = meals.length >= 3 ? meals : [...meals, ...meals];

  return (
    <section className="my-20 px-6 md:px-16">
      <SectionTitle heading={"Reviews"} subHeading={"What Our Customers Are Saying"} />

      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        spaceBetween={30}
        slidesPerView={1}
        loop={duplicatedMeals.length >= 3} // Enable loop only if there are enough slides
      >
        {duplicatedMeals.map((meal, index) => (
          <SwiperSlide key={`${meal._id}-${index}`}>
            <div className="flex flex-col items-center mx-6 md:mx-24 mt-16 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
              <img src={meal.image} alt={meal.name} className="w-full h-56 object-cover rounded-lg" />
              <Rating style={{ maxWidth: 180 }} value={meal.rating} readOnly />
              <p className="py-6 text-center text-lg text-gray-700 dark:text-gray-300">
                {meal.recipe}
              </p>
              <h3 className="text-2xl text-[#CD9003] font-semibold">{meal.name}</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Price: ${meal.price}
              </p>

              {/* Display reviews for each meal */}
              <div className="mt-4 space-y-4">
                {meal.reviews.map((review, index) => (
                  <div key={index} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">{review.user}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{review.review}</p>
                  </div>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
