import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, "isAdmin"],
        enabled: !!user?.email && !loading,  // Ensure user exists
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/users/admin/${user.email}`);
                return res.data?.admin ?? false;  // Return false if no data
            } catch (error) {
                console.error("Error fetching admin status:", error);
                return false;  // Prevent crashes
            }
        },
    });

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
