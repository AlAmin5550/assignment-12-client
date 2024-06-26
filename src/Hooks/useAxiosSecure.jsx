import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// const axiosSecure = axios.create({
//     baseURL:"http://localhost:5000",
//     withCredentials:true
// })
const axiosSecure = axios.create({
    baseURL:"https://uni-lodge-server.vercel.app",
    withCredentials:true
})
const useAxiosSecure = () => {
    const {logOut} = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        axiosSecure.interceptors.response.use(res=>{
            return res;
        },error=>{
            // console.log('Error tracked in :', error.response)
            if(error.response.status == 401 || error.response.status == 403){
                // console.log('logout the user');
                logOut()
                .then(() => {
                    navigate('/login')
                }).catch(() => {
                    // console.log(err)
                });
            }
        })
    },[logOut,navigate])
    return axiosSecure;
};

export default useAxiosSecure;