// Define the type for a single operating unit
interface OperatingUnit {
  id: number;
  name: string;
}

// Define the API response interface
export interface CustomerSegmentResponse {
  message: string;
  data: OperatingUnit[];
}
