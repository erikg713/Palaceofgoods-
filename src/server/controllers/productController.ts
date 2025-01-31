// src/server/controllers/productController.ts
import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { io } from '../server';
import { cloudinary } from '../services/cloudinary';

export const productController = {
  async getProducts(req: Request, res: Response) {
    try {
      const { 
        category, 
        condition, 
        minPrice, 
        maxPrice, 
        search,
        sort = 'createdAt',
        order = 'desc',
        page = 1,
        limit = 12
      } = req.query;

      const query: any = {};

      if (category) query.category = category;
      if (condition) query.condition = condition;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }

      const skip = (Number(page) - 1) * Number(limit);

      const products = await Product.find(query)
        .sort({ [sort as string]: order })
        .skip(skip)
        .limit(Number(limit))
        .populate('seller', 'username avatar');

      const total = await Product.countDocuments(query);

      res.json({
        products,
        total,
        pages: Math.ceil(total / Number(limit))
      });
    } catch (error) {
      console.error('Failed to get products:', error);
      res.status(500).json({ error: 'Failed to get products' });
    }
  },

  async createProduct(req: Request, res: Response) {
    try {
      const files = req.files as Express.Multer.File[];
      const imageUrls = await Promise.all(
        files.map(file => cloudinary.uploader.upload(file.path))
      );

      const product = await Product.create({
        ...req.body,
        seller: req.user.id,
        images: imageUrls.map(image => image.secure_url)
      });

      await product.populate('seller', 'username avatar');

      // Emit new product event
      io.emit('newProduct', product);

      res.status(201).json(product);
    } catch (error) {
      console.error('Failed to create product:', error);
      res.status(500).json({ error: 'Failed to create product' });
    }
  },

  async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      if (product.seller.toString() !== req.user.id) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      const files = req.files as Express.Multer.File[];
      let imageUrls = product.images;

      if (files?.length) {
        const newImages = await Promise.all(
          files.map(file => cloudinary.uploader.upload(file.path))
        );
        imageUrls = [...imageUrls, ...newImages.map(image => image.secure_url)];
      }

      const allowedUpdates = ['title', 'description', 'price', 'category', 'condition'];
      const updates = Object.keys(req.body).filter(key => allowedUpdates.includes(key));
      const updateData: any = {};
      updates.forEach(key => {
        updateData[key] = req.body[key];
      });
      updateData.images = imageUrls;

      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      ).populate('seller', 'username avatar');

      // Emit product update event
      io.emit('productUpdated', updatedProduct);

      res.json(updatedProduct);
    } catch (error) {
      console.error('Failed to update product:', error);
      res.status(500).json({ error: 'Failed to update product' });
    }
  }
};
