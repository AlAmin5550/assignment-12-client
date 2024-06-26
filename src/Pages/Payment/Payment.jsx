import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import DashboardTitle from "../../Components/Shared/DashboardTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
    return (
        <div className="pt-16 max-w-5xl mx-auto">
            <Helmet>
                <title>uniLodge | Reviews</title>
            </Helmet>
            <DashboardTitle header="Payment"></DashboardTitle>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />

                </Elements>
            </div>
            
        </div>
    );
};

export default Payment;