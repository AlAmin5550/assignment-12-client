import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import DashboardTitle from "../../../Components/Shared/DashboardTitle";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import axios from "axios";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHosting = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
const AddItems = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        const ingredient = [data.ingredient1, data.ingredient2, data.ingredient3, data.ingredient4];
        const imageFile = { image: data.image[0] };
        console.log(imageFile)
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

            const mealRes = await axiosSecure.post('/upcoming', item)
            console.log(mealRes.data)
            if (mealRes.data.insertedId) {
                reset()
                Swal.fire({
                    icon: "success",
                    title: "Successful",
                    text: `${data.name} added Successfully!`,
                });
            }
        }


    }
    return (
        <div>
            <Helmet>
                <title>uniLodge | Add Items</title>
            </Helmet>
            <DashboardTitle header="Add Upcoming Meal"></DashboardTitle>
            <div>
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Meal Name*</span>
                        </div>
                        <input type="text"  {...register("name")} placeholder="Type here" className="input input-bordered w-full" />
                    </label>
                    <div className="flex gap-6">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Category* </span>
                            </div>
                            <select className="select select-bordered w-full " defaultValue='default' {...register("category")}>
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
                            <input type="text"  {...register("price")} placeholder="Type here" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="flex gap-6">
                        <label className="form-control w-1/2">
                            <div className="label">
                                <span className="label-text">Rating</span>
                            </div>
                            <input type="number"  {...register("rating")} placeholder="Type here" className="input input-bordered w-full" />
                        </label>
                        <div className="form-control w-1/2">
                            <label htmlFor="email" className="label-text mt-3">Date Posted</label>
                            <input type="date"  {...register("date")} placeholder="Type here" className="input input-bordered w-full" />
                        </div>

                    </div>
                    <div>
                        <label className="form-control w-1/2">
                            <div className="label">
                                <span className="label-text">Ingredients</span>
                            </div>
                            <div className="grid w-full md:grid-cols-2 gap-10">
                                <input type="text"  {...register("ingredient1")} placeholder="Type here" className="input input-bordered w-full" />
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
                        <textarea {...register("description")} className="textarea textarea-bordered h-24" placeholder="Description"></textarea>
                    </label>
                    <input type="file" className="file-input file-input-bordered w-full max-w-xs mt-3 mb-10" {...register("image")} />
                    <AwesomeButton type="secondary">Button</AwesomeButton>
                </form>
            </div>

        </div>
    );
};

export default AddItems;