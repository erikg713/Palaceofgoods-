import axios from "axios";

export const getProducts = async () => {
  const response = await axios.get("https://api.example.com/products");
  return response.data;
};
