import SectionTitle from "../../components/SectionTitle";
import featuredImg from "../../assets/meal/pizza-bg.jpg";
import { NavLink } from "react-router-dom";

const Featured = () => {
  return (
    <div className="featured-item bg-fixed text-white pt-8 my-10 dark:bg-gray-900">
      <SectionTitle heading="Featured Meal" subHeading="Check it out" />

      <div className="flex flex-col md:flex-row justify-center items-center bg-[#151515] bg-opacity-70 py-12 px-6 md:px-36 rounded-lg shadow-xl transition-all duration-500 ease-in-out dark:bg-gray-800">
        {/* Image Section */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img 
            src={featuredImg} 
            alt="Featured Meal" 
            className="rounded-lg shadow-lg object-cover w-full h-96 md:h-full"
          />
        </div>

        {/* Text Content */}
        <div className="md:ml-10 text-center md:text-left">
          <p className="text-yellow-500 font-bold text-sm">February 20, 2025</p>
          <h2 className="text-3xl font-semibold my-2">Margherita Pizza</h2>
          <p className="text-lg mb-6 text-gray-200 dark:text-gray-300">
          Classic tomato sauce, mozzarella cheese, and fresh basil.
          </p>

          <NavLink to="/mealDetails/679c9908d05a74a71f7c03d7"><button className="btn bg-transparent text-white border-b-2 border-white hover:border-yellow-500 hover:text-yellow-500 transition-all duration-300 ease-in-out px-6 py-2 rounded-md dark:border-gray-400 dark:hover:border-yellow-500 dark:hover:text-yellow-500">
            Read More
          </button></NavLink>
        </div>
      </div>
    </div>
  );
};

export default Featured;
