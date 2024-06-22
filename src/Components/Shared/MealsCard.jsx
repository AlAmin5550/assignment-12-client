import { FaArrowRightLong } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Link } from "react-router-dom";


const MealsCard = ({ meal }) => {
    const { _id, name, image, rating, price } = meal
    return (
        <div>
            <div className="max-w-xs p-6 rounded-md shadow-md bg-gray-50 text-gray-900 mb-5">
                <img src={image} alt="" className="object-cover object-center w-full rounded-md h-72 bg-gray-500" />
                <div className="mt-6 mb-2">
                    <span className="flex text-xs font-medium tracking-widest uppercase text-default-600">{rating}<FaStar className="text-yellow-300"/>  Rating</span>
                    <h2 className="text-xl font-semibold tracking-wide">{name}</h2>
                </div>
                <p className="text-gray-800 flex items-center"><FaBangladeshiTakaSign/> {price}Tk</p>
                <Link to={`/mealDetails/${_id}`}><button className="btn btn-outline border-0 text-[#77bad5]">Details<FaArrowRightLong/></button></Link>
            </div>

        </div>
    );
};

export default MealsCard;
