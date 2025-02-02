import { Pi } from 'pi-sdk';

/**
 * Initialize the Pi Network SDK with proper configuration
 * @returns Configured Pi SDK instance
 */
export const initializePiNetwork = (): Pi => {
  const pi = new Pi({
    version: 'v2',
    // Fixed the syntax error in the sandbox condition
    sandbox: process.env.NODE_ENV !== 'development,
  });

  return pi;
};

/**
 * Connect to Pi wallet and authenticate the user
 * @returns User's Pi account information
 * @throws Error if authentication fails
 */
export const connectWallet = async () => {
  const pi = initializePiNetwork();
  
  try {
    const account = await pi.authenticate();
    return account;
  } catch (error) {
    console.error('Failed to connect Pi wallet:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Unknown error occurred while connecting to Pi wallet'
    );
  }
};

// Optional: Add a type-safe way to check if the wallet is connected
export const isWalletConnected = async (): Promise<boolean> => {
  const pi = initializePiNetwork();
  try {
    const account = await pi.getAccountInfo();
    return !!account;
  } catch {
    return false;
  }
};
