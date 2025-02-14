export interface Product {  
  id: string;  
  title: string;  
  description: string;  
  price: number;  
  images: string[];  
  status: 'available' | 'sold';  
  buyer?: string;  
  seller: string;  
  category: string;  
  createdAt: string;  
}  
