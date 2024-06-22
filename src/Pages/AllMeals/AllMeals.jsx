import { useState } from "react";
import { useForm } from "react-hook-form";
import useMeals from "../../Hooks/useMeals";
import MealsCard from "../../Components/Shared/MealsCard";


const AllMeals = () => {
    const [asc, setAsc] = useState(true);
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        console.log(data.search, data.category)
        setCategory(data.category)
        setSearch(data.search)
    }
    const meals = useMeals(asc,search,category);
    
    return (
        <div className="pt-20">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold">All Meals</h1>
                <p className="text-gray-400">Search the meal for your preference!</p>
                <div className="flex flex-col lg:flex-row gap-8">
                    <button
                        className="btn btn-outline btn-accent"
                        onClick={() => setAsc(!asc)}
                    >
                        {asc ? 'Price: High to Low' : 'Price: Low To High'}
                    </button>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row gap-8">
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text" className="grow" placeholder="Search"  {...register("search")} />
                        </label>
                        <select className="select select-bordered w-full max-w-xs" defaultValue=""  {...register("category")}>
                            <option value="">category?</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                        </select>
                        <button className="btn btn-outline btn-accent">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                        </button>
                    </form>
                </div>
            </div>
            <div className="grid mt-5 max-w-7xl mx-auto md:grid-cols-3">
                {
                    meals?.map(meal=> <MealsCard key={meal._id} meal={meal}></MealsCard>)
                }
            </div>

        </div>
    );
};

export default AllMeals;