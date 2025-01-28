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
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-300">
      <SectionTitle
        heading="MANAGE ITEMS"
        subHeading="--- What's cooking? ---"
      ></SectionTitle>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-8">
        <table className="table w-full text-sm text-gray-900 dark:text-white transition-all duration-300">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Item Name</th>
              <th className="py-3 px-4 text-right">Price</th>
              <th className="py-3 px-4">Update</th>
              <th className="py-3 px-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {meal.map((item, index) => (
              <tr
                key={item._id}
                className="hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200"
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={item.image} alt={item.name} />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">{item.name}</td>
                <td className="py-3 px-4 text-right">${item.price}</td>
                <td className="py-3 px-4">
                  <Link to={`/dashboard/updateItem/${item._id}`}>
                    <button className="btn bg-orange-500 text-white hover:bg-orange-600 rounded-lg py-2 px-4">
                      <FaEdit />
                    </button>
                  </Link>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDeleteItem(item)}
                    className="btn bg-red-500 text-white hover:bg-red-600 rounded-lg py-2 px-4"
                  >
                    <FaTrashAlt />
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

export default ManageItems;
