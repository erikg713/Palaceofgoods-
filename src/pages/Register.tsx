import React, { useState } from 'react';  
import { TextField, Button, Typography, Container } from '@mui/material';  
import { useNavigate } from 'react-router-dom';  
import { authService } from '../services/api';  
import { useStore } from '../state/store';  

const Register: React.FC = () => {  
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  const [error, setError] = useState<string | null>(null);  
  const { setUser } = useStore();  
  const navigate = useNavigate();  

  const handleRegister = async () => {  
    try {  
      const token = await authService.register(username, password);  
      setUser({ username, token });  
      navigate('/');  
    } catch (error) {  
      setError("Registration failed");  
    }  
  };  

  return (  
    <Container maxWidth="sm" sx={{ mt: 4 }}>  
      <Typography variant="h4" gutterBottom>  
        Register  
      </Typography>  
      <TextField  
        label="Username"  
        fullWidth  
        margin="normal"  
        value={username}  
        onChange={(e) => setUsername(e.target.value)}  
      />  
      <TextField  
        label="Password"  
        fullWidth  
        margin="normal"  
        type="password"  
        value={password}  
        onChange={(e) => setPassword(e.target.value)}  
      />  
      {error && (  
        <Typography color="error" sx={{ mt: 2 }}>  
          {error}  
        </Typography>  
      )}  
      <Button  
        fullWidth  
        variant="contained"  
        color="primary"  
        onClick={handleRegister}  
        sx={{ mt: 2 }}  
      >  
        Register  
      </Button>  
      <Button  
        fullWidth  
        variant="text"  
        color="primary"  
        onClick={() => navigate('/login')}  
        sx={{ mt: 1 }}  
      >  
        Already have an account? Log In  
      </Button>  
    </Container>  
  );  
};  

export default Register;
