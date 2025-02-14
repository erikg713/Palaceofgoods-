import React from 'react';  
import { Typography, Button, Container } from '@mui/material';  
import { Link } from 'react-router-dom';  

const NotFound: React.FC = () => {  
  return (  
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>  
      <Typography variant="h3" gutterBottom>  
        404 - Page Not Found  
      </Typography>  
      <Typography variant="body1" gutterBottom>  
        The page you are looking for does not exist.  
      </Typography>  
      <Button variant="contained" color="primary" component={Link} to="/">  
        Go Home  
      </Button>  
    </Container>  
  );  
};  

export default NotFound;
