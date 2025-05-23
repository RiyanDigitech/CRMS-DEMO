import { ComplaintFormData } from "@/components/modules/complaints/create-complaint-modal";
import axios from "@/lib/config/axios-instance";
import { buildUrlWithParams } from "@/lib/helpers";
import { complaintAdminFormSchema } from "@/lib/schemas";
import {
  complaintStatsType,
  fetchAllComplaintApiResponse,
} from "@/lib/types/complaints";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { z } from "zod";

const ComplaintService = () => {
  const queryClient = useQueryClient();
  const useFetchAllComplaints = (page?: number, limit?: number) => {
    const url = buildUrlWithParams("/complaint", { page: limit });
    function fetchProduct(): Promise<fetchAllComplaintApiResponse> {
      return axios.get(url).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchProduct,
      queryKey: ["complaint", page, limit],
    });
  };
  const useHandleCreateComplaint = () => {
    function handleForgotRequest(data: ComplaintFormData): Promise<any> {
      return axios.post(`/complaint`, data);
    }
    const onSuccess = () => {
      notification.success({
        message: "Success",
        description: "Complaint Created Successfully",
        placement: "topRight",
      });
      queryClient.invalidateQueries({ queryKey: ["complaint"] });
      queryClient.invalidateQueries({ queryKey: ["complaint-stats"] });
    };

    return useMutation({
      mutationFn: handleForgotRequest,
      onSuccess,
      retry: 0,
    });
  };

  const useHandleUpdateComplaintAdmin = (id: number | null) => {
    function handleUpdateComplaintAdmin(
      data: z.infer<typeof complaintAdminFormSchema>
    ): Promise<any> {
      return axios
        .put(`admin/complaints/status/${id}`, data)
        .then((res) => res.data);
    }

    const onSuccess = () => {
      notification.success({
        message: "Success",
        description: "Complaint Updaed Successfully",
        placement: "topRight",
      });
      queryClient.invalidateQueries({ queryKey: ["complaint"] });
      queryClient.invalidateQueries({ queryKey: ["complaint-stats"] });
    };
    return useMutation({
      mutationFn: handleUpdateComplaintAdmin,
      onError: (error) => {
        //@ts-ignore
        toast.error(error.response.data.message);
      },
      onSuccess,
      retry: 0,
    });
  };
  const useFetchComplaintStats = (startDate?: string, endDate?: string) => {
    const url = buildUrlWithParams(`/complaint/stats`, { startDate, endDate });
    function fetchProduct(): Promise<{ data: complaintStatsType[] }> {
      return axios.get(url).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchProduct,
      queryKey: ["complaint-stats", startDate, endDate],
    });
  };
  return {
    useFetchAllComplaints,
    useHandleCreateComplaint,
    useFetchComplaintStats,
    useHandleUpdateComplaintAdmin,
  };
};

export default ComplaintService;
