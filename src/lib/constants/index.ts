import { ComplaintPriorityType, ComplaintType } from "../enums";

export const PUBLIC_API_ENDPOINTS: string[] = ["/auth/login"];

export const COMPLAINTS = [
  {
    value: ComplaintType.Quality,
    label: ComplaintType.Quality,
  },
  {
    value: ComplaintType.Service,
    label: ComplaintType.Service,
  },
  {
    value: ComplaintType.Delivery,
    label: ComplaintType.Delivery,
  },
  {
    value: ComplaintType.Others,
    label: ComplaintType.Others,
  },
];

export const PRIORITY = [
  {
    value: ComplaintPriorityType.Low,
    label: ComplaintPriorityType.Low,
  },
  {
    value: ComplaintPriorityType.Medium,
    label: ComplaintPriorityType.Medium,
  },
  {
    value: ComplaintPriorityType.High,
    label: ComplaintPriorityType.High,
  },
  {
    value: ComplaintPriorityType.Critical,
    label: ComplaintPriorityType.Critical,
  },
];
