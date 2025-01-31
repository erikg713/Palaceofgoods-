// Product routes
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);
router.post(
  '/products', 
  authMiddleware, 
  upload.array('images', 5), 
  productController.createProduct
);
router.put(
  '/products/:id', 
  authMiddleware, 
  upload.array('images', 5), 
  productController.updateProduct
);
router.delete('/products/:id', authMiddleware, productController.deleteProduct);

export default router;

