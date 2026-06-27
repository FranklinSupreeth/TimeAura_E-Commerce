import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, DollarSign, CreditCard } from 'lucide-react';
import { orderService } from '../services/apiService';
import { formatINR, formatDate } from '../utils/format';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await orderService.getOrderById(id);
      setOrder(response.data);
      setSelectedStatus(response.data.status);
      setSelectedPaymentStatus(response.data.paymentStatus);
      setNotes(response.data.notes || '');
      setLoading(false);
    } catch (err) {
      console.error('Error fetching order:', err);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      setUpdatingStatus(true);
      const response = await orderService.updateOrderStatus(id, {
        status: selectedStatus,
        paymentStatus: selectedPaymentStatus,
        notes,
      });
      setOrder(response.data);
      setUpdatingStatus(false);
      alert('Order updated successfully!');
    } catch (err) {
      console.error('Error updating order:', err);
      setUpdatingStatus(false);
      alert('Failed to update order');
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading order details...</div>;
  }

  if (!order) {
    return <div className="text-center py-10 text-red-600">Order not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/orders')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
      >
        <ArrowLeft size={18} /> Back to Orders
      </button>

      {/* Order Header */}
      <div className="bg-white rounded-lg border border-zinc-200 p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-zinc-500 text-sm">Order ID</p>
            <p className="text-2xl font-bold text-zinc-900">{order.orderId}</p>
          </div>
          <div>
            <p className="text-zinc-500 text-sm">Transaction ID</p>
            <p className="font-mono text-lg text-zinc-900 bg-zinc-100 px-4 py-2 rounded inline-block">{order.transactionId}</p>
          </div>
        </div>
      </div>

      {/* Customer & Order Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Info */}
        <div className="bg-white rounded-lg border border-zinc-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-900 mb-4">Customer Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-zinc-500 text-sm">Name</p>
              <p className="text-zinc-900 font-medium">{order.customerName}</p>
            </div>
            <div>
              <p className="text-zinc-500 text-sm">Email</p>
              <p className="text-zinc-900 font-medium break-all">{order.customerEmail}</p>
            </div>
            <div>
              <p className="text-zinc-500 text-sm">Shipping Address</p>
              <p className="text-zinc-900 font-medium">{order.shippingAddress}</p>
            </div>
            <div>
              <p className="text-zinc-500 text-sm">Order Date</p>
              <p className="text-zinc-900 font-medium">{formatDate(order.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg border border-zinc-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-900 mb-4">Order Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-200">
              <span className="text-zinc-600">Subtotal</span>
              <span className="font-medium">{formatINR(order.totalAmount)}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-zinc-200">
              <span className="text-zinc-600">Payment Method</span>
              <span className="font-medium">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-semibold text-zinc-900">Total Amount</span>
              <span className="text-2xl font-bold text-emerald-600">{formatINR(order.totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg border border-zinc-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-zinc-900 mb-4">Order Items</h3>
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-start gap-4 pb-4 border-b border-zinc-100 last:border-b-0">
              {item.image && (
                <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded" />
              )}
              <div className="flex-1">
                <p className="font-semibold text-zinc-900">{item.name}</p>
                <p className="text-sm text-zinc-500">{item.brand}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm text-zinc-600">Qty: {item.quantity}</span>
                  <span className="font-medium">{formatINR(item.price * item.quantity)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Update Section */}
      <div className="bg-white rounded-lg border border-zinc-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-zinc-900 mb-4">Update Order Status</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Order Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Returned">Returned</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Payment Status</label>
              <select
                value={selectedPaymentStatus}
                onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this order..."
              className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="4"
            />
          </div>

          <button
            onClick={handleStatusUpdate}
            disabled={updatingStatus}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {updatingStatus ? 'Updating...' : 'Update Order Status'}
          </button>
        </div>
      </div>

      {/* Estimated Delivery */}
      {order.estimatedDelivery && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="flex items-center gap-2 text-blue-700 font-medium">
            <Clock size={18} />
            Estimated Delivery: {formatDate(order.estimatedDelivery)}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
