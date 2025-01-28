import FoodCard from "../../components/FoodCard";

const OrderTab = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4 py-8">
      {items.map((item) => (
        <div
          key={item._id}
          className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg rounded-lg bg-white dark:bg-gray-800 dark:text-white overflow-hidden"
        >
          <FoodCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default OrderTab;
