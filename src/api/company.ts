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
  return request<API.Result<GetAllCompanyData>>('/v1/food/companies/query-all', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export interface CreateCompanyParams extends FoodCompany {}

export interface CreateCompanyData {
  foodCompany: FoodCompany;
}

export async function createCompany(body: CreateCompanyParams, options?: RequestConfig) {
  return request<API.Result<CreateCompanyData>>('/v1/food/companies/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export interface UpdateCompanyParams extends FoodCompany {}

export interface UpdateCompanyData {
  foodCompany: FoodCompany;
}

export async function updateCompany(body: Partial<UpdateCompanyParams>, options?: RequestConfig) {
  return request<API.Result<UpdateCompanyData>>('/v1/food/companies/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
