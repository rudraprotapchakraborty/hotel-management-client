import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useEffect, useState } from "react";
import useMeal from "../../hooks/useMeal";
import OrderTab from "./OrderTab";
import { useParams } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";

// Spinner Component
const Spinner = () => (
  <div className="flex justify-center items-center h-32">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-500"></div>
  </div>
);

const Order = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ["breakfast", "lunch", "dinner", "allMeals"];
  const { category } = useParams();
  const initialIndex = categories.includes(category) ? categories.indexOf(category) : 0;
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [meal, loading] = useMeal(); // Keep useMeal as it is

  // Group meals by category
  const groupedMeals = categories.map((cat) => ({
    category: cat.toUpperCase(),
    items: meal.filter((item) => item.category.includes(cat)),
  }));

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8 px-4">
      <SectionTitle heading="Meals Category" subHeading="---Explore all the categories---" />
      
      {loading ? (
        <Spinner />
      ) : (
        <Tabs
          selectedIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}
          className="w-full mx-auto max-w-7xl"
        >
          <TabList className="flex flex-wrap justify-center space-x-4 sm:space-x-6 md:space-x-8 mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md overflow-x-auto">
            {groupedMeals.map(({ category }, index) => (
              <Tab
                key={category}
                className={`text-sm sm:text-lg font-semibold py-2 px-4 sm:px-6 cursor-pointer transition-all duration-300 ease-in-out focus:outline-none
                  ${tabIndex === index
                    ? "text-yellow-500 border-b-2 border-yellow-500"
                    : "text-gray-600 dark:text-gray-300 hover:text-yellow-500"
                  }`}
              >
                {category}
              </Tab>
            ))}
          </TabList>

          {groupedMeals.map((group, index) => (
            <TabPanel key={index} className={tabIndex === index ? "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md" : "hidden"}>
              {group.items.length > 0 ? <OrderTab items={group.items} /> : <p className="text-center text-gray-500">No meals available.</p>}
            </TabPanel>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default Order;
