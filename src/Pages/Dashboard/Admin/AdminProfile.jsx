import { useQuery } from "@tanstack/react-query";
import DashboardTitle from "../../../Components/Shared/DashboardTitle";
import Profile from "../../../Components/Shared/Profile";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const AdminProfile = () => {
    const {user,loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: meals = [] } = useQuery({
        queryKey: ['meal-cards'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get('/mealCard');
            return res.data
        }
    })
    const addedMeal = meals.map(meal => meal.distributor == user.displayName)
    
    return (
        <div>
            <DashboardTitle header='Admin Profile'></DashboardTitle>
            <div>
                <Profile user={user} loading={loading}></Profile>
            </div>
            <h1 className="text-3xl font-medium">Added meals: {addedMeal.length}</h1>
            
        </div>
    );
};

export default AdminProfile;