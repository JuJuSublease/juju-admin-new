import type { RequestConfig } from 'umi';
import { request } from 'umi';

export interface LoginParams {
  email: string;
  password: string;
}

export interface UserInfo {
  id: number;
  isSuperAdmin: boolean;
  timezone: string;
  active: boolean;
  name: string;
  email: string;
  phone: string;
  loginCount: number;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface LoginData {
  token: string;
  admin: UserInfo;
}

export async function login(body: LoginParams, options?: RequestConfig) {
  return request<API.Result<LoginData>>('/v1/admins/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export interface ReadAdminParams {}

interface ReadAdminData {
  admin: UserInfo;
}

export async function readAdmin(body?: ReadAdminParams, options?: RequestConfig) {
  return request<API.Result<ReadAdminData>>('/v1/admins/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export interface UpdateAdminParams extends UserInfo {}

interface UpdateAdminData {
  admin: UserInfo;
}

export async function updateAdmin(body?: Partial<UpdateAdminParams>, options?: RequestConfig) {
  return request<API.Result<UpdateAdminData>>('/v1/admins/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
