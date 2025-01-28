import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SectionTitle from "../../components/SectionTitle";
import MealsCategory from "./MealsCategory";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMeals = async () => {
    try {
      const response = await fetch(
        `https://hotel-management-server-liart.vercel.app/meal?search=${searchTerm}&category=${category}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&page=${page}&limit=10`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch meals");
      }
      const data = await response.json();
      if (data.length < 10) setHasMore(false);
      setMeals((prev) => [...prev, ...data]);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  useEffect(() => {
    setMeals([]);
    setPage(1);
    setHasMore(true);
    fetchMeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, category, priceRange]);

  useEffect(() => {
    if (page > 1) fetchMeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="bg-white dark:bg-gray-800 transition-all duration-500">
      <Helmet>
        <title>Hotel Management | Meals</title>
      </Helmet>
      {/* Filters and Search */}
      <div className="p-6 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg shadow-md">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <input
            type="text"
            placeholder="Search meals..."
            className="input input-bordered w-full md:w-1/3 transition-all duration-300 hover:border-yellow-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="select select-bordered w-full md:w-1/4 transition-all duration-300 hover:border-yellow-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="dessert">Dessert</option>
            <option value="soup">Soup</option>
            <option value="salad">Salad</option>
            <option value="pizza">Pizza</option>
          </select>
          <div className="flex items-center gap-4 w-full md:w-1/3">
            <span className="text-gray-800 dark:text-white">Price:</span>
            <input
              type="range"
              min="0"
              max="50"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="transition-all duration-300 dark:bg-gray-600"
            />
            <input
              type="range"
              min="0"
              max="50"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="transition-all duration-300 dark:bg-gray-600"
            />
            <span className="text-gray-800 dark:text-white">${priceRange[0]} - ${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Infinite Scrolling */}
      <InfiniteScroll
        dataLength={meals.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={hasMore}
        loader={<h4 className="text-center py-4 text-gray-600 dark:text-white">Loading more meals...</h4>}
      >
        <SectionTitle heading={"All Meals"} subHeading={"--- Explore all the meals ---"} />
        <MealsCategory items={meals} />
      </InfiniteScroll>
    </div>
  );
};

export default Meals;
