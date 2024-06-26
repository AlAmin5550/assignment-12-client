import { Link, NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logo from "../../assets/SVG/Logo.svg"
import useAuth from "../../Hooks/useAuth";
import useAdmin from "../../Hooks/useAdmin";

const Navbar = () => {
    const {user, logOut} = useAuth();
    const [isAdmin] =useAdmin();
    const links =
    <>

        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/allMeals">Meals</NavLink></li>
        <li><NavLink to="/upcoming">Upcoming</NavLink></li>
        {
            user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li><Link to="/dashboard/usersHome">Dashboard</Link></li>
        }
    </>
    const handleSignOut = () =>{
        logOut()
        .then(() => {
            // console.log(result)
            
        }).catch(() => {
            // console.log(err)
        });
    }
    return (
        <div >
        <div className="navbar z-10 absolute text-[#134E4A]">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {links}

                    </ul>
                </div>
                <div className="flex">
                    <img className="w-12 h-12  border border-white" src={logo} alt="" />
                    <a href="/" className="btn btn-ghost text-[#546E7A]  font-extrabold sm:text-sm md:text-xl lg:text-2xl">UniLodge</a>

                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                <div>
                    {

                        user ? <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    {
                                        user ? <img className="w-12 h-12 rounded-full ring-2 ring-offset-4 bg-gray-500 ring-default-600 ring-offset-gray-100" src={user?.photoURL} alt="img not found" /> : <FaUserCircle/>
                                    }
                                </div>
                            </div>
                            {
                                user ? <ul tabIndex={0} className="mt-3 z-[999] p-2  shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 text-[#063970]">
                                    <li>
                                        <a className="justify-between">
                                            {user.displayName}

                                        </a>
                                    </li>
                                    <li><a onClick={handleSignOut}>Sign out</a></li>
                                </ul> : ""
                            }

                        </div> : <div className="flex"><Link to="/login"><button className="btn btn-sm btn-ghost">Sign in</button></Link><Link to="/signUp"><button className="btn btn-sm btn-ghost">Sign up</button></Link></div>

                    }
                </div>


            </div>
        </div>
    </div>
    );
};

export default Navbar;