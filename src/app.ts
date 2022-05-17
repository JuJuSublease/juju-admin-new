import type { RequestConfig } from 'umi';

export const request: RequestConfig = {
  prefix: 'https://juju-api-staging.herokuapp.com',
  requestInterceptors: [
    (url, options) => {
      options.headers = {
        ...options.headers,
        Authorization:
          'jwt-admin eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMSIsImlhdCI6MTY1Mjc2MzA4MDA0MX0.gWKzZCfy9_HyM4H4Eo_7s8DwYxnwFPYdangb3ZXbfgk',
      };

      return { url, options };
    },
  ],
};
