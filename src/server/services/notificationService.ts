// src/server/services/notificationService.ts
import { Notification } from '../models/Notification';
import { User } from '../models/User';
import { io } from '../server';

export class NotificationService {
  static async create(params: {
    recipient: string;
    type: string;
    title: string;
    message: string;
    data?: any;
  }) {
    try {
      const notification = await Notification.create(params);
      await notification.populate('recipient');

      // Emit real-time notification
      io.to(`user:${params.recipient}`).emit('notification', notification);

      // Send push notification if user has enabled them
      await this.sendPushNotification(notification);

      return notification;
    } catch (error) {
      console.error('Failed to create notification:', error);
      throw error;
    }
  }

  static async markAsRead(notificationId: string, userId: string) {
    try {
      const notification = await Notification.findOneAndUpdate(
        { _id: notificationId, recipient: userId },
        { read: true },
        { new: true }
      );

      if (!notification) {
        throw new Error('Notification not found');
      }

      return notification;
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      throw error;
    }
  }

  static async getUserNotifications(userId: string, page = 1, limit = 20) {
    try {
      const skip = (page - 1) * limit;

      const notifications = await Notification.find({ recipient: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Notification.countDocuments({ recipient: userId });

      return {
        notifications,
        total,
        pages: Math.ceil(total / limit)
      };
    } catch (error) {
      console.error('Failed to get user notifications:', error);
      throw error;
    }
  }

  private static async sendPushNotification(notification: any) {
    try {
      const user = await User.findById(notification.recipient);
      if (!user?.pushSubscription) return;
      // Implement push notification logic here using web-push or similar library
      // This is just a placeholder for the actual implementation
      console.log('Sending push notification:', {
        subscription: user.pushSubscription,
        title: notification.title,
        body: notification.message
      });
    } catch (error) {
      console.error('Failed to send push notification:', error);
    }
  }
}

// src/server/controllers/searchController.ts
import { Request, Response } from 'express';
import { 
