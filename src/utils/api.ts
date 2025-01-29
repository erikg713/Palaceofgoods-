import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const login = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export default api;
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  sellerId: string;
}
export interface LoginResponse {
  token: string;
  user: string;
  role: 'buyer' | 'seller' | 'admin';
}
import axios from 'axios';
import { Product, LoginResponse } from './types';

const api = axios.create({
  baseURL: '/api',
});

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/login', { email, password });
  return response.data;
};

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('/products');
  return response.data;
};

export default api;
