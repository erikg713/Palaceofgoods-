export const productService = {  
  async getProduct(id: string): Promise<Product> {  
    try {  
      // Simulate API call  
      await new Promise(resolve => setTimeout(resolve, 1000));  
      
      return {  
        id: "1",  
        title: "Premium Laptop",  
        description: "High-performance laptop with 16GB RAM and 1TB SSD",  
        price: 999,  
        images: ["https://via.placeholder.com/150"],  
        status: "available",  
        seller: "seller123",  
        buyer: undefined,  
        category: "electronics",  
        createdAt: "2025-02-09"  
      };  
    } catch (error) {  
      throw new Error("Failed to fetch product");  
    }  
  },  
