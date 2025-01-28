import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Featured from "./Featured";
import Testimonials from "./Testimonials";
import Order from "../Order/Order";
import Membership from "./Membership";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Hotel Management</title>
            </Helmet>
            <Banner></Banner>
            <Order></Order>
            <Featured></Featured>
            <Testimonials></Testimonials>\
            <Membership></Membership>
        </div>
    );
};

export default Home;