import React from 'react';  
import { Box, Typography, Button } from '@mui/material';  
import { useStore } from '../state/store';  

const ShoppingCart: React.FC = () => {  
  const { cart, removeFromCart } = useStore();  

  return (  
    <Box sx={{ p: 2 }}>  
      <Typography variant="h5" gutterBottom>  
        Shopping Cart  
      </Typography>  
      {cart.length === 0 ? (  
        <Typography>Your cart is empty.</Typography>  
      ) : (  
        cart.map((item) => (  
          <Box key={item.id} sx={{ mb: 2 }}>  
            <Typography>{item.title}</Typography>  
            <Typography>${item.price}</Typography>  
            <Button  
              variant="outlined"  
              color="error"  
              onClick={() => removeFromCart(item.id)}  
              sx={{ mt: 1 }}  
            >  
              Remove  
            </Button>  
          </Box>  
        ))  
      )}  
    </Box>  
  );  
};  

export default ShoppingCart;
