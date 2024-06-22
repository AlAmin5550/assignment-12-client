
import useAxiosPublic from "./useAxiosPublic";
import { useEffect, useState } from "react";


const useMeals = (asc,search,category) => {
    const [meals,setMeals] = useState([]);
    const axiosPublic = useAxiosPublic();
    useEffect(()=>{
        axiosPublic.get(`/meal?sort=${asc ? 'asc' : 'desc'}&search=${search}&category=${category}`)
    .then(res=>{
        setMeals(res.data)
    })
    },[asc,search,category])
    
    return meals;
};

export default useMeals;