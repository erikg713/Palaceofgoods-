// src/pages/Auth/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../state/store';
import { authService } from '../../services/api';
import { connectWallet } from '../../utils/piNetwork';
import { toast } from 'react-toastify';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useStore();
  const [loading, setLoading] = useState(false);

  const handlePiLogin = async () => {
    try {
      setLoading(true);
      const account = await connectWallet();
      const response = await authService.login(account.username, account.accessToken);
      setUser(response.user);
      localStorage.setItem('token', response.token);
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome to Palace of Goods</h2>
          <p className="mt-2 text-gray-600">Connect with Pi Network to continue</p>
        </div>

        <button
          onClick={handlePiLogin}
          disabled={loading}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          {loading ? 'Connecting...' : 'Connect with Pi Network'}
        </button>
      </div>
    </div>
  );
};
