import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../components/SectionTitle";

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
    <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-xl shadow-2xl transition-all duration-300 motion-safe:transform motion-safe:translate-x-0 motion-safe:opacity-100 min-h-screen">
      <SectionTitle
        heading="Payment History"
        subHeading="--- What's cooking? ---"
      />

      {/* Payment History Table */}
      {payments.length > 0 ? (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300">
          <table className="table table-zebra w-full text-gray-900 dark:text-white">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="py-3 px-6">#</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Transaction ID</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="text-center border-t hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 motion-safe:transform motion-safe:scale-100 motion-safe:opacity-100"
                >
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6">${payment.price}</td>
                  <td className="py-4 px-6">{payment.transactionId}</td>
                  <td className="py-4 px-6">
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
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 text-center text-gray-900 dark:text-white">
          <p>No payment history found.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
