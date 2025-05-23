import { ApiResponse, PaginatedResponse } from ".";
import { meetingFormSchema } from "../schemas";

export type meetingType = {
  id: number;
  activityType: string;
  eventType: string;
  customerIds: number[];
  attendeesIds: number[];
  startTime: string;
  endTime: string;
  date: string;
  description: string;
  notes: string;
  location: string;
  subject: string;
  reminder?: boolean;
};

export interface AddMeetingFormProps {
  onSubmit: (values: MeetingFormData) => void;
  meetingId?: string | null;
  onCloseDrawer?: () => void;
}

export type MeetingFormData = z.infer<typeof meetingFormSchema>;
export type fetchAllMeetingsApiRes = PaginatedResponse<meetingType[]>;
export type fetchMeetingApiRes = ApiResponse<meetingType>;
