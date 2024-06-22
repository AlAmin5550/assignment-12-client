import { useForm } from "react-hook-form";
import loginImg from "../../assets/img/4957136.jpg"
import toast, { Toaster } from "react-hot-toast";
import GoogleSignIn from "./GoogleSignIn";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const {signIn} =useAuth();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/"
    const {
        register,
        handleSubmit,
        reset,
    } = useForm();
    const onSubmit = (data) =>{
        console.log(data.email,data.password)
        signIn(data.email,data.password)
        .then(result=>{
            console.log(result);
            toast.success('Sign in Successful!');
            reset();
            navigate(from, { replace: true })
        })
        .catch(err=>{
            console.log(err)
        })


    }

    return (
        <div className="flex flex-col lg:flex-row container mx-auto my-auto mt-3  pt-16">
             <Helmet>
                <title>uniLodge | Login</title>
            </Helmet>
            <div >
                <img src={loginImg} alt="" />
            </div>
            <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 bg-gray-50 text-gray-800 border border-[#063970]">
                <h2 className="mb-3 text-3xl font-semibold text-center">Sign in</h2>
                <p className="text-sm text-center text-gray-600">Don&apos;t have an account?
                    <a href="/signUp" rel="noopener noreferrer" className="focus:underline hover:underline">Sign Up Here</a>
                </p>


                <form  onSubmit={handleSubmit(onSubmit)} className="space-y-8" >
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm">Email address</label>
                            <input type="email" name="email" id="email" placeholder="leroy@gmail.com" required {...register("email")} className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-default-600" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label htmlFor="password" className="text-sm">Password</label>
                            </div>
                            <input type="password" name="password" id="password" required {...register("password")} placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-default-600" />
                        </div>
                    </div>
                    <button type="btn" className="w-full px-8 py-3 font-semibold rounded-md bg-default-600 text-[#063970]">Sign In</button>
                </form>
                <div className="flex items-center w-full my-4">
                    <hr className="w-full text-gray-600" />
                    <p className="px-3 text-gray-600">OR</p>
                    <hr className="w-full text-gray-600" />
                </div>
                <div className="my-6 space-y-4">
                    <GoogleSignIn></GoogleSignIn>

                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Login;