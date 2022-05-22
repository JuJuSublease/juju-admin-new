import type { RequestConfig } from 'umi';
import { request } from 'umi';

export interface GetAllRestaurantsParams {}

export interface Restaurant {
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
  foodCompany: {
    id: number;
    active: boolean;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  };
}

export interface GetAllRestaurantsData {
  foodRestaurants: Restaurant[];
}

export async function getAllRestaurants(body: GetAllRestaurantsParams, options?: RequestConfig) {
  return request<API.Result<GetAllRestaurantsData>>('/v1/food/restaurants/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
