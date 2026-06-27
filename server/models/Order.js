const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  phone: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      price: Number,
      quantity: { type: Number, default: 1 },
      image: String,
      brand: String
    }
  ],
  totalAmount: { type: Number, required: true },
  shippingAddress: String,
  paymentMethod: { type: String, default: 'Credit Card' },
  transactionId: String,
  razorpayOrderId: String,
  paymentId: String,
  paymentStatus: { type: String, default: 'Pending' },
  status: { type: String, default: 'Pending' },
  estimatedDelivery: Date,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);