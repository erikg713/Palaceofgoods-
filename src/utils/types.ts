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
