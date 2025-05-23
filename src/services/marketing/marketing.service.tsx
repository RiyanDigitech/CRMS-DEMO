import axios from "@/lib/config/axios-instance";
import { fetchAllMarketingApiResponse, createMarketingResponseType, deleteMarketingType } from "@/lib/types/marketing";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { errorType } from "@/lib/types";
import { buildUrlWithParams } from "@/lib/helpers";
import { MARKETING_STATUS } from "@/components/modules/marketing/marketing-filter";

const MarketingService = () => {
  const queryClient = useQueryClient();
  const useFetchAllMarketing = (
    limit?: number,
    page?: number,
    query?: string | null,
    startDate?: string,
    endDate?: string,
    status?: MARKETING_STATUS
  ) => {
    async function fetchMarketing(): Promise<fetchAllMarketingApiResponse> {
      const url = buildUrlWithParams("/marketing", {
        page,
        limit,
        query,
        startDate,
        endDate,
        status
      });
      return axios.get(url).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchMarketing,
      queryKey: ["marketing", page, limit, query, startDate, endDate,status],
      retry: 1,
      refetchOnWindowFocus: false,

    });
  };



  const useHandleCreateMarketingService = (reset: () => void) => {
    function handleCreateMarketingRequest(
      data: FormData
    ): Promise<createMarketingResponseType> {
      return axios.post(`/marketing`, data);
    }

    const onSuccess = () => {

      notification.success({
        message: "Marketing Collateral Created Successful",
        description: "You have successfully created the marketing collateral!",
        placement: "topRight",
      });
      queryClient.invalidateQueries({ queryKey: ["marketing"] });
      reset();
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description: error?.response?.data.message || "Failed to create marketing collateral",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleCreateMarketingRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  const useHandleDeleteMarketingService = (id?: number) => {


    function handleDeleteMarketingRequest(): Promise<deleteMarketingType> {
      if (!id) {
        return Promise.reject(new Error("ID is required to delete marketing collateral"));
      }
      return axios.delete(`/marketing/${id}`);
    }

    const onSuccess = () => {
      notification.success({
        message: "Marketing Collateral Deleted",
        description: "Marketing Collateral Deleted",
        placement: "topRight",
      });


      queryClient.invalidateQueries({ queryKey: ["marketing"] });
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description: error?.response?.data.message || "Failed To Delete Marketing Collateral",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleDeleteMarketingRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };


  const useHandleUpdateMarketingService = (id: number, reset: () => void) => {
    function handleCreateMarketingRequest(
      data: FormData
    ): Promise<createMarketingResponseType> {
      return axios.put(`/marketing/${id}`, data);
    }

    const onSuccess = () => {

      notification.success({
        message: "Marketing Collateral Updated Successful",
        description: "You have successfully updated the marketing collateral!",
        placement: "topRight",
      });
      queryClient.invalidateQueries({ queryKey: ["marketing"] });
      reset();
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description: error?.response?.data.message || "Failed to create marketing collateral",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleCreateMarketingRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };



  return {
    useFetchAllMarketing,
    useHandleDeleteMarketingService,
    useHandleCreateMarketingService,
    useHandleUpdateMarketingService
  };
};
export default MarketingService;