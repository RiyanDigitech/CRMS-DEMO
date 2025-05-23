import { PaginatedResponse } from ".";
import { productType } from "./products";

export type categoryType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  productId: number | null;
  isActive: boolean;
  products: productType[];
};

export type fetchAllCategoryApiResponse = PaginatedResponse<categoryType[]>;
