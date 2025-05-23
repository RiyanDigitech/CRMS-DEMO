import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/config/axios-instance";
import { buildUrlWithParams } from "@/lib/helpers";
import { fetchAllSalesActivityApiResponse } from "@/lib/types/sales-activity";

const SalesActivityService = () => {
  const useFetchSalesActivity = (limit?: number, page?: number) => {
    async function fetchRecords(): Promise<fetchAllSalesActivityApiResponse> {
      const url = buildUrlWithParams("/sales-record", {
        page,
        limit,
      });
      return axiosInstance.get(url).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchRecords,
      queryKey: ["sales-activity", limit, page],
      retry: 1,
      refetchOnWindowFocus: false,
    });
  };

  return {
    useFetchSalesActivity,
  };
};

export default SalesActivityService;
