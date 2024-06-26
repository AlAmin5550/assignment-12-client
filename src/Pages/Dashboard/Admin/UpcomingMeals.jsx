import { Helmet } from "react-helmet-async";
import DashboardTitle from "../../../Components/Shared/DashboardTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UpcomingTable from "../../../Components/UpcomingTable";
const UpcomingMeals = () => {
    const axiosSecure = useAxiosSecure();

    const {refetch,data:meals=[]}=useQuery({
        queryKey:['upcoming'],
        queryFn: async ()=>{
            const res = await axiosSecure.get('/upcoming')
            return res.data
        }
    })
    
    return (
        <div>
            <Helmet>
                <title>uniLodge | Upcoming Meals</title>
            </Helmet>
            <DashboardTitle header="Upcoming Meals"></DashboardTitle>

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
                                <th>Likes</th>
                                <th>Add To Main Meal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                meals?.map((meal, idx) => <UpcomingTable key={idx} meal={meal} idx={idx} refetch={refetch}></UpcomingTable>)
                            }

                        </tbody>


                    </table>
                </div>
            </div>

        </div>
        
            
        
    );
};

export default UpcomingMeals;