import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";

const Cart = () => {
  const [cart, refetch] = useCart();
  const [loading, setLoading] = useState(true);
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const axiosSecure = useAxiosSecure();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/carts/${id}`)
          .then((res) => {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong.",
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  useEffect(() => {
    if (cart) {
      setLoading(false);
    }
  }, [cart]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-xl shadow-2xl transition-all duration-300 motion-safe:transform motion-safe:translate-x-0 motion-safe:opacity-100 min-h-screen">
      <SectionTitle heading="MY CART" subHeading="--- What's cooking? ---" />

      {/* Cart Header */}
      <div className="flex justify-between mb-8 transition-all duration-300">
        <h2 className="text-3xl text-gray-900 dark:text-white">
          Items: {cart.length}
        </h2>
        <h2 className="text-3xl text-gray-900 dark:text-white">
          Total Price: ${totalPrice.toFixed(2)}
        </h2>
        {cart.length > 0 ? (
          <Link to="/dashboard/payment">
            <button className="btn text-white bg-orange-600 hover:bg-orange-700 transition-all duration-200">
              Pay Now
            </button>
          </Link>
        ) : (
          <button disabled className="btn bg-gray-400 cursor-not-allowed">
            Pay Now
          </button>
        )}
      </div>

      {/* Cart Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transition-all duration-300">
        {cart.length > 0 ? (
          <table className="min-w-full table-auto text-gray-900 dark:text-white">
            <thead className="bg-orange-600 text-white">
              <tr>
                <th className="py-3 px-6">#</th>
                <th className="py-3 px-6">Image</th>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr
                  key={item._id}
                  className="text-center border-t hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 motion-safe:transform motion-safe:scale-100 motion-safe:opacity-100"
                >
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">{item.name}</td>
                  <td className="py-4 px-6">${item.price}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-ghost text-red-600 hover:bg-red-100 dark:hover:bg-red-700 transition-all duration-200"
                    >
                      <FaTrashAlt className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-xl text-gray-900 dark:text-white py-4">
            Your cart is empty. Add some items to proceed.
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
