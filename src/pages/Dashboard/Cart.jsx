import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";

const Cart = () => {
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((sum, cart) => sum + cart.price, 0);
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
            // console.log(err);
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
        <h2 className="text-4xl text-gray-900 dark:text-white">Items: {cart.length}</h2>
        <h2 className="text-4xl text-gray-900 dark:text-white">Total Price: ${totalPrice.toFixed(2)}</h2>
        {cart.length ? (
          <Link to="/dashboard/payment">
            <button className="btn text-white bg-orange-600 hover:bg-orange-700 transition-all duration-200">Pay</button>
          </Link>
        ) : (
          <button disabled className="btn btn-primary bg-gray-400 cursor-not-allowed">
            Pay
          </button>
        )}
      </div>

      {/* Cart Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
        <table className="table table-zebra w-full text-gray-900 dark:text-white">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((cart, index) => (
              <tr key={cart._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={cart.image} alt={cart.name} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{cart.name}</td>
                <td>${cart.price}</td>
                <td>
                  <button
                    onClick={() => handleDelete(cart._id)}
                    className="btn btn-ghost hover:bg-red-100 transition-all duration-200"
                  >
                    <FaTrashAlt className="text-red-600 text-2xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
