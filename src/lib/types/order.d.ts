// Define interfaces for the data structure
interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface Order {
  id: number;
  status: string;
  createdAt: string;
  createdByUserId: number;
  totalAmount: string;
  estimatedTax: string;
  discount: string;
  shippingCharge: string;
  subTotal: string;
  paymentStatus: string;
  shippingMethod: string;
  trackingNumber: string;
  customer: Customer;
  orderItems: any[]; // Adjust this if you have a specific structure for order items
}

interface OrdersData {
  orders: Order[];
  total: number;
  currentPage: number;
  totalPages: number;
}

interface ApiResponse {
  message: string;
  data: OrdersData;
}
//targetedorder
export interface OrderFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
  setUsersQuery: React.Dispatch<React.SetStateAction<string | undefined>>;
  isEmpty: boolean;
}
