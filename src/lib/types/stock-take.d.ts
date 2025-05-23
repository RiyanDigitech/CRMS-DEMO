export interface StockTake {
  id: number;
  stockTake: string;
  location: string;
  countedQTY: number;
  systemQTY: number;
  takeDate: string; // or Date
  stockStatus: string;
  status: string;
  createdAt: string; // or Date
  updatedAt: string; // or Date
}
export interface StockTakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: StockTake | null;
}
export interface StockTakeCreate {
  stockTake: string;
  location: string;
  countedQTY?: number;
  systemQTY?: number;
  takeDate?: string; // or Date
  stockStatus: string;
}
