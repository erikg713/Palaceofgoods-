
// src/components/PiAuthButton.tsx
import React from 'react';
import { Pi } from 'pi-sdk';
import { useStore } from '../state/store';
import { authService } from '../services/api';

export const PiAuthButton: React.FC = () => {
  const { setUser } = useStore();

  const handlePiAuth = async () => {
    try {
      const scopes = ['payments', 'username'];
      const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
      
      // Send the auth data to your backend to create/update user
      const { token, user } = await authService.piAuth(auth);
      
      localStorage.setItem('token', token);
      setUser(user);
    } catch (error) {
      console.error('Pi authentication failed:', error);
    }
  };

  const onIncompletePaymentFound = async (payment: any) => {
    // Handle incomplete payment
    console.log('Incomplete payment found:', payment);
  };

  return (
    <button
      onClick={handlePiAuth}
      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
    >
      Sign in with Pi
    </button>
  );
};
