import { PaginatedResponse } from ".";
import { productType } from "./product";

export type fetchAllComplaintApiResponse = PaginatedResponse<complaintType[]>;

// export type complaintType = {
//   id: number;
//   complaintNo: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
//   description: string;
//   assignedTo: string;
//   resolutionDetail: string;
//   complaintType: string[];
//   priority: complaintPriorityType;
//   customer: customerType;
//   product: productType;
// };

export type complaintType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  complaintNo: string;
  subject: string;
  reference: string;
  description: string;
  resolutionDetail: string | null;
  resolutionHistory: any;
  status: string;
  complaintStatus: string;
  daysOpen: number;
  type: string;
  priority: string;
  isActive: boolean;
  createdBy: User;
  customer: User;
  assignedTo: User;
};

export type customerType = {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export type complaintStatsType = {
  date: string; // The date of the record, represented as a string
  pending: number; // The number of open cases (integer)
  inProgress: number; // The number of pending cases (integer)
  resolved: number; // The number of pending cases (integer)
  closed: number; // The number of closed cases (integer)
  rejected: number; // The number of rejected cases (integer)
};
export type complaintPriorityType = "Low" | "Medium" | "High" | "Critical";
