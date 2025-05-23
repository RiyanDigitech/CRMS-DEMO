import axios from "@/lib/config/axios-instance";
import {
  FetchAllPermissionsApiResponse,
  FetchRoleWisePermissionsApiResponse,
} from "@/lib/types/permissions";
import { useQuery, useMutation } from "@tanstack/react-query";
import { GrantPermissionRequest } from "@/lib/types/permissions";
import { useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";

const PermissionService = () => {
  const queryClient = useQueryClient();
  const useFetchAllPermissions = () => {
    async function fetchPermission(): Promise<FetchAllPermissionsApiResponse> {
      return axios.get(`/permission/all`).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchPermission,
      queryKey: ["permissions"],
    });
  };

  const useFetchPermissionsByRoleId = (roleId: number) => {
    async function fetchPermissionById(): Promise<FetchRoleWisePermissionsApiResponse> {
      return axios.get(`/permission/role/${roleId}`).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchPermissionById,
      queryKey: ["permissionsById", roleId],
    });
  };

  const useHandleGrantPermission = () => {
    async function handleGrantPermission(
      data: GrantPermissionRequest
    ): Promise<any> {
      return axios.put(`/permission/grant`, data).then((res) => res.data);
    }

    return useMutation({
      mutationFn: handleGrantPermission,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["permissionsById"] });
        // toast.success("Permission Granted Successfully");
      },
      onError: (error) => {
        //@ts-ignore
        toast(error.response.data.message);
      },
      retry: 0,
    });
  };
  const useHandleRemovePermission = () => {
    async function handleRemovePermission(
      data: GrantPermissionRequest
    ): Promise<any> {
      return axios.put(`/permission/remove`, data).then((res) => res.data);
    }

    return useMutation({
      mutationFn: handleRemovePermission,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["permissionsById"] });
        // toast.success("Permission Removed Successfully");
      },
      onError: (error) => {
        //@ts-ignore
        toast(error.response.data.message);
      },
      retry: 0,
    });
  };

  return {
    useFetchAllPermissions,
    useFetchPermissionsByRoleId,
    useHandleGrantPermission,
    useHandleRemovePermission,
  };
};

export default PermissionService;
