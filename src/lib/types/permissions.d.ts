import { ApiResponse } from ".";

export type PermissionType = {
  id: number;
  module: string;
  action: string;
  key: string;
  name: string;
  description: string;
};

interface RoleWisePermissionsType {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  permissions: PermissionType[];
}

export type GrantPermissionRequest = {
  permissionIds: number[];
  roleId: string;
};
export type FetchAllPermissionsApiResponse = ApiResponse<PermissionType[]>;
export type FetchRoleWisePermissionsApiResponse =
  ApiResponse<RoleWisePermissionsType>;
