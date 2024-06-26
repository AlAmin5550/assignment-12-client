import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";


const MealDetails = () => {
    const { user, loading } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const { data: meal = {} } = useQuery({
        queryKey: ['mealDetails'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/meal/${id}`)
            return res.data;
        }
    })
    const { data: userDetail } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`)
            return res.data;
        }
    })
    const handleRequest = () => {
        if (user && userDetail.badge !== 'bronze') {
            const mealItem = {
                mealId: meal._id,
                email: user.email,
                name: meal.name,
                price: meal.price,
                status: 'pending',

            }

            axiosSecure.post("/request", mealItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            icon: "success",
                            title: "Successful",
                            text: "Added to request list!",
                        });
                    }
                })
        }
        else {
            Swal.fire({
                title: "You are not Logged in or don't have a Plan!",
                text: "Please login/buy a plan!",
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
    const handleLike = () => {
        if (user) {
            const mealItem = {
                mealId: meal._id,
                name: meal.name,
                email: user.email,
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
                    else{
                        Swal.fire({
                            icon: "error",
                            title: "Nope!",
                            text: "Already Liked!",
                        })
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
    const handleReview = e => {
        e.preventDefault();
        const form = e.target;
        const review = form.review.value;
        if (user) {
            const mealItem = {
                mealId: meal._id,
                name: meal.name,
                email: user.email,
                review: review,
            }

            axiosSecure.post("/reviews", mealItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            icon: "success",
                            title: "Successful",
                            text: "Review Added!",
                        });
                        form.reset();
                    }
                    else {
                        Swal.fire({
                            icon: "error",
                            title: "Nope!",
                            text: "Already Reviewed!",
                        });
                        form.reset();
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
    const ingredients = meal.ingredients;
    return (
        <div className="pt-16 max-w-7xl mx-auto">
            <Helmet>
                <title>uniLodge | Details</title>
            </Helmet>
            <div className="flex flex-col items-center  md:flex-row">
                <div>
                    <img className="w-[300px] h-[400px]" src={meal.image} alt="" />
                </div>
                <div className="p-16">
                    <h1 className="text-5xl font-bold">Meal Detail</h1>
                    <h1 className="text-4xl font-bold ">-{meal.name}</h1>
                    <h1 className="text-2xl font-semibold">{meal.price}$</h1>
                    <div className="flex gap-5">
                        <h1 className="flex items-center"><FaStar className="text-yellow-300" />{meal.rating}</h1>
                        <h1>Posted:<span className="text-green-400">{meal.posted}</span></h1>
                    </div>
                    <button onClick={handleLike} className="btn btn-sm text-white"><AiFillLike className="text-white" /></button>
                    <button onClick={() => handleRequest()} className="btn btn-sm btn-outline bg-red-500 ml-2 text-white">Request</button>

                </div>
            </div>
            <div className="divider"></div>
            <div>
                <div>
                    <h1 className="text-3xl font-bold">Description:</h1>
                    <p>{meal.description}</p>
                </div>
                <div>
                    <h1 className="text-3xl font-bold">Ingredients:</h1>
                    <ul>
                        {
                            ingredients?.map((ingredient, idx) => <li key={idx}>{ingredient}</li>)
                        }
                    </ul>
                </div>
                <div className="flex gap-3">
                    <h1 className="text-xl font-bold">For: {meal.category}</h1>
                    <h1 className="text-xl">Distributor: {meal.distributor}</h1>
                </div>
            </div>
            <div className="divider"></div>
            <div>
                <h1 className="text-4xl font-bold">Review</h1>
                <p>Leave your Review here!</p>
                <form onSubmit={handleReview} className="flex flex-col w-1/3 gap-2">
                    <textarea className="textarea textarea-secondary" name="review" placeholder="Bio"></textarea>
                    <input type="submit" value="Post" className="btn bg-red-400" />

                </form>


            </div>


        </div>
    );
};

export default MealDetails;