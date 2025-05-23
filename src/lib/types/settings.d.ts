
export interface TaxCriteria {
    id: number;
    categories: number[] | null;
    userIds: number[] | null;
    regionIds: number[] | null;
    productIds: number[] | null;
    minAmount: number;
    maxAmount: number;
  }
  
  export interface Tax {
    id: number;
    name: string;
    value: number;
    isActive: boolean;
    criteria: TaxCriteria;
  }