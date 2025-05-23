import axios from "@/lib/config/axios-instance";
import { buildUrlWithParams } from "@/lib/helpers";
import { TaskAssignmentResponse } from "@/lib/types/pjp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";

const PJPService = () => {
  const queryClient = useQueryClient();

  const useHandleCreatePJPService = (
    reset: () => void,
    refetch: () => void
  ) => {
    function handleCreateTeamRequest(data: any): Promise<any> {
      return axios.post(`/pjp`, data);
    }

    const onSuccess = (response: any) => {
      console.log("response form server", response);

      notification.success({
        message: "Sales Plan created Successful",
        description: "You have successfully created the Sales Plan",
        placement: "topRight",
      });

      queryClient.invalidateQueries({ queryKey: ["pjp"] });
      reset();
      refetch();
    };
    const onError = (error: any) => {
      notification.error({
        message: "Failed",
        description: error?.response?.data.message || "Sales Plan Not Created",
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
  const useFetchAllPJP = (limit?: number, page?: number, userId?: number) => {
    const queryClient = useQueryClient();

    async function fetchUsers(): Promise<TaskAssignmentResponse> {
      const url = buildUrlWithParams("/pjp", {
        page,
        limit,
        userId,
      });
      return axios.get(url).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchUsers,
      queryKey: ["pjp", page, limit, userId],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  return {
    useHandleCreatePJPService,
    useFetchAllPJP,
  };
};
export default PJPService;
