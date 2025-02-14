import { Pi } from "pi-sdk";

const appId = "your-pi-app-id"; // Replace with your Pi App ID

Pi.init({ version: "2.0", sandbox: true }); // Set sandbox to false for Mainnet

export const createPiPayment = async (amount: number, memo: string) => {
  try {
    const payment = await Pi.createPayment({
      amount,
      memo,
      metadata: { type: "product_purchase" },
      callbacks: {
        onReadyForServerApproval: (paymentId) => {
          console.log("Payment ready for server approval:", paymentId);
        },
        onPending: (paymentId) => {
          console.log("Payment pending:", paymentId);
        },
        onCompleted: (paymentId) => {
          console.log("Payment completed:", paymentId);
        },
        onCancelled: (paymentId) => {
          console.log("Payment cancelled:", paymentId);
        },
        onError: (error) => {
          console.error("Payment error:", error);
        },
      },
    });

    return payment;
  } catch (error) {
    console.error("Payment failed:", error);
    return null;
  }
};
