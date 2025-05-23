import { PaginatedResponse } from ".";

export type assignedUserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type salesTargetType = {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  startDate: string;
  endDate: string;
  targetValue: string;
  measurementUnit: string;
  assignedUser: assignedUserType | null;
  kpi: string;
  assignedTeam: any | null; // Adjust `any` if the structure of `assignedTeam` becomes known.
  comission: string;
};

export type fetchAllSalesTargetApiResponse = PaginatedResponse<
  salesTargetType[]
>;
