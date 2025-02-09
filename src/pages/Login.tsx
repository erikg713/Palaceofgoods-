import React, { useState } from 'react';  
import { TextField, Button, Typography, Container } from '@mui/material';  
import { useNavigate } from 'react-router-dom';  
import { authService } from '../services/api';  
import { useStore } from '../state/store';  

const Login: React.FC = () => {  
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  const [error, setError] = useState<string | null>(null);  
  const { user } = useStore();  
  const navigate = useNavigate();  

  if (user) {  
    navigate('/profile'); // Redirect if already logged in  
  }  

  const handleLogin = async () => {  
    try {  
      const token = await authService.login(username, password);  
      useStore.setState({ user: { username, token } });  
      navigate('/profile');  
    } catch (error) {  
      setError("Invalid username or password");  
    }  
  };  

  return (  
    // ... (same as before)  
  );  
};  

export default Login;
import React, { useState } from 'react';  
import { TextField, Button, Typography, Container } from '@mui/material';  
import { useNavigate } from 'react-router-dom';  
import { authService } from '../services/api';  
import { useStore } from '../state/store';  

const Login: React.FC = () => {  
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  const [error, setError] = useState<string | null>(null);  
  const { setUser } = useStore();  
  const navigate = useNavigate();  

  const handleLogin = async () => {  
    try {  
      const token = await authService.login(username, password);  
      setUser({ username, token });  
      navigate('/');  
    } catch (error) {  
      setError("Invalid username or password");  
    }  
  };  

  return (  
    <Container maxWidth="sm" sx={{ mt: 4 }}>  
      <Typography variant="h4" gutterBottom>  
        Login  
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
        onClick={handleLogin}  
        sx={{ mt: 2 }}  
      >  
        Log In  
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
