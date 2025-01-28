import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="bg-white dark:bg-gray-900 p-8 transition-all duration-300 min-h-screen">
      {/* Header */}
      <div className="flex justify-between mb-8">
        <h2 className="text-3xl text-gray-900 dark:text-white">Total Payments: {payments.length}</h2>
      </div>

      {/* Payment History Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
        <table className="table table-zebra w-full text-gray-900 dark:text-white">
          <thead>
            <tr>
              <th>#</th>
              <th>Price</th>
              <th>Transaction ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>${payment.price}</td>
                <td>{payment.transactionId}</td>
                <td>
                  <span
                    className={`${
                      payment.status === "Success"
                        ? "text-green-500"
                        : payment.status === "Pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
