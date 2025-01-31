// src/server/models/Product.ts
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  seller: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  images: [String],
  category: { 
    type: String, 
    required: true 
  },
  condition: { 
    type: String, 
    enum: ['new', 'used'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['available', 'pending', 'sold'], 
    default: 'available' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const Product = mongoose.model('Product', productSchema);

// src/server/models/Transaction.ts
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  buyer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  seller: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed', 'refunded'], 
    default: 'pending' 
  },
  piPaymentId: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const Transaction = mongoose.model('Transaction', transactionSchema);
