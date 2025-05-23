import axios from "@/lib/config/axios-instance";
import { fetchAllUsersApiResponse } from "@/lib/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { buildUrlWithParams } from "@/lib/helpers";
import { notification } from "antd";

const KpiService = () => {
  const queryClient = useQueryClient();
  const useFetchAllKpis = (
    type: any,
    query?: string | undefined,
    page?: number,
    limit?: number
  ) => {
    async function fetchUsers(): Promise<fetchAllUsersApiResponse> {
      const url = buildUrlWithParams("/metrics/kpis", {
        type,
        query,
        page,
        limit,
      });
      return axios.get(url).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchUsers,
      queryKey: ["kpi", type, query, page, limit],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  const useHandleCreateKpiService = (reset: () => void) => {
    function handleCreateTeamRequest(data: any): Promise<any> {
      return axios.post(`/metrics/kpis`, data);
    }

    const onSuccess = (response: any) => {
      console.log("response form server", response);

      notification.success({
        message: "kpi created Successful",
        description: "You have successfully created the kpi!",
        placement: "topRight",
      });

      queryClient.invalidateQueries({ queryKey: ["kpi"] });
      reset();
    };
    const onError = (error: any) => {
      notification.error({
        message: "Failed",
        description: error?.response?.data.message || "kpi Not Created",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleCreateTeamRequest,
      onSuccess,
      onError,

      retry: 0,
    });
  };
  const useHandleUpdateKpiService = (reset: () => void, id?: number) => {
    function handleUpdateTeamsRequest(data: any): Promise<any> {
      return axios.put(`/metrics/kpis/${id}`, data);
    }

    const onSuccess = (response: any) => {
      notification.success({
        message: "Kpi Updated Successfully",
        description: "You have successfully updated the Team",
        placement: "topRight",
      });
      reset();

      queryClient.invalidateQueries({ queryKey: ["kpi", id] });
    };
    const onError = (error: any) => {
      notification.error({
        message: "Failed",
        description: error?.response?.data.message || "Failed To Update Kpi",
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
  const useFetchKpiDetails = (id?: number) => {
    async function fetchTargetedTeam(): Promise<any> {
      return axios.get(`/metrics/kpis/${id}`).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchTargetedTeam,
      queryKey: ["team", id],
      retry: 1,
      refetchOnWindowFocus: false,
    });
  };
  const useHandleCreateKpiItemsService = (reset: () => void, refetch: any) => {
    function handleCreateTeamRequest(data: any): Promise<any> {
      return axios.post(`/metrics/kpis-items`, data);
    }

    const onSuccess = (response: any) => {
      console.log("response form server", response);

      notification.success({
        message: "kpi Items created Successful",
        description: "You have successfully created the kpi Items!",
        placement: "topRight",
      });

      queryClient.invalidateQueries({ queryKey: ["kpi"] });
      reset();
      refetch();
    };
    const onError = (error: any) => {
      notification.error({
        message: "Failed",
        description: error?.response?.data.message || "kpi Not Created",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleCreateTeamRequest,
      onSuccess,
      onError,

      retry: 0,
    });
  };
  const useFetchAllDetailsKpis = () => {
    async function fetchUsers(): Promise<fetchAllUsersApiResponse> {
      const url = buildUrlWithParams("/metrics/all-team-kpis", {});
      return axios.get(url).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchUsers,
      queryKey: ["kpi"],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  const useHandleUpdateKpiItemsService = (
    reset: () => void,
    id?: number,
    refetch?: any
  ) => {
    function handleUpdateTeamsRequest(data: any): Promise<any> {
      return axios.put(`/metrics/kpi-items/${id}`, data);
    }

    const onSuccess = (response: any) => {
      console.log("update Kpi response form server you can check it", response);
      notification.success({
        message: "Items Updated Successfully",
        description: "You have successfully updated the Items",
        placement: "topRight",
      });
      reset();
      refetch();

      queryClient.invalidateQueries({ queryKey: ["kpi", id] });
    };
    const onError = (error: any) => {
      notification.error({
        message: "Failed",
        description: error?.response?.data.message || "Failed To Update Items",
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
  const useFetchKpiSummaryDetails = (
    id?: number,
    startDate?: string,
    endDate?: string,
    type?: string
  ) => {
    // const type = "Project";
    async function fetchTargetedTeam(): Promise<any> {
      if (id !== undefined) {
        const url = buildUrlWithParams(
          `/metrics/user-kpi-summary/${String(id)}`,
          {
            startDate,
            endDate,
            type,
          }
        );
        return axios.get(url).then((res) => res.data);
      }
    }

    return useQuery({
      queryFn: fetchTargetedTeam,
      queryKey: ["teams", id, startDate, endDate, type],
      retry: 1,
      refetchOnWindowFocus: false,
    });
  };
  return {
    useFetchAllKpis,
    useHandleCreateKpiService,
    useHandleUpdateKpiService,
    useFetchKpiDetails,
    useHandleCreateKpiItemsService,
    useFetchAllDetailsKpis,
    useHandleUpdateKpiItemsService,
    useFetchKpiSummaryDetails,
  };
};
export default KpiService;
