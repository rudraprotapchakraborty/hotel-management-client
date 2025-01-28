import SectionTitle from "../../components/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://hotel-management-server-liart.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);

  return (
    <section className="my-20 px-6 md:px-16">
      <SectionTitle heading={"TESTIMONIALS"} subHeading={"What Our Clients Say"} />

      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="flex flex-col items-center mx-6 md:mx-24 mt-16 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
              <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
              />
              <p className="py-6 text-center text-lg text-gray-700 dark:text-gray-300">
                {review.details}
              </p>
              <h3 className="text-2xl text-[#CD9003] font-semibold">
                {review.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
