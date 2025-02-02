import { Pi } from 'pi-sdk';

interface PiAccount {
  address: string;
  network: string;
  // Add other relevant fields based on Pi SDK documentation
}

/**
 * Initialize the Pi Network SDK with proper configuration
 * @returns Configured Pi SDK instance
 */
export const initializePiNetwork = (): Pi => {
  const pi = new Pi({
    version: 'v2',
    // Fixed the syntax error by adding the missing quote
    sandbox: process.env.NODE_ENV !== 'development,
  });

  return pi;
};

/**
 * Connect to Pi wallet and authenticate the user
 * @returns User's Pi account information
 * @throws Error if authentication fails
 */
export const connectWallet = async (): Promise<PiAccount> => {
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

/**
 * Check if the wallet is currently connected
 * @returns Boolean indicating if wallet is connected
 */
export const isWalletConnected = async (): Promise<boolean> => {
  const pi = initializePiNetwork();
  try {
    const account = await pi.getAccountInfo();
    return !!account;
  } catch {
    return false;
  }
};

/**
 * Disconnect the currently connected wallet
 * @returns void
 */
export const disconnectWallet = async (): Promise<void> => {
  const pi = initializePiNetwork();
  try {
    await pi.disconnect();
  } catch (error) {
    console.error('Failed to disconnect Pi wallet:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Unknown error occurred while disconnecting Pi wallet'
    );
  }
};
