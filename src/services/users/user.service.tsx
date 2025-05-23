import axios from "@/lib/config/axios-instance";
import {
  CreateUserResponseType,
  fetchAllUsersApiResponse,
  fetchTargetedUsersApiResponse,
  updateUserResponseType,
  updateUserToRemoveTeamType,
} from "@/lib/types/user";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { updateUserType } from "@/lib/types/user";
import { notification } from "antd";
import { errorType } from "@/lib/types";
import { buildUrlWithParams } from "@/lib/helpers";
import {
  createTeamResponseType,
  updateUserMultipleTeamsType,
} from "@/lib/types/team";
import { PositionsDataRespose } from "@/lib/types/position";
const UsersService = () => {
  // const queryClient = useQueryClient();
  const useFetchAllUsers = (
    limit?: number,
    page?: number,
    roleId?: number,
    query?: string,
    positionName?: string
  ) => {
    const queryClient = useQueryClient();

    async function fetchUsers(): Promise<fetchAllUsersApiResponse> {
      const url = buildUrlWithParams("/admin/users", {
        page,
        limit,
        roleId,
        query,
        positionName,
      });
      return axios.get(url).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchUsers,
      queryKey: ["users", page, limit, roleId, query, positionName],
      retry: 1,
      refetchOnWindowFocus: false,
    });
  };
  const useHandleUpdateUserService = (reset: () => void, id?: number) => {
    const queryClient = useQueryClient();

    function handleUpdateUserRequest(
      data: FormData | updateUserType
    ): Promise<updateUserResponseType> {
      return axios.put(`/admin/update-user/${id}`, data);
    }

    const onSuccess = (response: updateUserResponseType) => {
      console.log(
        "update users response form server you can check it",
        response
      );
      notification.success({
        message: "User Profile Updated Successfully",
        description: "You have successfully updated the Profile!",
        placement: "topRight",
      });
      reset();

      queryClient.invalidateQueries({ queryKey: ["users"] });
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description: error?.response?.data.message || "Failed To Update User",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleUpdateUserRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  const useHandleCreateUserService = (
    reset: () => void,
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,

    onClose: () => void
  ) => {
    const queryClient = useQueryClient();

    function handleCreateUserRequest(
      data: FormData
    ): Promise<CreateUserResponseType> {
      return axios.post(`/auth/signup`, data);
    }

    const onSuccess = (response: CreateUserResponseType) => {
      console.log("user created server response ", response);
      notification.success({
        message: "User Created Successful",
        description: "You have successfully created the user!",
        placement: "topRight",
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      reset();
      setSelectedFile(null);
      onClose();
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description: error?.response?.data.message || "Failed To Update User",
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
  const useHandleTargetedUsers = (id?: number, datachanged?: string) => {
    async function fetchTaregtedUsers(): Promise<fetchTargetedUsersApiResponse> {
      return axios.get(`admin/user/${id}`).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchTaregtedUsers,
      queryKey: ["users", id, datachanged],
      retry: 1,
      refetchOnWindowFocus: false,
    });
  };
  const useHandleAddTeamsService = (reset: () => void, onClose: () => void) => {
    const queryClient = useQueryClient();

    function handleUpdateTeamMembersRequest(
      data: updateUserMultipleTeamsType
    ): Promise<createTeamResponseType> {
      return axios.put(`/team/add/multiple`, data);
    }

    const onSuccess = (response: createTeamResponseType) => {
      console.log("response form server team members", response);

      notification.success({
        message: "User Teams added Successfully",
        description: "You have successfully added the teams ",
        placement: "topRight",
      });

      queryClient.invalidateQueries({ queryKey: ["users"] });
      reset();
      onClose();
    };
    const onError = (error: errorType) => {
      notification.error({
        message: " Failed",
        description: error?.response?.data.message || "User Updated failed",
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
  const useHandleDeleteUserService = (reset: () => void, id?: number) => {
    const queryClient = useQueryClient();

    const dat = { status: "Deactivated" };

    function handleDeleteUserRequest(): Promise<updateUserResponseType> {
      return axios.put(`/admin/update-user/${id}`, dat);
    }

    const onSuccess = (response: updateUserResponseType) => {
      console.log(
        "update users response form server you can check it",
        response
      );
      notification.success({
        message: "User Deleted",
        description: "User Deleted",
        placement: "topRight",
      });
      reset();

      queryClient.invalidateQueries({ queryKey: ["users"] });
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description: error?.response?.data.message || "Failed To Delete User",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleDeleteUserRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  const useHandleRemoveTeamsService = (
    reset: () => void,
    setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>
  ) => {
    const queryClient = useQueryClient();

    function handleUpdateRemoveTeamMembersRequest(
      data: updateUserToRemoveTeamType
    ): Promise<CreateUserResponseType> {
      return axios.put(`/team/remove/multiple`, data);
    }

    const onSuccess = (response: CreateUserResponseType) => {
      console.log("response form server team remove", response);

      notification.success({
        message: "Team  remove Successfully",
        description: "You have successfully remove the teams ",
        placement: "topRight",
      });
      setSelectedRowKeys([]);
      queryClient.invalidateQueries({ queryKey: ["users"] });
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
  const useFetchAllPositions = (limit?: number, page?: number) => {
    async function fetchUsers(): Promise<PositionsDataRespose> {
      const url = buildUrlWithParams("/position", {
        limit,
        page,
      });
      return axios.get(url).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchUsers,
      queryKey: ["users", page, limit],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  const useFetchAllOperationUnitIds = () => {
    async function fetchUsers(): Promise<PositionsDataRespose> {
      const url = buildUrlWithParams("/location/operating-units", {});
      return axios.get(url).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchUsers,
      queryKey: ["users"],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  //export interface CustomerSegmentResponse {
  const useFetchAllCustomerSegments = () => {
    async function fetchUsers(): Promise<PositionsDataRespose> {
      const url = buildUrlWithParams("/customer/segments", {});
      return axios.get(url).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchUsers,
      queryKey: ["user"],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  return {
    useFetchAllUsers,
    useHandleUpdateUserService,
    useHandleCreateUserService,
    useHandleTargetedUsers,
    useHandleAddTeamsService,
    useHandleDeleteUserService,
    useHandleRemoveTeamsService,
    useFetchAllPositions,
    useFetchAllOperationUnitIds,
    useFetchAllCustomerSegments,
  };
};
export default UsersService;
