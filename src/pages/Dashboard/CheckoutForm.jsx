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
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const [cart, refetch] = useCart();
  const navigate = useNavigate();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  console.log("Total price:", totalPrice);

  useEffect(() => {
    if(totalPrice > 0){
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

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous',
        },
      },
    });

    if(confirmError){
        console.log("confirm error", confirmError);
    }
    else{
        console.log("payment intent", paymentIntent);
        if(paymentIntent.status === 'succeeded'){
            console.log('transaction id', paymentIntent.id)
            setTransactionId(paymentIntent.id)

            const payment = {
              email: user.email,
              price: totalPrice,
              transactionId: paymentIntent.id,
              date: new Date(),
              cartIds: cart.map(item => item._id),
              mealItemIds: cart.map(item => item.mealId),
              status: 'success',
            }

            const res = await axiosSecure.post('/payments', payment)
            refetch();
            if(res.data?.paymentResult?.insertedId){
              Swal.fire({
                icon: "success",
                title: "Payment successful",
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/dashboard/paymentHistory')
            }
        }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement></CardElement>
        <button
          type="submit"
          disabled={!stripe || !clientSecret}
          className="btn btn-primary mt-6"
        >
          Pay
        </button>
        <p className="text-red-600">{error}</p>
        {transactionId && <p className="text-green-600">Your transaction id: {transactionId}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
