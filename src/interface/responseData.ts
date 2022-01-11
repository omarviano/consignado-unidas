export interface ResponseData<T = any> {
  success: boolean;
  errors: string[];
  message: string;
  statusCode: number;
  data: T;
}
