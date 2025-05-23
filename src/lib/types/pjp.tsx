// Interface for a single Taskexport
export interface Task {
  name: string;
  isCompleted: boolean;
}

// export Interface for a SalesPersonexport
export interface SalesPerson {
  id: number;
  firstName: string;
  lastName: string;
}

// export Interface for a Customerexport
export interface Customer {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
}

// export Interface for a single Data item (representing a task assignment)
export interface TaskAssignment {
  id: number;
  tasks: Task[];
  startDate: string;
  endDate: string;
  isCompleted: boolean;
  salesPerson: SalesPerson;
  customer: Customer;
}

// Interface for the entire API response
export interface TaskAssignmentResponse {
  message: string;
  data: TaskAssignment[];
  total: number;
  page: number;
  lastPage: number;
}
export interface JourneyPlanTableData {
  key: number;
  id: number;
  customer: string;
  tasks: string;
}
export interface SalesPersonListProps {
  data: TaskAssignment[];
}
