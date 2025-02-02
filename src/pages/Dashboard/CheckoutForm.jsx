import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [cart, refetch] = useCart();
  const navigate = useNavigate();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setIsLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      }
    );

    setIsLoading(false);

    if (confirmError) {
      setError("Payment confirmation failed. Please try again.");
    } else if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      const payment = {
        email: user.email,
        price: totalPrice,
        transactionId: paymentIntent.id,
        date: new Date(),
        cartIds: cart.map((item) => item._id),
        mealItemIds: cart.map((item) => item.mealId),
        status: "success",
      };

      const res = await axiosSecure.post("/payments", payment);
      refetch();
      if (res.data?.paymentResult?.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: `Transaction ID: ${paymentIntent.id}`,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/dashboard/paymentHistory");
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white dark:bg-gray-900 rounded-xl shadow-2xl text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold text-center mb-6">Complete Your Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-lg font-medium">Total Price: <span className="font-bold">${totalPrice.toFixed(2)}</span></label>
          <div className="p-4 mt-3 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-inner focus:ring-2 focus:ring-purple-500">
            <CardElement className="focus:outline-none" />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {transactionId && <p className="text-green-500 text-sm text-center">Transaction ID: {transactionId}</p>}

        <button
          type="submit"
          disabled={isLoading || !stripe || !clientSecret}
          className={`w-full py-3 px-6 mt-4 rounded-lg font-semibold transition-all duration-200 shadow-lg 
          ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 active:bg-purple-800"} text-white`}
        >
          {isLoading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
