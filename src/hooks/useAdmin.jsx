import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useEffect, useState } from "react";

const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [localAdmin, setLocalAdmin] = useState(() => {
        return JSON.parse(localStorage.getItem("isAdmin")) || false;
    });

    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, "isAdmin"],
        enabled: !!user?.email && !loading,  // Ensure user exists
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/users/admin/${user.email}`);
                return res.data?.admin ?? false;
            } catch (error) {
                console.error("Error fetching admin status:", error);
                return false;  // Prevent crashes
            }
        },
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });

    // Store admin status in localStorage to avoid frequent API calls
    useEffect(() => {
        if (isAdmin !== undefined) {
            localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
            setLocalAdmin(isAdmin);
        }
    }, [isAdmin]);

    return [localAdmin, isAdminLoading];
};

export default useAdmin;
