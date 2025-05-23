interface Region {
  id: number;
  name: string;
}

// Define the structure of the "segment" object
interface Segment {
  id: number;
  name: string;
}

// Define the structure of each item in the "data" array
interface DataItem {
  id: number;
  name: string;
  orgId: number;
  region: Region;
  segment: Segment;
}

// Define the structure of the entire JSON response
export interface OperatingUnitApiResponse {
  message: string;
  data: DataItem[];
  page: number;
  lastPage: number;
  total: number;
}
