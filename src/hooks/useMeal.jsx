import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useMeal = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: meal = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["meal"],
    queryFn: async () => {
      const res = await axiosPublic.get("/meal");
      return res.data;
    },
  });

  return [meal, loading, refetch];
};

export default useMeal;
