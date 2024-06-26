import { Helmet } from "react-helmet-async";
import loginImg from "../../assets/img/4957136.jpg"
import toast, { Toaster } from "react-hot-toast";
import GoogleSignIn from "./GoogleSignIn";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";


const SignUp = () => {
    const { createUser } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        const user = {
            name: data.name,
            email: data.email,
            badge: 'bronze'
        }
        createUser(data.email, data.password)
            .then((result) => {
                updateProfile(result.user, {
                    displayName: data.name, photoURL: data.photo
                });
                axiosPublic.post('/users', user)
                    .then(res => {
                        if (res.data.insertedId) {
                            toast.success('Sign Up Successful!')
                            reset();
                            navigate('/')
                        }
                    })
            }).catch(() => {

            });
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
                <h2 className="mb-3 text-3xl font-semibold text-center">Sign up</h2>
                <p className="text-sm text-center text-gray-600">Already have an account?
                    <a href="/login" rel="noopener noreferrer" className="focus:underline hover:underline">Sign In Here</a>
                </p>


                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" >
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm">Name</label>
                            <input type="text" name="name" placeholder="name"  required {...register("name")} className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-default-600" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm">Photo URl</label>
                            <input type="text" name="photo"  placeholder="https://" required {...register("photo")} className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-default-600" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm">Email address</label>
                            <input type="email" name="email" id="email" placeholder="leroy@gmail.com" required {...register("email")} className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-default-600" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label htmlFor="password" className="text-sm">Password</label>
                            </div>
                            <input type="password" placeholder="password"  {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/ })} className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-default-600" required />
                            {errors.password?.type === 'required' && <span>This field is required</span>}
                            {errors.password?.type === 'minLength' && <span>Min length must be 6 characters</span>}
                            {errors.password?.type === 'maxLength' && <span>Max length must be 20 characters</span>}
                            {errors.password?.type === 'pattern' && <span>Must contain 1 uppercase, 1 lowercase and a number</span>}
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

export default SignUp;