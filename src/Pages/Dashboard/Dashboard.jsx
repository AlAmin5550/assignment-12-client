import { NavLink, Outlet } from "react-router-dom";
import { FaUser, FaUsers, FaUtensils } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
import { IoBookmarkOutline,  IoCartOutline, IoHomeOutline, IoSearch } from "react-icons/io5";
import { MdOutlineReviews } from "react-icons/md";
import { LuCalendarClock } from "react-icons/lu";
import { BiSolidDish } from "react-icons/bi";
import useAdmin from "../../Hooks/useAdmin";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    // const isAdmin = false;
    return (
        <div className="flex">
        <div className="w-40 min-h-screen bg-[#77bad5] bg-opacity-40 lg:w-64">
            <ul className="menu lg:p-4 lg:space-y-3">
                {
                    isAdmin ? <>
                        <li>
                            <NavLink to="/dashboard/adminHome"><FaUser/> Admin Profile</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/allUsers"><FaUsers/> Manage Users</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/addItem"><FaUtensils/> Add Meal</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/manageMeals"><FaBook /> All Meal</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/allReviews"><MdOutlineReviews/>  All Reviews</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/serveMeals"><BiSolidDish/> Serve Meals</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/upcomingMeals"><LuCalendarClock/> Upcoming Meals</NavLink>
                        </li>
                    </> : <>
                        <li>
                            <NavLink to="/dashboard/usersHome"><FaUser/> My Profile</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/usersRequests"><IoCartOutline></IoCartOutline> Requested Meals</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/usersReviews"><MdOutlineReviews/> My Reviews</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/userPayments"><IoBookmarkOutline /> Payments History</NavLink>
                        </li>
                    </>
                }

                <div className="divider"></div>
                <li>
                    <NavLink to="/"><IoHomeOutline /> Home</NavLink>
                </li>
                <li>
                    <NavLink to="/allMeals"><IoSearch /> Meals</NavLink>
                </li>

            </ul>

        </div>
        <div className="flex-1 p-10">
            <Outlet></Outlet>
        </div>

    </div>
    );
};

export default Dashboard;