export interface SalesOrderList {
  key: React.Key;
  orderid: number;
  customer: string;
  amount: number;
  paymentmethod: string;
  orderdate: string;
  status: string;
}
export interface SalesDetailsOrderList {
  key: React.Key;
  product: string;
  productId: string;
  price: number;
  quantity: number;
  total: number;
  image: string;
}
//orderlist
export interface OrdersResponse {
  message: string;
  data: OrdersData;
}

// Define the main data structure
export interface OrdersData {
  orders: Order[];
  total: number;
  currentPage: number;
  totalPages: number;
}

// Define the structure for each order
export interface Order {
  id: number;
  status: string;
  createdAt: string; // ISO Date string
  createdByUserId: number;
  totalAmount: string; // Use string for monetary values to preserve precision
  estimatedTax: string;
  discount: string;
  shippingCharge: string;
  subTotal: string;
  paymentStatus: string;
  shippingMethod: string;
  trackingNumber: string;
  customer: Customer;
  orderItems: string[]; // Can be an array of items
}

// Define the structure for the customer
export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
//targetedordersdetails
export interface TargetedCustomer {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  erpId: string | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface TargetProduct {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  inventoryItemId: string;
  description: string;
  sku: string;
  productCategory: string;
  productSubCategory: string;
  productGroup: string;
  voltageGrade: string;
  productCores: number;
  productCSA: string;
  productColor: string;
  brand: string;
  quantity: number;
  OUMCode: string;
  UOMConversion: string;
  price: string;
  attribute: string;
}

export interface TargetOrderItem {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  quantity: number;
  unitPrice: string;
  product: TargetProduct;
}

export interface TrgetOrderData {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  totalAmount: string;
  estimatedTax: string;
  discount: string;
  shippingCharge: string;
  subTotal: string;
  shippingMethod: string;
  orderDate: string;
  customer: TargetedCustomer;
  orderItems: TargetOrderItem[];
}
export interface TransformedOrderProduct {
  key: number;
  product: string;
  productId: number;
  price: number;
  quantity: number;
  total: number;
  brand: string;
  productCategory: string;
  image: string;
}
