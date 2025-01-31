// src/server/models/User.ts
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  walletAddress: { 
    type: String, 
    required: true, 
    unique: true 
  },
  avatar: String,
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const User = mongoose.model('User', userSchema);
