export const authService = {  
  async login(username: string, password: string): Promise<string> {  
    try {  
      // Simulate API call  
      await new Promise(resolve => setTimeout(resolve, 1000));  
      
      return "mock-token"; // Simulate successful login  
    } catch (error) {  
      throw new Error("Failed to log in");  
    }  
  },  

  async logout(): Promise<void> {  
    try {  
      // Simulate API call  
      await new Promise(resolve => setTimeout(resolve, 500));  
    } catch (error) {  
      throw new Error("Failed to log out");  
    }  
  },  

  async register(username: string, password: string): Promise<string> {  
    try {  
      // Simulate API call  
      await new Promise(resolve => setTimeout(resolve, 1000));  
      
      return "mock-token"; // Simulate successful registration  
    } catch (error) {  
      throw new Error("Failed to register");  
    }  
  }  
};  
export const authService = {  
  async logout(): Promise<void> {  
    try {  
      // Simulate API call  
      await new Promise(resolve => setTimeout(resolve, 500));  
    } catch (error) {  
      throw new Error("Failed to log out");  
    }  
  },  
};
