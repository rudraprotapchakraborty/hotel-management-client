import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Category from "./Category";
import Featured from "./Featured";
import Testimonials from "./Testimonials";
import PopularMeal from "./PopularMeal";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Hotel Management</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <PopularMeal></PopularMeal>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;