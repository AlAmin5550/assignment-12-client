import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import DashboardTitle from "../../../Components/Shared/DashboardTitle";
import axios from "axios";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHosting = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
const UpdateItem = () => {
    const { user } = useAuth();
    const meal = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        const ingredient = [data.ingredient1, data.ingredient2, data.ingredient3, data.ingredient4];
        const imageFile = { image: data.image[0] };
        // console.log(imageFile)
        const res = await axios.post(imageHosting, imageFile, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const item={
                name: data.name,
                description: data.description,
                ingredients: ingredient,
                category: data.category,
                rating: data.rating,
                price: parseFloat(data.price),
                posted: data.date,
                distributor: user.displayName,
                image: res.data.data.display_url
    
            }

            const mealRes = await axiosSecure.patch('/upcoming', item)
            // console.log(mealRes.data)
            if (mealRes.data.updatedCount>0) {
                reset()
                Swal.fire({
                    icon: "success",
                    title: "Successful",
                    text: `${data.name} updates Successfully!`,
                });
            }
        }


    }
    
    return (
        <div>
            <Helmet>
                <title>uniLodge | Add Items</title>
            </Helmet>
            <DashboardTitle header="Update Meal"></DashboardTitle>
            <div>
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Meal Name*</span>
                        </div>
                        <input type="text"  {...register("name")} defaultValue={meal.name} placeholder="Type here" className="input input-bordered w-full" />
                    </label>
                    <div className="flex gap-6">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Category* </span>
                            </div>
                            <select className="select select-bordered w-full " defaultValue={meal.category} {...register("category")}>
                                <option disabled value='default'>Select item Category!</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">lunch</option>
                                <option value="dinner">Dinner</option>

                            </select>
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input type="text"  {...register("price")} defaultValue={meal.price} placeholder="Type here" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="flex gap-6">
                        <label className="form-control w-1/2">
                            <div className="label">
                                <span className="label-text">Rating</span>
                            </div>
                            <input type="number"  {...register("rating")} defaultValue={meal.rating} placeholder="Type here" className="input input-bordered w-full" />
                        </label>
                        <div className="form-control w-1/2">
                            <label htmlFor="email" className="label-text mt-3">Date Posted</label>
                            <input type="date"  {...register("date")} defaultValue={meal.posted} placeholder="Type here" className="input input-bordered w-full" />
                        </div>

                    </div>
                    <div>
                        <label className="form-control w-1/2">
                            <div className="label">
                                <span className="label-text">Ingredients</span>
                            </div>
                            <div className="grid w-full md:grid-cols-2 gap-10">
                                <input type="text"   {...register("ingredient1")} placeholder="Type here" className="input input-bordered w-full" />
                                <input type="text"  {...register("ingredient2")} placeholder="Type here" className="input input-bordered w-full" />
                                <input type="text"  {...register("ingredient3")} placeholder="Type here" className="input input-bordered w-full" />
                                <input type="text"  {...register("ingredient4")} placeholder="Type here" className="input input-bordered w-full" />
                            </div>

                        </label>
                    </div>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Meal Description*</span>
                        </div>
                        <textarea {...register("description")} defaultValue={meal.description} className="textarea textarea-bordered h-24" placeholder="Description"></textarea>
                    </label>
                    <p className="text-red-500 mt-2">*Choose a new photo file.</p>
                    <input type="file" className="file-input file-input-bordered w-full max-w-xs mt-3 mb-10" {...register("image")} />
                    <AwesomeButton type="secondary">Update</AwesomeButton>
                </form>
            </div>


        </div>
    );
};

export default UpdateItem;