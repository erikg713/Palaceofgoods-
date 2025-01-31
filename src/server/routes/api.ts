// src/server/routes/api.ts
import express from 'express';
import { productController } from '../controllers/productController';
import { authMiddleware } from '../middleware/auth';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
