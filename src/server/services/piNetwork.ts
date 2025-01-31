// src/server/services/piNetwork.ts
import axios from 'axios';

export class PiNetwork {
  private static apiKey = process.env.PI_API_KEY;
  private static apiUrl = process.env.PI_API_URL;

  static async createPayment(params: {
    amount: number;
    memo: string;
    metadata: any;
  }) {
    try {
      const response = await axios.post(
        `${this.apiUrl}/payments`,
        {
          amount: params.amount,
          memo: params.memo,
          metadata: params.metadata
        },
        {
          headers: {
            'Authorization': `Key ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Pi Network payment creation failed:', error);
      throw error;
    }
  }

  static async verifyPayment(paymentId: string) {
    try {
      const response = await axios.get(
        `${this.apiUrl}/payments/${paymentId}`,
        {
          headers: {
            'Authorization': `Key ${this.apiKey}`
          }
        }
      );

      return {
        verified: response.data.status === 'completed',
        status: response.data.status
      };
    } catch (error) {
      console.error('Pi Network payment verification failed:', error);
      throw error;
    }
  }
}
