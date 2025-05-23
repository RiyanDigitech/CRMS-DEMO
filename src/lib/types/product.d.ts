import { PaginatedResponse } from ".";
import { STATUS } from "../enums";

export type productItemType = {
  id: number;
  inventoryItemId: string; // Updated to match new schema
  quantity: number;
  color: string; // Renamed from 'productColor' for clarity
  price: string;
  attribute: string; // New field added from schema
  dimensions?: string; // Retained for optional compatibility
  imageUrl?: string | null; // Retained for optional compatibility
  skuId?: string; // Retained for optional compatibility
  productId?: number; // Retained for optional compatibility
  status?: STATUS; // Retained for optional compatibility
};

export type productType = {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  productId: string; // Renamed from 'inventoryItemId'
  productName?: string; // Retained for optional compatibility
  brand: string;
  voltageRating: string; // Renamed from 'voltageGrade'
  productCategory: string;
  productSubCategory: string; // Added from schema
  productGroup: string; // Added from schema
  description: string;
  additionalInfo?: string; // Retained for optional compatibility
  productCores: number; // Added from schema
  productCSA: string; // Added from schema
  inventoryItemId:number;
  productColor: string; // Retained separately for better alignment
  sku: string; // Added from schema
  OUMCode: string; // Added from schema
  UOMConversion: string; // Added from schema
  price: string; // Explicitly retained
  productItems?: productItemType[]; // Optional for backward compatibility
};

export type fetchAllProductsApiResponse = PaginatedResponse<productType[]>;





export type stockData = {
  inventoryItemId: number;
  warehouse: string;
  onHandStock: number;
};

export type fetchAllStockDataAPIResponse = {
  message: string;
  data: {
      stockData: stockData[];
      stockBreakUpData: stockData[];
  };
};
