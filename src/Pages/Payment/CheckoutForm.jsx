import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {  useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";


const CheckoutForm = () => {
    const [role,setRole] = useState('')
    const [paymentError, setPaymentError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe =useStripe();
    const elements = useElements(); 
    const params = useParams();
    const axiosSecure = useAxiosSecure();
    const{user} = useAuth();
    const pack = params.pack;
    useEffect(()=>{
        if(pack==1000){
            setRole('silver')
        }
        else if(pack == 1500){
            setRole('gold')
        }
        else if(pack == 2000){
            setRole('platinum')
        }
    },[pack])
    useEffect(() => {
        if (pack > 0) {
            axiosSecure.post('/create-payment-intent', { price: pack })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, pack])
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!stripe || !elements){
            return;
        }
        const card = elements.getElement(CardElement);
        if( card === null ){
            return
        }
        const {error,} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if(error){
            // console.log('Payment error', error)
            setPaymentError(error.message)
        }
        else{
            // console.log('Payment method', paymentMethod)
            setPaymentError('')
        }
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if(confirmError){
            // console.log('Confirm Payment Error')
        }
        else{
            // console.log('Payment intent', paymentIntent)
            if(paymentIntent.status === 'succeeded'){
                // console.log('transaction id:', paymentIntent.id)
                setTransactionId(paymentIntent.id)
                // now save the payment in the database
                const payment = {
                    email: user.email,
                    package: pack,
                    role: role,
                    transactionId: paymentIntent.id,
                    Date: new Date(),
                }
                const res= await axiosSecure.post('/payment',payment)
                // console.log(res)
                if(res.data?.insertedId){
                    Swal.fire({
                        icon: "success",
                        title: "Successful",
                        text: `Payment Successful!`,
                    });
                }
            }
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-primary my-4" type="submit"  disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className="text-red-600 ">{paymentError}</p>
                {
                    transactionId && <p className="text-green-600">Your Transaction Id: {transactionId}</p>
                }

            </form>

        </div>
    );
};

export default CheckoutForm;