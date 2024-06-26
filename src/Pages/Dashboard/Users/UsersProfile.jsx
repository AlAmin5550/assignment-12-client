import { useQuery } from "@tanstack/react-query";
import DashboardTitle from "../../../Components/Shared/DashboardTitle";
import Profile from "../../../Components/Shared/Profile";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const UsersProfile = () => {
    const {user,loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data:userProfile={}}=useQuery({
        queryKey:['user-profile'],
        enabled: !loading,
        queryFn:async () =>{
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res.data;
        }
    })
    return (
        <div>
            <DashboardTitle header='Users Profile'></DashboardTitle>
            <div>
                <Profile user={user}></Profile>
            </div>
            <h1 className="text-3xl font-medium">Badge:{userProfile.badge}</h1>

        </div>
    );
};

export default UsersProfile;