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

        },
        // Admin Routes
        {
          path:'allUsers',
          element:<AllUsers></AllUsers>

        },
        {
          path:'addItem',
          element:<AddItems></AddItems>
        }
      ]
    }
  ]);

  export default router;