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
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

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
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous',
          },
        },
      }
    );

    setIsLoading(false);

    if (confirmError) {
      setError("Payment confirmation failed. Please try again.");
    } else {
      if (paymentIntent.status === "succeeded") {
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
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-6">
          <label htmlFor="card-element" className="text-lg text-gray-900 dark:text-white mb-2 block">Payment Details</label>
          <CardElement className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        {transactionId && (
          <p className="text-green-600 text-sm mb-2">Transaction ID: {transactionId}</p>
        )}

        <button
          type="submit"
          disabled={isLoading || !stripe || !clientSecret}
          className={`w-full py-3 px-4 mt-4 ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"
          } text-white font-semibold rounded-md transition-all duration-200`}
        >
          {isLoading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
