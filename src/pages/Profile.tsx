import React from 'react';  
import { Container, Typography, Button } from '@mui/material';  
import { useStore } from '../state/store';  

const Profile: React.FC = () => {  
  const { user, setUser } = useStore();  

  const handleLogout = () => {  
    setUser(null);  
  };  

  return (  
    <Container maxWidth="md" sx={{ mt: 4 }}>  
      <Typography variant="h4" gutterBottom>  
        Profile  
      </Typography>  
      <Typography variant="body1" gutterBottom>  
        Welcome, {user?.username}!  
      </Typography>  
      <Button variant="contained" color="primary" onClick={handleLogout}>  
        Log Out  
      </Button>  
    </Container>  
  );  
};  

export default Profile;
