import { NavLink, Outlet } from "react-router-dom";
import { FaUser, FaUsers, FaUtensils } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
import { IoBookmarkOutline,  IoCartOutline, IoHomeOutline, IoSearch } from "react-icons/io5";
import { MdOutlineReviews } from "react-icons/md";
import { LuCalendarClock } from "react-icons/lu";
import { BiSolidDish } from "react-icons/bi";

const Dashboard = () => {
    const isAdmin = true;
    return (
        <div className="flex">
        <div className="w-64 min-h-screen bg-[#77bad5] bg-opacity-40">
            <ul className="menu p-4 space-y-3">
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
                            <NavLink to="/dashboard/manageBookings"><FaBook /> All Meal</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/allUsers"><MdOutlineReviews/>  All Reviews</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/allUsers"><BiSolidDish/> Serve Meals</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/allUsers"><LuCalendarClock/> Upcoming Meals</NavLink>
                        </li>
                    </> : <>
                        <li>
                            <NavLink to="/dashboard/userHome"><FaUser/> My Profile</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/cart"><IoCartOutline></IoCartOutline> Requested Meals</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/cart"><MdOutlineReviews/> My Reviews</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/UserPayments"><IoBookmarkOutline /> Payments History</NavLink>
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