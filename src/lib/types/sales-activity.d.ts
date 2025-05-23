import { PaginatedResponse } from ".";

export type Person = {
  firstName: string;
  lastName: string;
};

export type salesActivityType = {
  date: number;
  amount: number;
  user: Person;
  order: {
    orderDate: string;
    customer: Person;
  };
};

export type fetchAllSalesActivityApiResponse = PaginatedResponse<
  salesActivityType[]
>;
