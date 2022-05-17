import type { RequestConfig } from 'umi';
import { request } from 'umi';

export interface GetAllCompanyParams {}

export interface FoodCompany {
  id: number;
  active: boolean;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface GetAllCompanyData {
  foodCompanies: FoodCompany[];
}

export async function getAllCompany(body: GetAllCompanyParams, options?: RequestConfig) {
  return request<API.LoginResult<GetAllCompanyData>>('/v1/food/companies/query-all', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
