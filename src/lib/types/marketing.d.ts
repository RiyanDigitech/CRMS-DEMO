import { PaginatedResponse } from ".";

export type MarketingType = {
  id: number;
  status: string;
  heading: string;
  attachments: AttachmentType[];
  type: string;
  description: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  tags?: string;
  targetaudience?: string;
};

export type createTeamResponseType = {
  message: string;
} & teamType;

export type createMarketingType = {
  heading: string;
  attachments: AttachmentType[];
  type: string;
  description: string;
  startDate: string;
  endDate: string;
  tags?: string;
  targetaudience?: string;
  status: string;
};
export type createMarketingResponseType = {
  message: string;
} & MarketingType;

export type deleteMarketingType = {
  id: string | number;
};

export type fetchAllMarketingApiResponse = PaginatedResponse<MarektingType[]>;
