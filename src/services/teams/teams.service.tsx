import axios from "@/lib/config/axios-instance";
import { updateTeamMemberType, updateTeamType } from "@/lib/types/team";
import { ApiTeamResponseFull } from "@/lib/types/team";
import { ApiTeamResponse } from "@/lib/types/team";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { createTeamType } from "@/lib/types/team";
import { createTeamResponseType } from "@/lib/types/team";
import { notification } from "antd";
import { errorType } from "@/lib/types";
import { buildUrlWithParams } from "@/lib/helpers";
import { fetchAllUsersApiResponse } from "@/lib/types/user";

const TeamsService = () => {
  const queryClient = useQueryClient();
  const useFetchAllTeams = (
    limit?: number,
    page?: number,
    region?: string,
    query?: string,
    city?: string,
    area?: string,
    reportingManagerId?: string
  ) => {
    async function fetchTeam(): Promise<ApiTeamResponseFull> {
      const url = buildUrlWithParams("/team", {
        limit,
        page,
        region,
        city,
        area,
        query,
        reportingManagerId,
      });
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchTeam,
      queryKey: [
        "team",
        limit,
        page,
        region,
        query,
        city,
        area,
        reportingManagerId,
      ],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  const useFetchAllTeamsWithoutFilters = () => {
    async function fetchAllData(): Promise<ApiTeamResponseFull> {
      return axios.get("/team").then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchAllData,
      queryKey: ["team", "all"],
      retry: 1,
      refetchOnWindowFocus: false,
    });
  };
  const useHandleCreateTeamService = (
    reset: () => void,
    onClose: () => void
  ) => {
    function handleCreateTeamRequest(
      data: createTeamType
    ): Promise<createTeamResponseType> {
      return axios.post(`/team`, data);
    }

    const onSuccess = (response: createTeamResponseType) => {
      console.log("response form server", response);

      notification.success({
        message: "Team created Successful",
        description: "You have successfully created the team!",
        placement: "topRight",
      });

      queryClient.invalidateQueries({ queryKey: ["team"] });
      reset();
      onClose();
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description: error?.response?.data.message || "Team Not Created",
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

  const useHandleAddTeamMembersService = (
    reset: () => void,
    onClose: () => void
  ) => {
    function handleUpdateTeamMembersRequest(
      data: updateTeamMemberType
    ): Promise<createTeamResponseType> {
      return axios.put(`/team/add`, data);
    }

    const onSuccess = (response: createTeamResponseType) => {
      console.log("response form server team members", response);

      notification.success({
        message: "Team members added Successfully",
        description: "You have successfully added the team members!",
        placement: "topRight",
      });

      queryClient.invalidateQueries({ queryKey: ["team"] });
      reset();
      onClose();
    };
    const onError = (error: errorType) => {
      notification.error({
        message: " Failed",
        description: error?.response?.data.message || "Team Update failed",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleUpdateTeamMembersRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  const useHandleRemoveTeamMembersService = (reset: () => void) => {
    function handleUpdateRemoveTeamMembersRequest(
      data: updateTeamMemberType
    ): Promise<createTeamResponseType> {
      return axios.put(`/team/remove`, data);
    }

    const onSuccess = (response: createTeamResponseType) => {
      console.log("response form server team members", response);

      notification.success({
        message: "Team members remove Successfully",
        description: "You have successfully remove the team members!",
        placement: "topRight",
      });

      queryClient.invalidateQueries({ queryKey: ["team"] });
      reset();
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description: error?.response?.data.message || "Team Update failed",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleUpdateRemoveTeamMembersRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  const useFetchTargetedTeams = (id?: number, TeamsQuery?: string) => {
    const query = TeamsQuery ? `?query=${TeamsQuery}` : "";
    async function fetchTargetedTeam(): Promise<ApiTeamResponse> {
      return axios.get(`/team/${id}${query}`).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchTargetedTeam,
      queryKey: ["team", id, TeamsQuery],
      retry: 1,
      refetchOnWindowFocus: false,
    });
  };

  const useHandleDeleteTeams = (id?: number) => {
    async function handleDeleteTeam(): Promise<ApiTeamResponse> {
      return axios.delete(`/team/${id}`).then((res) => res.data);
    }

    const onSuccess = (response: ApiTeamResponse) => {
      console.log("response form server team members", response);

      notification.success({
        message: "Team Deleted",
        description: "You have successfully Deleted the team!",
        placement: "topRight",
      });

      queryClient.invalidateQueries({ queryKey: ["team"] });
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description: error?.response?.data.message || "Team failed to delete",
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
  const useHandleUpdateTeamService = (reset: () => void) => {
    function handleUpdateTeamRequest(
      data: updateTeamType
    ): Promise<createTeamResponseType> {
      return axios.put(`/team/update`, data);
    }

    const onSuccess = (response: createTeamResponseType) => {
      console.log("response form server", response);

      notification.success({
        message: "Team Updated Successful",
        description: "You have successfully created the team!",
        placement: "topRight",
      });

      queryClient.invalidateQueries({ queryKey: ["team"] });
      reset();
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description: error?.response?.data.message || "Team Update Failed",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleUpdateTeamRequest,
      onError,
      onSuccess,
      retry: 0,
    });
  };
  const useHandleUpdateTeamsService = (reset: () => void, id?: number) => {
    function handleUpdateTeamsRequest(
      data: updateTeamType
    ): Promise<createTeamResponseType> {
      return axios.put(`/team/update/${id}`, data);
    }

    const onSuccess = (response: createTeamResponseType) => {
      console.log(
        "update Teams response form server you can check it",
        response
      );
      notification.success({
        message: "Team Updated Successfully",
        description: "You have successfully updated the Team",
        placement: "topRight",
      });
      reset();

      queryClient.invalidateQueries({ queryKey: ["team", id] });
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description: error?.response?.data.message || "Failed To Update Team",
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
  const useFetchAllUsers = (
    limit?: number,
    page?: number,
    excludePositions?: boolean
  ) => {
    async function fetchUsers(): Promise<fetchAllUsersApiResponse> {
      const url = buildUrlWithParams("/admin/users", {
        page,
        limit,
        excludePositions,
      });
      return axios.get(url).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchUsers,
      queryKey: ["teams", page, limit, excludePositions],
      retry: 1,
      refetchOnWindowFocus: false,
    });
  };
  const useFetchKpiTeamMembers = (id?: number, type?: string) => {
    async function fetchUsers(): Promise<fetchAllUsersApiResponse> {
      const url = buildUrlWithParams(`/metrics/members/${id}`, { type });
      return axios.get(url).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchUsers,
      queryKey: ["team", id, type],
      retry: 1,
      refetchOnWindowFocus: false,
    });
  };
  const useFetchAllSegments = (limit?: number, page?: number) => {
    async function fetchUsers(): Promise<fetchAllUsersApiResponse> {
      const url = buildUrlWithParams("/location/segments", {
        page,
        limit,
      });
      return axios.get(url).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchUsers,
      queryKey: ["team", page, limit],
      retry: 1,
      refetchOnWindowFocus: false,
    });
  };
  const useFetchAllTeamsKpi = (
    page?: number,
    limit?: number,
    reportingManagerId?: string,
    operatingUnitName?: string,
    customerSegment?: string,
    region?: string,
    segment?: string,
    query?: string
  ) => {
    async function fetchTeam(): Promise<ApiTeamResponseFull> {
      const url = buildUrlWithParams("/metrics/team-kpi", {
        page,
        limit,
        reportingManagerId,
        operatingUnitName,
        customerSegment,
        region,
        segment,
        query,
      });
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchTeam,
      queryKey: [
        "team",
        query,
        page,
        limit,
        reportingManagerId,
        operatingUnitName,
        customerSegment,
        region,
        segment,
      ],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  const useFetchKpiTeamReportingManager = (id?: number, type?: string) => {
    async function fetchUsers(): Promise<fetchAllUsersApiResponse> {
      const url = buildUrlWithParams(`/metrics/team-kpi/${id}`, { type });
      return axios.get(url).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchUsers,
      queryKey: ["teams", id, type],
      retry: 1,
      refetchOnWindowFocus: false,
    });
  };
  return {
    useFetchAllTeams,
    useHandleCreateTeamService,
    useHandleAddTeamMembersService,
    useHandleRemoveTeamMembersService,
    useFetchTargetedTeams,
    useHandleDeleteTeams,
    useHandleUpdateTeamService,
    useFetchAllTeamsWithoutFilters,
    useHandleUpdateTeamsService,
    useFetchAllUsers,
    useFetchKpiTeamMembers,
    useFetchAllSegments,
    useFetchAllTeamsKpi,
    useFetchKpiTeamReportingManager,
  };
};
export default TeamsService;
