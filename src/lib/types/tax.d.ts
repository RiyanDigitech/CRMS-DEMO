export interface taxCriteriaType {
  id: number;
  categories: string[] | null;
  userIds: string[] | null;
  regionIds: string[] | null;
  productIds: string[] | null;
  minAmount: string | null;
  maxAmount: string | null;
}

export interface taxType {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  value: string;
  isActive: boolean;
  forFiler: boolean;
  criteria: taxCriteriaType | null;
}

export interface fetchAllTaxApiResponse {
  message: string;
  data: Tax[];
  page: number;
  total: number;
  lastPage: number;
}
