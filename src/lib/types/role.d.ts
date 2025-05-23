export interface GetRolesTypes {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  title: string;
}

export interface GetAllRolesTypes {
  message: string;
  data: GetRoleTypes[];
}
