import type { RequestConfig } from 'umi';
import { request } from 'umi';

export interface GetAllProductsParams {}

export interface Product {
  id: number;
  productType: string;
  dateStart: unknown;
  dateEnd: unknown;
  name: string;
  nameZh: string;
  description: string;
  descriptionZh: string;
  active: boolean;
  price: string;
  taxRate: unknown;
  isPriceWithTax: boolean;
  imageUrl: string;
  purchasedCount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: unknown;
  foodCompanyId: number;
  foodRestaurantId: number;
  foodCompany: {
    id: number;
    active: boolean;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: unknown;
  };
  foodRestaurant: {
    id: number;
    timezone: string;
    active: boolean;
    name: string;
    phone: string;
    email: string;
    address: {
      city: string;
      state: string;
      address: string;
      postalCode: string;
      countryCode: string;
    };
    geocode: unknown;
    taxRate: string;
    rating: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    foodCompanyId: number;
  };
}

export interface GetAllProductsData {
  foodProducts: Product[];
}

export async function getAllProduct(body: GetAllProductsParams, options?: RequestConfig) {
  return request<API.Result<GetAllProductsData>>('/v1/food/products/query-all', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
