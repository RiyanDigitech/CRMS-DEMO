import axios from "@/lib/config/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { GetAllRolesTypes } from "@/lib/types/role";

const RolesService = () => {
  const queryClient = useQueryClient();

  const useCreateRole = () => {};

  const useUpdateRole = (roleId: string | number | null) => {};

  const useDeleteRole = () => {};

  const useFetchAllRoles = () => {
    async function fetchRole(): Promise<GetAllRolesTypes> {
      return axios.get(`/role`).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchRole,
      queryKey: ["role"],
      retry: 1,
      refetchOnWindowFocus: false,
    });
  };

  return {
    useFetchAllRoles,
    useCreateRole,
    useUpdateRole,
    useDeleteRole,
  };
};

export default RolesService;
