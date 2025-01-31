
// src/utils/piNetwork.ts
import { Pi } from 'pi-sdk';

export const initializePiNetwork = () => {
  const pi = new Pi({
    version: 'v2',
    sandbox: process.env.NODE_ENV !== 'development,
  });

  return pi;
};

export const connectWallet = async () => {
  const pi = initializePiNetwork();
  try {
    const account = await pi.authenticate();
    return account;
  } catch (error) {
    console.error('Failed to connect Pi wallet:', error);
    throw error;
  }
};
