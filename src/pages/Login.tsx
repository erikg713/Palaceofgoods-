import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { useStore } from '../state/store';
import React, { useState } from 'react';  
import {  
  TextField,  
  Button,  
  Typography,  
  Container,  
  Alert,  
  CircularProgress,  
  InputAdornment,  
  IconButton,  
} from '@mui/material';  
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Icons for password toggle  
import { useNavigate } from 'react-router-dom';  
import { authService } from '../services/api';  
import { useStore } from '../state/store';  

const Login: React.FC = () => {  
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  const [error, setError] = useState<string | null>(null);  
  const [loading, setLoading] = useState(false);  
  const [showPassword, setShowPassword] = useState(false); // Password visibility state  
  const { setUser, user } = useStore();  
  const navigate = useNavigate();  

  // Redirect if already logged in  
  if (user) {  
    navigate('/profile');  
    return null;  
  }  

  const handleLogin = async () => {  
    // Client-side validation  
    if (!username || !password) {  
      setError('Please fill in all fields.');  
      return;  
    }  

    setLoading(true);  
    setError(null);  

    try {  
      const token = await authService.login(username, password);  
      setUser({ username, token });  
      navigate('/profile');  
    } catch (error: any) {  
      console.error('Login Error:', error);  
      setError(  
        error.response?.data?.message || 'Invalid username or password. Please try again.'  
      );  
    } finally {  
      setLoading(false);  
    }  
  };  

  const handleTogglePasswordVisibility = () => {  
    setShowPassword(!showPassword);  
  };  

  return (  
    <Container maxWidth="sm" sx={{ mt: 4 }}>  
      <Typography variant="h4" gutterBottom align="center">  
        Login  
      </Typography>  
      {error && (  
        <Alert severity="error" sx={{ mb: 2 }}>  
          {error}  
        </Alert>  
      )}  
      <TextField  
        label="Username"  
        fullWidth  
        margin="normal"  
        value={username}  
        onChange={(e) => setUsername(e.target.value)}  
        required  
        autoComplete="username"  
        inputProps={{ 'aria-label': 'Username' }}  
      />  
      <TextField  
        label="Password"  
        fullWidth  
        margin="normal"  
        type={showPassword ? 'text' : 'password'}  
        value={password}  
        onChange={(e) => setPassword(e.target.value)}  
        required  
        autoComplete="current-password"  
        inputProps={{ 'aria-label': 'Password' }}  
        InputProps={{  
          endAdornment: (  
            <InputAdornment position="end">  
              <IconButton  
                aria-label="toggle password visibility"  
                onClick={handleTogglePasswordVisibility}  
                edge="end"  
              >  
                {showPassword ? <VisibilityOff /> : <Visibility />}  
              </IconButton>  
            </InputAdornment>  
          ),  
        }}  
      />  
      <Button  
        fullWidth  
        variant="contained"  
        color="primary"  
        onClick={handleLogin}  
        sx={{ mt: 2 }}  
        disabled={loading}  
      >  
        {loading ? <CircularProgress size={20} color="inherit" /> : 'Log In'}  
      </Button>  
      <Button  
        fullWidth  
        variant="text"  
        color="primary"  
        onClick={() => navigate('/register')}  
        sx={{ mt: 1 }}  
      >  
        Don't have an account? Register  
      </Button>  
    </Container>  
  );  
};  

export default Login;  
