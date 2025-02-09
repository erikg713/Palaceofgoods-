import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { useStore } from '../state/store';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const { setUser, user } = useStore();
  const navigate = useNavigate();

  if (user) {
    navigate('/profile'); // Redirect if already logged in
    return null; // Return null to prevent further rendering
  }

  const handleLogin = async () => {
    setLoading(true); // Set loading to true
    setError(null); // Clear previous errors

    try {
      const token = await authService.login(username, password);
      setUser({ username, token });
      navigate('/profile');
    } catch (error: any) { // Type the error
      console.error("Login Error:", error); // Log the error for debugging
      setError(error.message || "Invalid username or password"); // More specific error
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>} {/* Display error message */}
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required // Add required attribute
      />
      <TextField
        label="Password"
        fullWidth
        margin="normal"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required // Add required attribute
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{ mt: 2 }}
        disabled={loading} // Disable button while loading
      >
        {loading ? <CircularProgress size={20} color="white" /> : 'Log In'} {/* Loading indicator */}
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
