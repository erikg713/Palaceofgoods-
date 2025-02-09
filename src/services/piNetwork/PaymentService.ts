export const processPayment = async (amount: number, description: string): Promise<{ status: string }> => {  
  try {  
    // Simulate payment processing  
    await new Promise(resolve => setTimeout(resolve, 1000));  
    
    return {  
      status: "completed"  
    };  
  } catch (error) {  
    throw new Error("Payment processing failed");  
  }  
};  
