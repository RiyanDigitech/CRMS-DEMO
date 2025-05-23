import axios from "@/lib/config/axios-instance";
import {
  CreateUserResponseType,
  fetchAllUsersApiResponse,
} from "@/lib/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { buildUrlWithParams } from "@/lib/helpers";
import { notification } from "antd";
import { errorType } from "@/lib/types";
import { StockTakeCreate } from "@/lib/types/stock-take";
import { ApiTeamResponse } from "@/lib/types/team";

const StockTakeService = () => {
  const queryClient = useQueryClient();

  const useFetchStockTakes = (
    limit?: number,
    page?: number,
    query?: string,
    stockStatus?: string
  ) => {
    async function fetchUsers(): Promise<fetchAllUsersApiResponse> {
      const url = buildUrlWithParams("/stock-take", {
        page,
        limit,
        query,
        stockStatus,
      });
      return axios.get(url).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchUsers,
      queryKey: ["stock", page, limit, query, stockStatus],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  const useHandleCreateStockTakeService = (
    reset: () => void,
    onClose: () => void
  ) => {
    function handleCreateUserRequest(
      data: StockTakeCreate
    ): Promise<CreateUserResponseType> {
      return axios.post(`/stock-take`, data);
    }

    const onSuccess = (response: CreateUserResponseType) => {
      console.log("Stock created server response ", response);
      notification.success({
        message: "Stock Taken",
        description: "Stock Take Successfully",
        placement: "topRight",
      });
      queryClient.invalidateQueries({ queryKey: ["stock"] });
      reset();
      onClose();
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description:
          error?.response?.data.message || "Failed To Update Stock Take",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleCreateUserRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  const useHandleUpdateStockTakeService = (reset: () => void, id?: number) => {
    function handleUpdateTeamsRequest(
      data: StockTakeCreate
    ): Promise<CreateUserResponseType> {
      return axios.put(`/stock-take/${id}`, data);
    }

    const onSuccess = (response: CreateUserResponseType) => {
      console.log("update Stock Take", response);
      notification.success({
        message: "Stock Updated ",
        description: "Stock Take Updated Successfully",
        placement: "topRight",
      });
      reset();

      queryClient.invalidateQueries({ queryKey: ["stock", id] });
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description:
          error?.response?.data.message || "Failed To Update Stock Take",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleUpdateTeamsRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  const useHandleDeleteStockTakeService = (id?: number) => {
    async function handleDeleteStockTake(): Promise<ApiTeamResponse> {
      return axios.delete(`/stock-take/${id}`).then((res) => res.data);
    }

    const onSuccess = (response: ApiTeamResponse) => {
      console.log("response form server Stock take deactivated", response);

      notification.success({
        message: "Stock Take Deactivate",
        description: "You have successfully Deactivated the Stock",
        placement: "topRight",
      });

      queryClient.invalidateQueries({ queryKey: ["stock"] });
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description:
          error?.response?.data.message || "Stock take failed to Deactivate",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleDeleteStockTake,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  return {
    useFetchStockTakes,
    useHandleCreateStockTakeService,
    useHandleUpdateStockTakeService,
    useHandleDeleteStockTakeService,
  };
};
export default StockTakeService;
