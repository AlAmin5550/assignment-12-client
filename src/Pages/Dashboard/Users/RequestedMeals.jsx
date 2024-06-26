import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import DashboardTitle from "../../../Components/Shared/DashboardTitle";


const RequestedMeals = () => {
    const{user,loading}=useAuth();
    const axiosSecure = useAxiosSecure();
    const {data:requests=[]}=useQuery({
        queryKey:['users-requested-meals'],
        enabled:!loading,
        queryFn:async()=>{
            const res = await axiosSecure.get(`/request?email=${user?.email}`)
            return res.data;
        }
    })
    return (
        <div>
            <Helmet>
                <title>uniLodge | Requested</title>
            </Helmet>
            <DashboardTitle header="Requested Meals"></DashboardTitle>
            <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>User</th>
                                <th>Meal</th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                requests?.map((request, idx) => <tr key={request._id}>
                                    <th>
                                        {idx + 1}
                                    </th>
                                    <td>
                                        {request.email}
                                    </td>
                                    <td>{request.name}</td>
                                    <td>
                                    {request.price}
                                    </td>
                                    <th>
                                        {request.status}
                                    </th>
                                </tr>)
                            }

                        </tbody>


                    </table>
                </div>
            
        </div>
    );
};

export default RequestedMeals;