import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // This will be proxied to http://localhost:3001/api
});

export const login = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const submitReview = async (productId: string, rating: number, comment: string) => {
  const response = await api.post('/reviews', { productId, rating, comment });
  return response.data;
};

export default api;
