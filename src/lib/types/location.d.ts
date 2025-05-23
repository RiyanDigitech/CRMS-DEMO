import { PaginatedResponse } from ".";

export interface Area {
  name: string;
  areas: string[];
}

export interface CityRegion {
  city: string;
  regions: Area[];
}

export interface ApiResponseLocation {
  message: string;
  data: CityRegion[];
}

export type regionType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
};

export type operatingUnitType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  regionId: number;
};

export type fetchAllRegionApiResponse = PaginatedResponse<regionType[]>;
export type fetchOperatingUnitTypeApiResponse = PaginatedResponse<
  operatingUnitType[]
>;




















export type operatingUnitSegmentType = {
  id: number;
  name: string;
  orgId: number;
};

export type regionSegmentType = {
  id: number;
  name: string;
  operatingUnit: operatingUnitSegmentType[];
};

export type categorySegmentType = {
  id: number;
  name: string;
  regions: regionSegmentType[];
};

export type fetchAllSegmentsApiResponse=PaginatedResponse<categorySegmentType[]>;