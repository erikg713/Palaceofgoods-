// src/types/index.ts
export interface User {
  id: string;
  username: string;
  walletAddress: string;
  email: string;
  avatar?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  seller: User;
  images: string[];
  category: string;
  condition: 'new' | 'used';
  createdAt: Date;
  status: 'available' | 'sold' | 'pending';
}
