import { NavLink } from "react-router-dom";
import error from "../../assets/404.png"

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-center">
                <img src={error} alt="" />
                <h1 className="mt-4 text-5xl font-semibold">Sorry We Can not Find That Page!
                </h1>
                <p className="mt-4 text-2xl">The page you are looking for was moved, removed,<br></br> renamed or never existed.</p>
                <button className="mt-2 text-xl bg-orange-400 text-white rounded-3xl px-4 py-2 font-bold"><NavLink to="/">Go to Home</NavLink></button>
            </div>
        </div>
    );
};

export default ErrorPage;