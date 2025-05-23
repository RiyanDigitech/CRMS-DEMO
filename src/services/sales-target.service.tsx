import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/config/axios-instance";
import { buildUrlWithParams } from "@/lib/helpers";
import { fetchAllSalesTargetApiResponse } from "@/lib/types/sales-target";
import { salesTargetFormData } from "@/components/modules/sales-target/create-sales-target-modal";
import { notification } from "antd";

const SalesTargetService = () => {
  const queryClient = useQueryClient();
  const useFetchSalesTarget = (
    limit?: number,
    page?: number,
    query?: string,
    userId?: string
  ) => {
    async function fetchProductts(): Promise<fetchAllSalesTargetApiResponse> {
      const url = buildUrlWithParams("/sales-target", {
        page,
        limit,
        query,
        userId,
      });
      return axiosInstance.get(url).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchProductts,
      queryKey: ["sales-target", limit, page,query],
      retry: 1,
      refetchOnWindowFocus: false,
    });
  };
  const useHandleCreateSalesTarget = () => {
    function handleForgotRequest(data: salesTargetFormData): Promise<any> {
      return axiosInstance.post(`/sales-target`, data);
    }
    const onSuccess = () => {
      notification.success({
        message: "Success",
        description: "Sales Target Created Successfully",
        placement: "topRight",
      });
      queryClient.invalidateQueries({ queryKey: ["sales-target"] });
      queryClient.invalidateQueries({ queryKey: ["sales-target-stats"] });
    };

    return useMutation({
      mutationFn: handleForgotRequest,
      onSuccess,
      retry: 0,
    });
  };
  return {
    useFetchSalesTarget,
    useHandleCreateSalesTarget
  };
};

export default SalesTargetService;
