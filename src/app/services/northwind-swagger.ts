import { CustomerDto } from '../models/NorthwindSwagger/customer-dto';
import { CustomerDtoPagedResultDto } from '../models/NorthwindSwagger/customer-dto-paged-result-dto';
import { FetchApi } from './fetch-api';
import { OrderDto } from '../models/NorthwindSwagger/order-dto';
import { ProductDto } from '../models/NorthwindSwagger/product-dto';

const API_ENDPOINT = 'https://data-northwind.indigo.design';

export async function getCustomerDtoList(): Promise<CustomerDto[]> {
  return await FetchApi.fetchApiResponse<CustomerDto[]>(`${API_ENDPOINT}/Customers`, []);
}

export async function getCustomerDtoPagedResultDto(pageIndex: number, size: number, orderBy: string): Promise<CustomerDtoPagedResultDto | undefined> {
  const query = new URLSearchParams({
    'pageIndex': `${pageIndex}`,
    'size': `${size}`,
    'orderBy': orderBy });
  return await FetchApi.fetchApiResponse<CustomerDtoPagedResultDto | undefined>(`${API_ENDPOINT}/Customers/GetCustomersWithPage?${query}`, undefined);
}

export async function postCustomerDto(data: any): Promise<CustomerDto | undefined> {
  if (!data) {
    return Promise.resolve(undefined);
  }
  const body = JSON.stringify(data);
  const headers = {
    Authorization: 'Bearer <auth_value>',
    'Content-Type': 'application/json; charset=utf-8'
  };
  return await FetchApi.fetchApiResponse<CustomerDto | undefined>(`${API_ENDPOINT}/Customers`, undefined, 'POST', body, headers);
}

export async function putCustomerDto(data: any): Promise<CustomerDto | undefined> {
  if (!data) {
    return Promise.resolve(undefined);
  }
  const body = JSON.stringify(data);
  const headers = {
    Authorization: 'Bearer <auth_value>',
    'Content-Type': 'application/json; charset=utf-8'
  };
  return await FetchApi.fetchApiResponse<CustomerDto | undefined>(`${API_ENDPOINT}/Customers`, undefined, 'PUT', body, headers);
}

export async function deleteCustomerDto(id: string): Promise<CustomerDto | undefined> {
  if (!id) {
    return Promise.resolve(undefined);
  }
  const headers = {
    Authorization: 'Bearer <auth_value>'
  };
  return await FetchApi.fetchApiResponse<CustomerDto | undefined>(`${API_ENDPOINT}/Customers/${id}`, undefined, 'DELETE', undefined, headers);
}

export async function getCustomerDto(id: string): Promise<CustomerDto | undefined> {
  if (!id) {
    return Promise.resolve(undefined);
  }
  return await FetchApi.fetchApiResponse<CustomerDto | undefined>(`${API_ENDPOINT}/Customers/${id}`, undefined);
}

export async function getOrderDtoList(id: string): Promise<OrderDto[]> {
  if (!id) {
    return Promise.resolve([]);
  }
  return await FetchApi.fetchApiResponse<OrderDto[]>(`${API_ENDPOINT}/Customers/${id}/Orders`, []);
}

export async function getProductDtoList(id: number): Promise<ProductDto[]> {
  if (!id) {
    return Promise.resolve([]);
  }
  return await FetchApi.fetchApiResponse<ProductDto[]>(`${API_ENDPOINT}/Orders/${id}/Products`, []);
}
