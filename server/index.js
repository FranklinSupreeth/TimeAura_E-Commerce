const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const paymentRoutes = require('./routes/payment');
const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');

// Middleware
app.use(express.json());
app.use(cors());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Payment Routes
app.use('/api/payment', paymentRoutes);

// MongoDB Connection with detailed logging
const connectDB = async () => {
  try {
    console.log("🔄 Attempting to connect to MongoDB...");
    console.log("Environment:", process.env.NODE_ENV || 'development');
    console.log("Port:", process.env.PORT || 5000);
    
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log("✅ Connected to TimeAura Vault (MongoDB)");
  } catch (err) {
    console.error("❌ Vault Connection Error:", err.message);
    console.warn("⚠️  Server will continue to run in offline mode");
  }
};

connectDB();

// Basic Route
app.get('/', (req, res) => {
  res.json({ 
    message: 'TimeAura API is Operational',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({ 
      status: 'ok',
      database: mongoStatus,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: 'Health check failed' });
  }
});

// Products Route - GET
app.get('/api/products', async (req, res) => {
  try {
    console.log('📦 Fetching all products...');
    const products = await Product.find();
    console.log(`✅ Found ${products.length} products`);
    res.json(products);
  } catch (err) {
    console.error('❌ Error fetching products:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Add Product Route - POST
app.post('/api/products', async (req, res) => {
  try {
    console.log('➕ Adding new product:', req.body.name);
    
    // Validation
    if (!req.body.name || !req.body.price || !req.body.category) {
      return res.status(400).json({ error: 'Missing required fields: name, price, category' });
    }
    
    const newProduct = new Product(req.body);
    await newProduct.save();
    
    console.log(`✅ Product added successfully: ${newProduct._id}`);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('❌ Error adding product:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// Delete Product Route - DELETE
app.delete('/api/products/:id', async (req, res) => {
  try {
    console.log('🗑️ Deleting product:', req.params.id);
    
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      console.warn('⚠️ Product not found:', req.params.id);
      return res.status(404).json({ error: 'Product not found' });
    }
    
    console.log(`✅ Product deleted: ${req.params.id}`);
    res.json({ message: 'Product deleted successfully', product });
  } catch (err) {
    console.error('❌ Error deleting product:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ==================== USER ROUTES ====================

// User Signup Route - POST
app.post('/api/users/signup', async (req, res) => {
  try {
    console.log('👤 New user signup attempt:', req.body.email);
    
    const { name, email, password, address } = req.body;
    
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields: name, email, password' });
    }
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    const newUser = new User({
      name,
      email,
      password, // Note: In production, hash the password with bcryptjs
      address: address || '123 Luxury Lane, Bengaluru, KA',
      tier: 'Standard Member'
    });
    
    await newUser.save();
    
    console.log(`✅ User registered successfully: ${newUser._id}`);
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        address: newUser.address,
        tier: newUser.tier
      }
    });
  } catch (err) {
    console.error('❌ Error during signup:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// User Login Route - POST
app.post('/api/users/login', async (req, res) => {
  try {
    console.log('🔐 User login attempt:', req.body.email);
    
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Simple password check (in production, use bcryptjs.compare())
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    
    console.log(`✅ User logged in successfully: ${user._id}`);
    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        tier: user.tier,
        avatar: user.avatar
      }
    });
  } catch (err) {
    console.error('❌ Error during login:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get User Profile - GET
app.get('/api/users/:id', async (req, res) => {
  try {
    console.log('📋 Fetching user profile:', req.params.id);
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        tier: user.tier,
        avatar: user.avatar,
        memberSince: user.memberSince
      }
    });
  } catch (err) {
    console.error('❌ Error fetching user:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Update User Address - PUT
app.put('/api/users/:id/address', async (req, res) => {
  try {
    console.log('📮 Updating user address:', req.params.id);
    
    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { address },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    console.log(`✅ Address updated for user: ${req.params.id}`);
    res.json({
      message: 'Address updated successfully',
      user: {
        id: user._id,
        name: user.name,
        address: user.address
      }
    });
  } catch (err) {
    console.error('❌ Error updating address:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ==================== ORDER ROUTES ====================

// Get All Orders - GET
app.get('/api/orders', async (req, res) => {
  try {
    console.log('📦 Fetching all orders...');
    const orders = await Order.find().populate('userId', 'name email').sort({ createdAt: -1 });
    console.log(`✅ Found ${orders.length} orders`);
    res.json(orders);
  } catch (err) {
    console.error('❌ Error fetching orders:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get Orders by Customer Email - GET (must be before /:id route)
app.get('/api/orders/customer/:email', async (req, res) => {
  try {
    console.log('📨 Fetching orders for customer email:', req.params.email);
    const orders = await Order.find({ customerEmail: req.params.email }).sort({ createdAt: -1 });
    console.log(`✅ Found ${orders.length} orders for ${req.params.email}`);
    res.json(orders);
  } catch (err) {
    console.error('❌ Error fetching customer orders:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get Single Order - GET
app.get('/api/orders/:id', async (req, res) => {
  try {
    console.log('📋 Fetching order:', req.params.id);
    const order = await Order.findById(req.params.id).populate('userId', 'name email');
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (err) {
    console.error('❌ Error fetching order:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Create New Order - POST
app.post('/api/orders', async (req, res) => {
  try {
    console.log('➕ Creating new order...');
    
    const { userId, customerName, customerEmail, items, totalAmount, shippingAddress, paymentMethod, transactionId, razorpayOrderId, paymentStatus, status, phone } = req.body;
    
    if (!customerName || !customerEmail || !items || !totalAmount) {
      return res.status(400).json({ error: 'Missing required fields: customerName, customerEmail, items, totalAmount' });
    }
    
    const newOrder = new Order({
      userId: userId || null, // Allow guest checkout
      customerName,
      customerEmail,
      phone,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod: paymentMethod || 'Credit Card',
      transactionId: transactionId || `TXN-${Date.now()}`,
      razorpayOrderId: razorpayOrderId || null,
      paymentStatus: paymentStatus || 'Pending',
      status: status || 'Pending',
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days from now
    });
    
    await newOrder.save();
    
    console.log(`✅ Order created successfully: ${newOrder._id}`);
    res.status(201).json(newOrder);
  } catch (err) {
    console.error('❌ Error creating order:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// Update Order Status - PUT
app.put('/api/orders/:id/status', async (req, res) => {
  try {
    console.log('🔄 Updating order status:', req.params.id);
    
    const { status, paymentStatus, notes } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, paymentStatus, notes },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    console.log(`✅ Order status updated: ${req.params.id}`);
    res.json(order);
  } catch (err) {
    console.error('❌ Error updating order:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get Orders by User ID - GET
app.get('/api/users/:userId/orders', async (req, res) => {
  try {
    console.log('📦 Fetching orders for user:', req.params.userId);
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    
    console.log(`✅ Found ${orders.length} orders for user`);
    res.json(orders);
  } catch (err) {
    console.error('❌ Error fetching user orders:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ====================================================

// 404 Handler
app.use((req, res) => {
  console.warn(`⚠️ Not found: ${req.method} ${req.path}`);
  res.status(404).json({ error: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   TimeAura Server Running              ║
║   Environment: ${NODE_ENV.toUpperCase().padEnd(23)}║
║   Port: ${PORT.toString().padEnd(33)}║
║   URL: http://localhost:${PORT}`.padEnd(34) + '║\n╚════════════════════════════════════════╝'
  );
});