import axios, { AxiosError } from 'axios';  

const API_BASE_URL = 'https://your-api.backend';  

const api = axios.create({  
  baseURL: API_BASE_URL,  
  headers: {  
    'Content-Type': 'application/json',  
  },  
});  

export const productService = {  
  async getProduct(id: string) {  
    try {  
      const response = await api.get(`/products/${id}`);  
      return response.data;  
    } catch (error: AxiosError) {  
      throw new Error(error.message);  
    }  
  },  

  async getProducts() {  
    try {  
      const response = await api.get('/products');  
      return response.data;  
    } catch (error: AxiosError) {  
      throw new Error(error.message);  
    }  
  },  

  async updateProduct(id: string, updates: Partial<Product>) {  
    try {  
      const response = await api.patch(`/products/${id}`, updates);  
      return response.data;  
    } catch (error: AxiosError) {  
      throw new Error(error.message);  
    }  
  },  
};  

export default api;  
