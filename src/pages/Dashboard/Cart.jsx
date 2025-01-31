import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";

const Cart = () => {
  const [cart, refetch] = useCart();
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

  return (
    <div className="bg-white dark:bg-gray-900 p-8 transition-all duration-300 min-h-screen">
      <SectionTitle
        heading="MY CART"
        subHeading="--- What's cooking? ---"
      ></SectionTitle>

      {/* Cart Header */}
      <div className="flex justify-between mb-8">
        <h2 className="text-3xl text-gray-900 dark:text-white">
          Items: {cart.length}
        </h2>
        <h2 className="text-3xl text-gray-900 dark:text-white">
          Total Price: ${totalPrice.toFixed(2)}
        </h2>
        {cart.length > 0 ? (
          <Link to="/dashboard/payment">
            <button className="btn text-white bg-orange-600 hover:bg-orange-700 transition-all duration-200">
              Pay
            </button>
          </Link>
        ) : (
          <button disabled className="btn bg-gray-400 cursor-not-allowed">
            Pay
          </button>
        )}
      </div>

      {/* Cart Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
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
                  className="text-center border-t hover:bg-gray-100 transition-all duration-200"
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
                      className="btn btn-ghost text-red-600 hover:bg-red-100 transition-all duration-200"
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
