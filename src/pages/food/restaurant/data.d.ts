export type TableListItem = {
  key: number;
  componyName: string;
  restaurant: { name: string; address: string };
  contact: { tel: string; email: string };
  taxRate: number;
  timezone: string;
  active: boolean;
  createdAt: Date;
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  status?: string;
  name?: string;
  componyName?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
