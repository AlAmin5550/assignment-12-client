import axios from "axios";

// const axiosPublic = axios.create({
//     baseURL:'http://localhost:5000/',
//     withCredentials: true,
// })
const axiosPublic = axios.create({
    baseURL:'https://uni-lodge-server.vercel.app',
    withCredentials: true,
})

const useAxiosPublic = () => {
    return axiosPublic;
   
};

export default useAxiosPublic;