import { Helmet } from "react-helmet-async";
import DashboardTitle from "../../../Components/Shared/DashboardTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { MdAdminPanelSettings } from "react-icons/md";
import Swal from "sweetalert2";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const {refetch,data: users} = useQuery({
        queryKey:['users'],
        queryFn:async () =>{
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })
    const handleAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res=>{
            refetch();
            if(res.data.modifiedCount > 0){
                Swal.fire({
                    title: "Successful!",
                    text: `${user.name} is now an admin`,
                    icon: "success"
                });
            }
        })
    }
    return (
        <div>
            <Helmet>
                <title>uniLodge | ManageUsers</title>
            </Helmet>
            <DashboardTitle header="Manage Users"></DashboardTitle>
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
                                <th>Email</th>
                                <th>Role</th>
                                <th>Subscription</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((user, idx) => <tr key={user._id}>
                                    <th>
                                        {idx + 1}
                                    </th>
                                    <td>
                                        {user.name}
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        {
                                            user.role === 'admin' ? 'admin' :<button onClick={()=>handleAdmin(user)}><MdAdminPanelSettings/></button>
                                        }
                                        
                                    </td>
                                    <th>
                                        {user.badge}
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

export default AllUsers;