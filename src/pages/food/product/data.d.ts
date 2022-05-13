export type TableListItem = {
  key: number;
  restaurant: { name: string; address: string };
  product: {
    productType: 'COMBO' | 'REGULAR';
    name: string;
    desc: string;
    price: string;
    isPriceWithTax: boolean;
    coverImageUrl: string;
  };
  taxRate: number;
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
