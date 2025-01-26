import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Meals from "../pages/Meal/Meals";
import UpcomingMeals from "../pages/UpcomingMeals/UpcomingMeals";
import MealDetails from "../pages/MealDetails/MealDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'meals',
        element: <Meals></Meals>
      },
      {
        path: 'meal-details',
        element: <MealDetails></MealDetails>
      },
      {
        path: 'upcoming-meals',
        element: <UpcomingMeals></UpcomingMeals>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>
      }
    ]
  },
]);