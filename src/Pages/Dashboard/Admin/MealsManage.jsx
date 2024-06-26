import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import DashboardTitle from "../../../Components/Shared/DashboardTitle";
import MealManagement from "../../../Components/MealManagement";


const MealsManage = () => {
    const axiosSecure = useAxiosSecure();
    const {refetch,data:meals=[]}=useQuery({
        queryKey:['all-meals-data'],
        queryFn:async ()=>{
            const res = await axiosSecure.get('/mealCard')
            return res.data;
        } 
    })
    return (
        <div>
            <Helmet>
                <title>uniLodge | All Meals</title>
            </Helmet>
            <DashboardTitle header="All Meals"></DashboardTitle>
            <div>
            <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Name</th>
                                <th>Distributor</th>
                                <th>Likes</th>
                                <th>Reviews</th>
                                <th>update</th>
                                <th>Delete</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                meals?.map((meal, idx) => <MealManagement key={idx} refetch={refetch} meal={meal} idx={idx}></MealManagement>)
                            }

                        </tbody>


                    </table>
                </div>
            </div>
            
        </div>
    );
};

export default MealsManage;