// src/services/piNetwork.ts
import { Pi } from 'pi-sdk';

const pi = new Pi({
  apiKey: process.env.REACT_APP_PI_API_KEY,
  version: "2.0"
});

export const initializePiNetwork = async () => {
  try {
    await pi.init({ sandbox: process.env.NODE_ENV !== 'production' });
    return true;
  } catch (error) {
    console.error('Failed to initialize Pi Network:', error);
    return false;
  }
};
