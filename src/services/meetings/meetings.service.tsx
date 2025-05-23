import { z } from "zod";
import axios from "@/lib/config/axios-instance";

import { notification } from "antd";
import { errorType } from "@/lib/types";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { meetingFormSchema } from "@/lib/schemas";

import {
  fetchAllMeetingsApiRes,
  fetchMeetingApiRes,
  meetingType,
} from "@/lib/types/meeting";
import { useNavigate } from "react-router-dom";

const MeetingService = () => {
  const useHandleCreateMeeting = (reset: () => void) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    function handleAddMeeting(
      data: z.infer<typeof meetingFormSchema>
    ): Promise<meetingType> {
      return axios.post(`/meeting-scheduler`, data).then((res) => {
        if (res.status === 200) {
          return res.data;
        } else {
          throw new Error(res.data?.message || "Unexpected server error");
        }
      });
    }

    return useMutation({
      mutationFn: handleAddMeeting,
      onSuccess: (response: meetingType) => {
        console.log(
          response,
          "data from scuss response from sever after create user"
        );
        notification.success({
          message: "Meeting scheduled Successful",
          description: "You have successfully scheduled the meeting!",
          placement: "topRight",
        });
        navigate(`/meetings`);
        queryClient.invalidateQueries({ queryKey: ["meeting"] });
        reset();
      },
      onError: (error: errorType) => {
        console.log(error, "error from create meeting");
        notification.error({
          message: "Failed",
          description: error?.response?.data.message || "Meeting Not Created",
          placement: "topRight",
        });
      },
      retry: 0,
    });
  };

  const useHandleUpdateMeeting = (id: string | null) => {
    function handleUpdateMeeting(
      data: z.infer<typeof meetingFormSchema>
    ): Promise<meetingType> {
      return axios
        .put(`/meeting-scheduler/${id}`, data)
        .then((res) => res.data);
    }

    const onSuccess = (response: meetingType) => {
      console.log(
        "update meeting response form server you can check it",
        response
      );
      notification.success({
        message: "Meeting scheduled Updated Successfully",
        description: "You have successfully updated the meeting schedule !",
        placement: "topRight",
      });
    };
    const onError = (error: errorType) => {
      console.log("error", error);
      notification.error({
        message: "Failed",
        description: error?.response?.data.message || "Failed To  meeting",
        placement: "topRight",
      });
    };

    return useMutation({
      mutationFn: handleUpdateMeeting,
      onSuccess,
      onError,
      retry: 0,
    });
  };

  const useFetchAllMeetings = () => {
    async function fetchMeetings(): Promise<fetchAllMeetingsApiRes> {
      return axios.get(`/meeting-scheduler`).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchMeetings,
      queryKey: ["meeting"],
    });
  };

  const useFetchMeetingById = (meetingId: number | null) => {
    async function fetchMeeting(): Promise<{
      data: fetchMeetingApiRes;
    }> {
      return axios
        .get(`/meeting-scheduler/${meetingId}`)
        .then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchMeeting,
      queryKey: ["meeting", meetingId],
    });
  };

  const useHandleDeleteMeeting = () => {
    const queryClient = useQueryClient();
    async function deleteMeeting(id: string | number): Promise<any> {
      return axios.delete(`/meeting-scheduler/${id}`).then((res) => res.data);
    }

    const onSuccess = () => {
      notification.success({
        message: "Meeting scheduled deleted",
        description: "Meeting scheduled deleted successfully",
        placement: "topRight",
      });
      queryClient.invalidateQueries({ queryKey: ["meeting"] });
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description:
          error?.response?.data.message || "Failed To delete meeting",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: deleteMeeting,
      onSuccess,
      onError,
      retry: 0,
    });
  };

  return {
    useHandleCreateMeeting,
    useHandleUpdateMeeting,
    useFetchAllMeetings,
    useFetchMeetingById,
    useHandleDeleteMeeting,
  };
};

export default MeetingService;
