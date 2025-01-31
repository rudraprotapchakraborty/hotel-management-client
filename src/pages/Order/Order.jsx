import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useEffect, useState } from "react";
import useMeal from "../../hooks/useMeal";
import OrderTab from "./OrderTab";
import { useParams } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";

const Order = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ["breakfast", "lunch", "dinner", "allMeals"];
  const { category } = useParams();
  const initialIndex = categories.includes(category) ? categories.indexOf(category) : 0;
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [meal] = useMeal();

  // Dynamically group meals by category
  const groupedMeals = categories.map((cat) => ({
    category: cat.toUpperCase(),
    items: meal.filter((item) => item.category.includes(cat)),
  }));
  

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8">
      <SectionTitle heading="Meals Category" subHeading="---Explore all the categories---" />
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className="w-full mx-auto max-w-7xl">
        <TabList className="flex justify-center space-x-8 mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
          {groupedMeals.map(({ category }, index) => (
            <Tab
              key={category}
              className={`text-xl font-semibold py-2 px-6 cursor-pointer transition-all duration-300 ease-in-out focus:outline-none
                ${tabIndex === index
                  ? "text-yellow-500 border-b-2 border-yellow-500"
                  : "text-gray-600 dark:text-gray-300 hover:text-yellow-500"
                }`}
            >
              {category}
            </Tab>
          ))}
        </TabList>

        {/* Manually render only the active TabPanel */}
        <TabPanel className={tabIndex === 0 ? "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md" : "hidden"}>
          {groupedMeals[0].items.length > 0 && <OrderTab items={groupedMeals[0].items} />}
        </TabPanel>

        <TabPanel className={tabIndex === 1 ? "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md" : "hidden"}>
          {groupedMeals[1].items.length > 0 && <OrderTab items={groupedMeals[1].items} />}
        </TabPanel>

        <TabPanel className={tabIndex === 2 ? "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md" : "hidden"}>
          {groupedMeals[2].items.length > 0 && <OrderTab items={groupedMeals[2].items} />}
        </TabPanel>

        <TabPanel className={tabIndex === 3 ? "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md" : "hidden"}>
          {groupedMeals[3].items.length > 0 && <OrderTab items={groupedMeals[3].items} />}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
