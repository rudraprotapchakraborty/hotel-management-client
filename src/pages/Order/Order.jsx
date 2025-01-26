import { Helmet } from "react-helmet-async";
import Cover from "../Shared/Cover";
import orderImg from "../../assets/shop/banner2.jpg"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import { useEffect, useState } from "react";
import useMeal from "../../hooks/useMeal";
import OrderTab from "./OrderTab";
import { useParams } from "react-router-dom";

const Order = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category) !== -1 ? categories.indexOf(category) : 0;
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [meal] = useMeal();

    const dessert = meal.filter(item => item.category === "dessert");
    const soup = meal.filter(item => item.category === "soup");
    const salad = meal.filter(item => item.category === "salad");
    const pizza = meal.filter(item => item.category === "pizza");
    const drinks = meal.filter(item => item.category === "drinks");

    return (
        <div>
            <Helmet>
                <title>Hotel Management | Order</title>
            </Helmet>
            <Cover img={orderImg} title={"OUR SHOP"}></Cover>
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>SALAD</Tab>
                    <Tab>PIZZA</Tab>
                    <Tab>SOUP</Tab>
                    <Tab>DESSERT</Tab>
                    <Tab>DRINKS</Tab>
                </TabList>
                <TabPanel>
                    <OrderTab items={salad}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={pizza}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={soup}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={dessert}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={drinks}></OrderTab>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;