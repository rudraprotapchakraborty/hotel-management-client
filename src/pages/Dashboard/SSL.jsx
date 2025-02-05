import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { useState } from "react";

const SSL = () => {
  const [cart, refetch] = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handleCreatePayment = async () => {
    setLoading(true);
    setError(null);
    try {
      const payment = {
        email: user.email,
        price: totalPrice,
        transactionId: "", // Will be assigned later
        date: new Date(),
        cartIds: cart.map((item) => item._id),
        menuItemIds: cart.map((item) => item.menuId),
        status: "pending",
      };

      const response = await axios.post("https://hotel-management-server-one.vercel.app/create-ssl-payment", payment);

      if (response.data?.gatewayUrl) {
        window.location.replace(response.data.gatewayUrl);
      } else {
        setError("Payment initiation failed.");
      }
    } catch (err) {
      console.error("Payment error", err);
      setError("An error occurred while processing payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white dark:bg-gray-900 rounded-xl shadow-2xl text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold text-center mb-6">Complete Your Payment</h2>
      <div className="space-y-6">
        <div>
          <label className="text-lg font-medium">Total Price: <span className="font-bold">${totalPrice.toFixed(2)}</span></label>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button 
          onClick={handleCreatePayment}
          className={`w-full py-3 px-6 mt-4 rounded-lg font-semibold transition-all duration-200 shadow-lg
            ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 active:bg-purple-800"} text-white`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default SSL;
