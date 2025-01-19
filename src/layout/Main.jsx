import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer";
import Navbar from "../pages/Shared/Navbar";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Main = () => {

    const { darkMode, toggleDarkMode } = useContext(ThemeContext); // Accessing context here

    return (
        <div className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
            <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;