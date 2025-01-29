import axios from 'axios';
import { Product, LoginResponse } from './types';

const api = axios.create({
  baseURL: '/api',
});

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/login', { email, password });
    return response.data;
  } catch (error: any) {
    console.error('Login failed:', error.response?.data || error.message);
    throw new Error('Failed to log in. Please check your credentials.');
  }
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>('/products');
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch products:', error.response?.data || error.message);
    throw new Error('Unable to fetch products. Please try again later.');
  }
};

export default api;
