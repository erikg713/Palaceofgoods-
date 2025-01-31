
// src/hooks/usePiPayment.ts
import { useState } from 'react';
import { Pi } from 'pi-sdk';

interface PaymentConfig {
  amount: number;
  memo: string;
  metadata?: Record<string, any>;
}

export const usePiPayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const initiatePayment = async ({ amount, memo, metadata }: PaymentConfig) => {
    setIsProcessing(true);
    try {
      // Create a payment on your backend
      const payment = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, memo, metadata })
      }).then(res => res.json());

      // Request user approval through Pi SDK
      const paymentData = await Pi.createPayment({
        amount: amount.toString(),
        memo,
        metadata,
        paymentId: payment.id
      });

      // Complete the payment on your backend
      const completedPayment = await fetch(`/api/payments/${payment.id}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentData })
      }).then(res => res.json());

      return completedPayment;
    } catch (error) {
      console.error('Payment failed:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  return { initiatePayment, isProcessing };
};
