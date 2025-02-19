import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ["cart", user?.email],
        enabled: !!user?.email,  // Ensure user is logged in before fetching
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/carts?email=${user.email}`);
                return res.data;
            } catch (error) {
                console.error("Error fetching cart:", error);
                return []; // Return empty array to prevent crashes
            }
        },
    });

    return [cart, refetch];
};

export default useCart;
