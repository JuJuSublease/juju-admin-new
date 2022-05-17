import type { RequestConfig } from 'umi';
import { request } from 'umi';

export interface LoginParams {
  email: string;
  password: string;
}

export async function login(body: LoginParams, options?: RequestConfig) {
  return request<API.LoginResult>('/v1/admins/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
