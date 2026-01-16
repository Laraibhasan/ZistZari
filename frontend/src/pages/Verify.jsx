import React, { useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
    const { navigate, token, setCartItems, backend_url } = useContext(ShopContext);
    const [searchParams] = useSearchParams();

    // Get parameters from the URL
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId"); // Stripe uses this
    const paypalOrderId = searchParams.get("token"); // PayPal uses 'token' as the Order ID

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null;
            }

            // --- PAYPAL VERIFICATION LOGIC ---
            if (paypalOrderId) {
                const response = await axios.post(backend_url + "/api/order/verifyPaypal", 
                    { success, orderId, paypalOrderId }, 
                    { headers: { token } }
                );

                if (response.data.success) {
                    setCartItems({});
                    navigate("/orders");
                    toast.success("Payment Successful!");
                } else {
                    navigate('/cart');
                    toast.error("PayPal Payment Failed");
                }
            } 
            
            // --- STRIPE VERIFICATION LOGIC ---
            else if (orderId) {
                const response = await axios.post(backend_url + "/api/order/verifyStripe", 
                    { success, orderId }, 
                    { headers: { token } }
                );

                if (response.data.success) {
                    setCartItems({});
                    navigate("/orders");
                    toast.success("Payment Successful!");
                } else {
                    navigate('/cart');
                    toast.error("Stripe Payment Failed");
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Something went wrong");
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [token]);

    return (
        <div className='min-h-[60vh] flex items-center justify-center'>
            {/* Simple Loading Spinner */}
            <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
    )
}

export default Verify;