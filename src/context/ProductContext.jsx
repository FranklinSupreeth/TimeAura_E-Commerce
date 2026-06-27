import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext();

// Use an environment variable for the API URL, falling back to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/products';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch products from MongoDB on load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products from:',  +"/products");
        const res = await axios.get(API_BASE_URL);
        console.log('Products fetched successfully:', res.data);
        // MongoDB returns an array; ensure we handle it
        setProducts(res.data);
        setError(null);
      } catch (err) {
        console.error("Vault Access Error: Could not retrieve collection.", err);
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 2. Add product to MongoDB
  const addProduct = async (productData) => {
    try {
      // Note: We don't send a manual ID; MongoDB generates _id automatically
      const res = await axios.post(API_BASE_URL, productData);
      setProducts((prev) => [res.data, ...prev]);
      return res.data; // Return for optional UI feedback
    } catch (err) {
      console.error("Submission Error: Timepiece could not be vaulted.", err);
      throw err;
    }
  };

  // 3. Delete product from MongoDB
  const deleteProduct = async (id) => {
    try {
      // id here must be the MongoDB _id
      await axios.delete(`${API_BASE_URL}/${id}`);
      setProducts((prev) => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error("Removal Error: Item remains in vault.", err);
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);