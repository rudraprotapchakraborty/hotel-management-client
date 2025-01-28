import { Link } from "react-router-dom";

const MealItem = ({ item }) => {
  const { image, price, name, recipe, _id } = item;

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 mb-6">
      {/* Image Section */}
      <div className="relative w-full h-56 rounded-lg overflow-hidden mb-4">
        <img
          className="w-full h-full object-cover transition-all duration-300 transform hover:scale-110"
          src={image}
          alt={name}
        />
      </div>
      {/* Text and Link Section */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white uppercase">
          {name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {recipe}
        </p>
        <Link
          to={`/mealDetails/${item._id}`} // Dynamically pass the meal's ID
          className="inline-block mt-4 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-300"
        >
          Details
        </Link>
      </div>
      {/* Price Section */}
      <p className="text-[#BB8506] font-semibold text-xl mt-4">${price}</p>
    </div>
  );
};

export default MealItem;
