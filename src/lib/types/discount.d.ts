export type discountCriteriaType = {
    id: number;
    categories: string[] | null;
    userIds: string[] | null;
    regionIds: string[] | null | [];
    productIds: string[] | null | [];
    minAmount: string;
  };
  
  export type discountType = {
    id: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    type: string;
    amount: string;
    maxUsage: number;
    usedCount: number;
    validFrom: string;
    validTill: string;
    criteria: Criteria;
  };
  
  export type fetchAllDiscountsAPIResponse = {
    message: string;
    data: discountType[];
    page: number;
    total: number;
    lastPage: number;
  };
  