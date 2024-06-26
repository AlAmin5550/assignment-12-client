import { FaBook } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const UpcomingTable = ({meal,idx,refetch}) => {
    const axiosSecure = useAxiosSecure();
    const {data:likes=[]}=useQuery({
        queryKey:['upcoming-likes'],
        queryFn: async ()=>{
            const res = await axiosSecure.get('/upcomingLikes')
            return res.data
        }
    })
    const {_id,...rest} = meal;
    const totalLikes  = likes.filter(data => data.mealId == _id);
    const handleAdd = () =>{
        axiosSecure.post('/meal',rest)
        .then(res=>{
            if(res.data.insertedId){
                refetch();
                Swal.fire({
                    icon: "success",
                    title: "Successful",
                    text: `${meal.name} added Successfully!`,
                });
            }
        })
    }
    
    return (
        <tr >
            <th>
                {idx + 1}
            </th>
            <td>
                {meal.name}
            </td>
            <td>
               {totalLikes.length}
            </td>
            <th>
                <button onClick={() => handleAdd()} className="btn"><FaBook /></button>
            </th>
        </tr>
    );
};

export default UpcomingTable;