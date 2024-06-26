import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import Error from "../Components/Error";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Authentication/Login";
import SignUp from "../Pages/Authentication/SignUp";
import AllMeals from "../Pages/AllMeals/AllMeals";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import AddItems from "../Pages/Dashboard/Admin/AddItems";
import MealDetails from "../Pages/MealDetails/MealDetails";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile";
import UpcomingMeals from "../Pages/Dashboard/Admin/UpcomingMeals";
import Upcoming from "../Pages/Upcoming/Upcoming";
import ServeMeals from "../Pages/Dashboard/Admin/ServeMeals";
import AllReviews from "../Pages/Dashboard/Admin/AllReviews";
import MealsManage from "../Pages/Dashboard/Admin/MealsManage";
import UpdateItem from "../Pages/Dashboard/Admin/UpdateItem";
import UsersProfile from "../Pages/Dashboard/Users/UsersProfile";
import PrivateRoutes from "./PrivateRoutes";
import RequestedMeals from "../Pages/Dashboard/Users/RequestedMeals";
import UserReviews from "../Pages/Dashboard/Users/UserReviews";
import Payment from "../Pages/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/Users/PaymentHistory";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      errorElement:<Error></Error>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'login',
            element:<Login></Login>
        },
        {
            path:'signUp',
            element:<SignUp></SignUp>
        },
        {
          path:'allMeals',
          element:<AllMeals></AllMeals>
        },
        {
          path:'/mealDetails/:id',
          element:<MealDetails></MealDetails>
        },
        {
          path:'/upcoming',
          element:<Upcoming></Upcoming>
        },
        {
          path:'/payment/:pack',
          element:<PrivateRoutes><Payment></Payment></PrivateRoutes>
        }
      ]
    },
    {
      path:'/dashboard',
      element:<Dashboard></Dashboard>,
      errorElement:<Error></Error>,
      children:[
        // User routes
        {
          path:'usersHome',
          element: <PrivateRoutes><UsersProfile></UsersProfile></PrivateRoutes>

        },
        {
          path:'usersRequests',
          element:<PrivateRoutes><RequestedMeals></RequestedMeals></PrivateRoutes>
        },
        {
          path:'usersReviews',
          element:<PrivateRoutes><UserReviews></UserReviews></PrivateRoutes>
        },
        {
          path:'userPayments',
          element:<PrivateRoutes><PaymentHistory></PaymentHistory></PrivateRoutes>

        },
        // Admin Routes
        {
          path:'allUsers',
          element:<AllUsers></AllUsers>

        },
        {
          path:'addItem',
          element:<AddItems></AddItems>
        },
        {
          path:'adminHome',
          element:<AdminProfile></AdminProfile>
        },
        {
          path:'upcomingMeals',
          element:<UpcomingMeals></UpcomingMeals>
        },
        {
          path:'serveMeals',
          element:<ServeMeals></ServeMeals>
        },
        {
          path:'allReviews',
          element:<AllReviews></AllReviews>
        },
        {
          path:'manageMeals',
          element:<MealsManage></MealsManage>
        },
        {
          path:'manageMeals/updateMeals/:id',
          element:<UpdateItem></UpdateItem>,
          loader:({params})=> fetch(`http://localhost:5000/meal/${params.id}`)
        }
      ]
    }
  ]);

  export default router;