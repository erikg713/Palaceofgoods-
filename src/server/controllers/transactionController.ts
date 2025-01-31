// src/server/controllers/transactionController.ts
import { Request, Response } from 'express';
import { Transaction } from '../models/Transaction';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { PiNetwork } from '../services/piNetwork';

export const transactionController = {
  async initializeTransaction(req: Request, res: Response) {
    try {
      const { productId } = req.body;
      const buyerId = req.user.id;

      const product = await Product.findById(productId).populate('seller');
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      if (product.status !== 'available') {
        return res.status(400).json({ error: 'Product is not available' });
      }

      // Initialize Pi payment
      const payment = await PiNetwork.createPayment({
        amount: product.price,
        memo: `Purchase of ${product.title}`,
        metadata: { productId, buyerId, sellerId: product.seller.id }
      });

      // Create transaction record
      const transaction = await Transaction.create({
        product: productId,
        buyer: buyerId,
        seller: product.seller.id,
        amount: product.price,
        piPaymentId: payment.id
      });

      // Update product status
      product.status = 'pending';
      await product.save();

      res.json({ 
        transactionId: transaction.id,
        paymentId: payment.id,
        approvalUrl: payment.approvalUrl
      });
    } catch (error) {
      console.error('Transaction initialization failed:', error);
      res.status(500).json({ error: 'Failed to initialize transaction' });
    }
  },

  async completeTransaction(req: Request, res: Response) {
    try {
      const { transactionId, paymentId } = req.body;

      const transaction = await Transaction.findById(transactionId)
        .populate('product')
        .populate('buyer')
        .populate('seller');

      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      // Verify payment with Pi Network
      const paymentStatus = await PiNetwork.verifyPayment(paymentId);
      
      if (paymentStatus.verified) {
        // Update transaction status
        transaction.status = 'completed';
        await transaction.save();

        // Update product status
        const product = await Product.findById(transaction.product);
        product.status = 'sold';
        await product.save();

        // Notify users (implementation depends on your notification system)
        await notifyUsers(transaction);

        res.json({ 
          status: 'success',
          message: 'Transaction completed successfully'
        });
      } else {
        transaction.status = 'failed';
        await transaction.save();

        // Revert product status
        const product = await Product.findById(transaction.product);
        product.status = 'available';
        await product.save();

        res.status(400).json({ 
          error: 'Payment verification failed'
        });
      }
    } catch (error) {
      console.error('Transaction completion failed:', error);
      res.status(500).json({ error: 'Failed to complete transaction' });
    }
  }
};
