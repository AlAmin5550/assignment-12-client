import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

// const axiosSecure = axios.create({
//     baseURL:"http://localhost:5000",
//     withCredentials:true
// })
const axiosSecure = axios.create({
    baseURL: "https://uni-lodge-server.vercel.app",
    withCredentials: true
})
const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        // console.log('request stopped by Interceptors', token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    })
    // intercepts 401 and 403
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login')

        }
        return Promise.reject(error);
    })

    return axiosSecure;
};

export default useAxiosSecure;