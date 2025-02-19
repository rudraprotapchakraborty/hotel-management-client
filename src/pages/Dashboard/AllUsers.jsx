import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import SectionTitle from "../../components/SectionTitle";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure
      .patch(`/users/admin/${user._id}`)
      .then(() => {
        refetch();
        Swal.fire({
          title: "Success!",
          text: `${user.name} is now an admin.`,
          icon: "success",
        });
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleDeleteUser = (user) => {
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
          .delete(`/users/${user._id}`)
          .then(() => {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been removed.",
              icon: "success",
            });
          })
          .catch(() => {
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
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-300">
      <SectionTitle heading="ALL USERS" subHeading="--- Manage your users ---" />

      <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-6 transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 border border-gray-300 shadow-lg rounded-lg">
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
              <tr>
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-center">Role</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="border-t hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    <td className="py-4 px-6">{index + 1}</td>
                    <td className="py-4 px-6">{user.name}</td>
                    <td className="py-4 px-6">{user.email}</td>
                    <td className="py-4 px-6 text-center">
                      {user.role === "admin" ? (
                        <span className="text-green-500 font-semibold">Admin</span>
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="btn bg-orange-500 text-white hover:bg-orange-600 rounded-lg py-2 px-4 transition-all duration-300"
                        >
                          <FaUsers className="text-white text-xl" />
                        </button>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="btn bg-red-500 text-white hover:bg-red-600 rounded-lg py-2 px-4 transition-all duration-300"
                      >
                        <FaTrashAlt className="text-white text-xl" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 px-6 text-center text-gray-600 dark:text-white">
                    No users available
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

export default AllUsers;
