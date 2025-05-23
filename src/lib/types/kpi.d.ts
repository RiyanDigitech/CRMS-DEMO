interface SalesPerson {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  designation: string;
  customerSegmentIds: string[];
  operatingUnitIds: string[];
}

interface KpiItem {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  resourceId: null | number;
  kpiName: string;
  kpiUnit: string;
  weightage: string;
  target: number;
  actual: number;
  score: number;
}

interface SalesData {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  salesPerson: SalesPerson;
  startDate: string;
  endDate: string;
  kpiRating: number;
  kpiItems: KpiItem[];
}

export interface KpiApiResponse {
  message: string;
  data: SalesData[];
}
