import axios from "@/lib/config/axios-instance";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import { buildUrlWithParams } from "@/lib/helpers";
import { OrdersResponse, TrgetOrderData } from "@/lib/types/sales-orders";
import { notification } from "antd";
import { errorType } from "@/lib/types";
import { ApiTeamResponse } from "@/lib/types/team";
interface ApiResponseOrder {
  data: TrgetOrderData;
}
export interface OrdersStatusResponse {
  message: string;
  data: OrdersStatusData;
}

export interface OrdersStatusData {
  pending?: number; // Optional, kyunki ho sakta hai yeh field na aaye
  confirmed?: number; // Optional
  completed?: number; // Optional
  cancelled?: number; // Optional
}

const OrdersService = () => {
  const queryClient = useQueryClient();
  const useFetchAllOrders = (
    limit?: number,
    page?: number,
    status?: string,
    query?: string
  ) => {
    async function fetchOrder(): Promise<OrdersResponse> {
      const url = buildUrlWithParams("/orders", {
        limit,
        page,
        status,
        query,
      });
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchOrder,
      queryKey: ["order", limit, page, status, query],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  const useHandleDeleteOrder = (id?: number) => {
    async function handleDeleteTeam(): Promise<ApiTeamResponse> {
      return axios.delete(`/orders/${id}`).then((res) => res.data);
    }

    const onSuccess = (response: ApiTeamResponse) => {
      notification.success({
        message: "Order Deleted",
        description: "You have successfully Deleted the order!",
        placement: "topRight",
      });

      queryClient.invalidateQueries({ queryKey: ["order"] });
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description: error?.response?.data.message || "order failed to delete",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleDeleteTeam,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  const useFetchTargetedOrder = (id?: number) => {
    async function fetchTargetedTeam(): Promise<ApiResponseOrder> {
      return axios.get(`/orders/${id}`).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchTargetedTeam,
      queryKey: ["order", id],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  const useFetchOrdersStats = () => {
    async function fetchOrderStats(): Promise<OrdersStatusResponse> {
      // const url = buildUrlWithParams("/orders/stats", {});
      return axios.get("/orders/stats").then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchOrderStats,
      queryKey: ["order"],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  return {
    useFetchAllOrders,
    useHandleDeleteOrder,
    useFetchTargetedOrder,
    useFetchOrdersStats,
  };
};
export default OrdersService;
