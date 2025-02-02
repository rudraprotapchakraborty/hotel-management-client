import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../components/SectionTitle";
import CheckoutForm from "./CheckoutForm";
import SSL from "./SSL";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState("stripe"); // Default to Stripe

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-xl shadow-2xl text-gray-900 dark:text-white">
            <SectionTitle heading="Payment" subHeading="Choose Payment Method" />

            <div className="flex justify-center gap-4 mb-6">
                <button
                    className={`px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-200 ${paymentMethod === "stripe" ? "bg-purple-600 text-white" : "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white"}`}
                    onClick={() => setPaymentMethod("stripe")}
                >
                    Pay with Stripe
                </button>
                <button
                    className={`px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-200 ${paymentMethod === "ssl" ? "bg-purple-600 text-white" : "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white"}`}
                    onClick={() => setPaymentMethod("ssl")}
                >
                    Pay with SSLCommerz
                </button>
            </div>

            <div className="mt-6">
                {paymentMethod === "stripe" ? (
                    <Elements stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                ) : (
                    <SSL />
                )}
            </div>
        </div>
    );
};

export default Payment;
