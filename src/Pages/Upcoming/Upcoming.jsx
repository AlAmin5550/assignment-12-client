import { useQuery } from "@tanstack/react-query";
import DashboardTitle from "../../Components/Shared/DashboardTitle";
import { FaStar } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const Upcoming = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const {user} =useAuth();
    const navigate = useNavigate();
    const {data:meals=[]}=useQuery({
        queryKey:['upcoming'],
        queryFn: async ()=>{
            const res = await axiosPublic.get('/upcoming')
            return res.data
        }
    })
    const handleLike = (meal) => {
        if (user) {
            const mealItem = {
                mealId: meal._id,
                name: meal.name,
                email: user.email,
                state: 'upcoming',
            }

            axiosSecure.post("/likes", mealItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            icon: "success",
                            title: "Successful",
                            text: "Liked!",
                        });
                    }
                })
        }
        else {
            Swal.fire({
                title: "You are not Logged in ?",
                text: "Please login!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            });
        }

    }
    return (
        <div className="pt-16 max-w-7xl mx-auto">
            <DashboardTitle header='Upcoming Meals'></DashboardTitle>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {
                    meals.map(meal=> <div key={meal._id} className="max-w-xs p-6 rounded-md shadow-md border border-[#77bad5] text-gray-900 mb-5">
                        <img src={meal.image} alt="" className="object-cover object-center w-full rounded-md h-72 bg-gray-500" />
                        <div className="mt-6 mb-2">
                            <span className="flex text-xs font-medium tracking-widest uppercase text-default-600">{meal.rating}<FaStar className="text-yellow-300"/>  Rating</span>
                            <h2 className="text-xl font-semibold tracking-wide">{name}</h2>
                        </div>
                        <p className="text-gray-800 flex items-center">{meal.price}$</p>
                       <button onClick={()=>handleLike(meal)} className="btn btn-outline  text-[#77bad5]">Like</button>
                    </div>)
                }
            </div>
            
        </div>
    );
};

export default Upcoming;