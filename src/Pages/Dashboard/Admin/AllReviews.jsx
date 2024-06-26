import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import DashboardTitle from "../../../Components/Shared/DashboardTitle";
import { IoTrash } from "react-icons/io5";
import Swal from "sweetalert2";


const AllReviews = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: reviews = [] } = useQuery({
        queryKey: ['admin-review'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reviews')
            return res.data;
        }
    })
    const handleDelete = id => {
        axiosSecure.delete(`/review/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                        icon: "success",
                        title: "Successful!",
                        text: "Deleted successfully!",
                    });
                }
            })
    }
    return (
        <div>
            <Helmet>
                <title>uniLodge | Serve</title>
            </Helmet>
            <DashboardTitle header="Reviews"></DashboardTitle>
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
                                <th>Review</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                reviews?.map((review, idx) => <tr key={idx}>
                                    <th>
                                        {idx + 1}
                                    </th>
                                    <td>
                                        {review.email}
                                    </td>
                                    <td>{review.name}</td>
                                    <td>{review.review}</td>
                                    <th>
                                        <button onClick={() => handleDelete(review._id)} className="btn bg-red-500 text-white"><IoTrash /></button>
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

export default AllReviews;