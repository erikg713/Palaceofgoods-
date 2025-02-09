import React from 'react';  
import { Container, Typography, Grid } from '@mui/material';  
import ProductCard from '../components/ProductCard';  
import { Product } from '../types';  

const products: Product[] = [  
  {  
    id: "1",  
    title: "Laptop",  
    description: "Powerful laptop for all your needs",  
    price: 999,  
    images: ["https://via.placeholder.com/150"],  
    status: "available",  
    seller: "seller123",  
    category: "electronics",  
    createdAt: "2025-02-09"  
  },  
  {  
    id: "2",  
    title: "Smartphone",  
    description: "Advanced smartphone with great camera",  
    price: 499,  
    images: ["https://via.placeholder.com/150"],  
    status: "available",  
    seller: "seller456",  
    category: "electronics",  
    createdAt: "2025-02-09"  
  }  
];  

const Home: React.FC = () => {  
  return (  
    <Container maxWidth="md" sx={{ mt: 4 }}>  
      <Typography variant="h3" gutterBottom>  
        Welcome to Palace of Goods  
      </Typography>  
      <Grid container spacing={4}>  
        {products.map((product) => (  
          <Grid item key={product.id
