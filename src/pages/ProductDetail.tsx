import React, { useEffect, useState } from 'react';  
import { useParams, useNavigate } from 'react-router-dom';  
import { Product } from '../types';  
import { productService } from '../services/api';  
import { processPayment } from '../services/piNetwork';  
import { useStore } from '../state/store';  
import { CircularProgress, Alert, Button, Snackbar, Typography, Box, Container } from '@mui/material'; // Import MUI components  

export const ProductDetail: React.FC = () => {  
  const { id } = useParams<{ id: string }>();  
  const [product, setProduct] = useState<Product | null>(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState<string | null>(null);  
  const [purchaseStatus, setPurchaseStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');  
  const [snackbarOpen, setSnackbarOpen] = useState(false);  
  const { user } = useStore();  
  const navigate = useNavigate();  

  // Fetch product details  
  useEffect(() => {  
    const loadProduct = async () => {  
      setLoading(true);  
      setError(null);  
      try {  
        const data = await productService.getProduct(id!);  
        setProduct(data);  
      } catch (error: any) {  
        console.error('Failed to load product:', error);  
        setError(error.message || 'Failed to load product.');  
      } finally {  
        setLoading(false);  
      }  
    };  

    loadProduct();  
  }, [id]);  

  // Handle purchase  
  const handlePurchase = async () => {  
    if (!user) {  
      navigate('/login');  
      return;  
    }  

    if (!product) return;  

    setPurchaseStatus('processing');  
    try {  
      const payment = await processPayment(product.price, `Purchase: ${product.title}`);  
      if (payment.status === 'completed') {  
        await productService.updateProduct(product.id, { status: 'sold', buyer: user.id });  
        setPurchaseStatus('success');  
        setSnackbarOpen(true);  
        setTimeout(() => navigate('/profile/purchases'), 2000); // Redirect after 2 seconds  
      } else {  
        setPurchaseStatus('error');  
        setSnackbarOpen(true);  
      }  
    } catch (error) {  
      console.error('Purchase failed:', error);  
      setPurchaseStatus('error');  
      setSnackbarOpen(true);  
    }  
  };  

  // Handle snackbar close  
  const handleSnackbarClose = () => {  
    setSnackbarOpen(false);  
  };  

  // Loading state  
  if (loading) {  
    return (  
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">  
        <CircularProgress />  
      </Box>  
    );  
  }  

  // Error state  
  if (error) {  
    return (  
      <Container maxWidth="md" sx={{ mt: 4 }}>  
        <Alert severity="error">{error}</Alert>  
      </Container>  
    );  
  }  

  // Product not found  
  if (!product) {  
    return (  
      <Container maxWidth="md" sx={{ mt: 4 }}>  
        <Typography variant="h6" align="center">  
          Product not found  
        </Typography>  
      </Container>  
    );  
  }  

  return (  
    <Container maxWidth="md" sx={{ mt: 4 }}>  
      <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3, overflow: 'hidden' }}>  
        <img  
          src={product.images[0]}  
          alt={product.title}  
          style={{ width: '100%', height: '400px', objectFit: 'cover' }}  
        />  
        <Box sx={{ p: 4 }}>  
          <Typography variant="h4" gutterBottom>  
            {product.title}  
          </Typography>  
          <Typography variant="body1" color="text.secondary" gutterBottom>  
            {product.description}  
          </Typography>  
          <Typography variant="h6" color="primary" gutterBottom>  
            ${product.price}  
          </Typography>  
          <Button  
            variant="contained"  
            color="primary"  
            onClick={handlePurchase}  
            disabled={!user || purchaseStatus === 'processing'}  
            sx={{ mt: 2 }}  
          >  
            {purchaseStatus === 'processing' ? (  
              <CircularProgress size={24} sx={{ color: 'white' }} />  
            ) : user ? (  
              'Purchase'  
            ) : (  
              'Connect Wallet to Purchase'  
            )}  
          </Button>  
        </Box>  
      </Box>  

      {/* Snackbar for purchase feedback */}  
      <Snackbar  
        open={snackbarOpen}  
        autoHideDuration={6000}  
        onClose={handleSnackbarClose}  
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}  
      >  
        <Alert  
          onClose={handleSnackbarClose}  
          severity={purchaseStatus === 'success' ? 'success' : 'error'}  
          sx={{ width: '100%' }}  
        >  
          {purchaseStatus === 'success'  
            ? 'Purchase successful! Redirecting to your profile...'  
            : 'Purchase failed. Please try again.'}  
        </Alert>  
      </Snackbar>  
    </Container>  
  );  
};
