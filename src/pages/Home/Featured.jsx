import SectionTitle from "../../components/SectionTitle";
import featuredImg from "../../assets/home/featured.jpg";

const Featured = () => {
  return (
    <div className="featured-item bg-fixed text-white pt-8 my-10">
      <SectionTitle heading="Featured Meal" subHeading="Check it out" />

      <div className="md:flex justify-center items-center bg-[#151515] bg-opacity-70 py-12 px-6 md:px-36 rounded-lg shadow-xl transition-all duration-500 ease-in-out">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img src={featuredImg} alt="Featured Meal" className="rounded-lg shadow-lg object-cover w-full h-96 md:h-full" />
        </div>

        <div className="md:ml-10 text-center md:text-left">
          <p className="text-yellow-500 font-bold text-sm">March 20, 2023</p>
          <h2 className="text-3xl font-semibold my-2">Where Can I Get Some?</h2>
          <p className="text-lg mb-6 text-gray-200">
            Experience the taste of our featured meal, prepared with love and the finest ingredients. A combination of freshness and flavor, this dish is perfect for any occasion.
          </p>

          <button className="btn bg-transparent text-white border-b-2 border-white hover:border-yellow-500 hover:text-yellow-500 transition-all duration-300 ease-in-out px-6 py-2 rounded-md">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
