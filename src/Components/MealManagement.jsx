import { Link } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import { IoTrash } from "react-icons/io5";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const MealManagement = ({ meal, idx, refetch }) => {
    const { _id, name, distributor } = meal;
    const [likes, setLikes] = useState([]);
    const [reviews, setReviews] = useState([]);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosPublic.get(`/likes/${_id}`)
            .then(res => {
                setLikes(res.data)
            })
    }, [_id, axiosPublic])
    useEffect(() => {
        axiosPublic.get(`/reviews/${_id}`)
            .then(res => {
                setReviews(res.data)
            })
    }, [_id, axiosPublic])
    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-meal/${_id}`)
                    .then(res => {
                        // console.log(res)
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    
    return (
        <tr >
            <th>
                {idx + 1}
            </th>
            <td>
                {name}
            </td>
            <td>
                {distributor}
            </td>
            <td>
                {likes.length}
            </td>
            <td>
                {reviews.length}
            </td>
            <th>
                <Link to={`updateMeals/${_id}`}><button className="btn btn-primary text-white btn-sm">Update</button></Link>
            </th>
            <th>
                <button onClick={handleDelete} className="btn btn-error text-white btn-sm"><IoTrash /></button>
            </th>
            <th>
                <Link to={`/mealDetails/${_id}`}><button className="btn text-white bg-[#77bad5] btn-sm">Details</button></Link>
            </th>
        </tr>
    );
};

export default MealManagement;