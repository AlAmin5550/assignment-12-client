import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import DashboardTitle from "../../../Components/Shared/DashboardTitle";


const ServeMeals = () => {
    const axiosSecure = useAxiosSecure();
    const{refetch,data: requests=[]}= useQuery({
        queryKey:['requested'],
        queryFn: async ()=>{
            const res = await axiosSecure.get('/request/admin')
            return res.data
        }
    })
    const handleServe = id => {
        axiosSecure.patch(`/request/${id}`)
        .then(()=>{
            refetch();
        })
    }
    return (
        <div>
            <Helmet>
                <title>uniLodge | Serve</title>
            </Helmet>
            <DashboardTitle header="Serve Meals"></DashboardTitle>
            <div>
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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                requests?.map((request, idx) => <tr key={idx}>
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
                                    <th>
                                        <button onClick={()=> handleServe(request._id)} className="btn bg-orange-400">Serve</button>
                                    </th>
                                </tr>)
                            }

                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default ServeMeals;