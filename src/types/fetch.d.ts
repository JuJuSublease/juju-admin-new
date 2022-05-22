// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Failure = {
    success: false;
    error: string;
    message: string;
  };

  type Success<T> = T & {
    status: number;
    success: true;
  };

  type Result<T extends Record = Record<any, any>> = Success<T> | Failure;

  type ErrorResponse = {};
}
