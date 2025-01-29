import { login, getProducts } from './api';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Tests', () => {
  it('should log in successfully', async () => {
    const mockResponse = {
      data: {
        token: 'mockToken',
        user: 'mockUser',
        role: 'buyer',
      },
    };
    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    const result = await login('test@example.com', 'password');
    expect(result).toEqual(mockResponse.data);
    expect(mockedAxios.post).toHaveBeenCalledWith('/login', {
      email: 'test@example.com',
      password: 'password',
    });
  });

  it('should fail login with invalid credentials', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Invalid credentials'));

    await expect(login('wrong@example.com', 'wrongpassword')).rejects.toThrow(
      'Failed to log in. Please check your credentials.'
    );
  });

  it('should fetch products successfully', async () => {
    const mockResponse = {
      data: [
        {
          id: 1,
          name: 'Product 1',
          description: 'Description 1',
          price: 100,
          sellerId: 'seller1',
        },
      ],
    };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    const result = await getProducts();
    expect(result).toEqual(mockResponse.data);
    expect(mockedAxios.get).toHaveBeenCalledWith('/products');
  });

  it('should handle error when fetching products', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Server error'));

    await expect(getProducts()).rejects.toThrow('Unable to fetch products. Please try again later.');
  });
});
