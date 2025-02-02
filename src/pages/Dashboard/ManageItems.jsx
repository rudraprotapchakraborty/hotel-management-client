import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../components/SectionTitle";
import useMeal from "../../hooks/useMeal";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
  const [meal, , refetch] = useMeal();
  const axiosSecure = useAxiosSecure();

  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/meal/${item._id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: `${item.name} deleted!`,
            text: "Your item has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-300">
      <SectionTitle heading="MANAGE ITEMS" subHeading="--- What's cooking? ---" />

      <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-8 transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 border border-gray-300 shadow-lg rounded-lg">
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
              <tr>
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6">Image</th>
                <th className="py-3 px-6 text-left">Item Name</th>
                <th className="py-3 px-6 text-right">Price</th>
                <th className="py-3 px-6">Update</th>
                <th className="py-3 px-6">Delete</th>
              </tr>
            </thead>
            <tbody>
              {meal.length > 0 ? (
                meal.map((item, index) => (
                  <tr
                    key={item._id}
                    className="border-t hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    <td className="py-4 px-6">{index + 1}</td>
                    <td className="py-4 px-6">
                      <img
                        src={item.image}
                        className="w-16 h-16 object-cover mx-auto rounded-md shadow-sm"
                        alt={item.name}
                      />
                    </td>
                    <td className="py-4 px-6 text-left">{item.name}</td>
                    <td className="py-4 px-6 text-right">${item.price}</td>
                    <td className="py-4 px-6">
                      <Link to={`/dashboard/updateItem/${item._id}`}>
                        <button className="btn bg-purple-500 text-white hover:bg-purple-600 rounded-lg py-2 px-4 transition-all duration-300">
                          <FaEdit />
                        </button>
                      </Link>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleDeleteItem(item)}
                        className="btn bg-red-500 text-white hover:bg-red-600 rounded-lg py-2 px-4 transition-all duration-300"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 px-6 text-center text-gray-600 dark:text-white">
                    No items available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
