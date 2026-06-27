import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const API_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Sign up user (register)
  const signup = async (name, email, password, address) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Signing up user:', email);
      const response = await axios.post(`${API_URL}/users/signup`, {
        name,
        email,
        password,
        address: address || '123 Luxury Lane, Bengaluru, KA'
      });
      
      const userData = {
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
        address: response.data.user.address,
        tier: response.data.user.tier || 'Standard Member',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('✅ User registered successfully');
      return userData;
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Signup failed';
      setError(errorMsg);
      console.error('❌ Signup error:', errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Logging in user:', email);
      const response = await axios.post(`${API_URL}/users/login`, {
        email,
        password
      });
      
      const userData = {
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
        address: response.data.user.address,
        tier: response.data.user.tier || 'Platinum Member',
        avatar: response.data.user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('✅ User logged in successfully');
      return userData;
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Login failed';
      setError(errorMsg);
      console.error('❌ Login error:', errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update user address
  const updateAddress = async (userId, address) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Updating address for user:', userId);
      const response = await axios.put(`${API_URL}/users/${userId}/address`, {
        address
      });
      
      const updatedUser = {
        ...user,
        address: response.data.user.address
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      console.log('✅ Address updated successfully');
      return updatedUser;
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Update failed';
      setError(errorMsg);
      console.error('❌ Update error:', errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    console.log('✅ User logged out');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup,
      logout, 
      updateAddress,
      isLoggedIn: !!user,
      loading,
      error 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);