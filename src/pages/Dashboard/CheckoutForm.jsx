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
  console.log("Total price:", totalPrice);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
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
      console.log("payment error", error);
      setError(error.message);
      setIsLoading(false);
      return;
    } else {
      console.log("payment method", paymentMethod);
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
      console.log("confirm error", confirmError);
      setError("Payment confirmation failed. Please try again.");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
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
            title: "Payment successful",
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
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <CardElement className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        {transactionId && (
          <p className="text-green-600 text-sm mb-2">Your transaction ID: {transactionId}</p>
        )}
        <button
          type="submit"
          disabled={isLoading || !stripe || !clientSecret}
          className={`w-full py-2 px-4 mt-6 ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"
          } text-white font-semibold rounded-md`}
        >
          {isLoading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
