export interface HierarchyNode {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  jurisdictionType: string;
  parentId: number | null;
  jurisdictionPerCount: string;
  totalPositionCount: number | null;
  parent?: HierarchyNode | null;
  subordinates?: HierarchyNode[];
}

export interface PositionsDataRespose {
  message: string;
  data: HierarchyNode[];
  page: number;
  total: number;
  lastPage: number;
}
