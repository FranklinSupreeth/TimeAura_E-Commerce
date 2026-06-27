import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Filter } from 'lucide-react';
import { orderService } from '../services/apiService';
import { formatINR, formatDate } from '../utils/format';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderService.getAllOrders();
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setLoading(false);
    }
  };

  const filteredOrders = filter === 'All' ? orders : orders.filter(o => o.status === filter);

  if (loading) {
    return <div className="text-center py-10">Loading orders...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Orders Management</h1>
        <p className="text-zinc-500 text-sm mt-2">Track and manage all customer orders and transactions.</p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg border border-zinc-200 p-4 flex flex-wrap gap-2">
        {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === status
                ? 'bg-zinc-900 text-white'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            {status}
            <span className="ml-2 text-xs opacity-75">
              ({status === 'All' ? orders.length : orders.filter(o => o.status === status).length})
            </span>
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-100">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-zinc-700">Order ID</th>
                <th className="px-6 py-4 text-left font-semibold text-zinc-700">Customer</th>
                <th className="px-6 py-4 text-left font-semibold text-zinc-700">Transaction ID</th>
                <th className="px-6 py-4 text-left font-semibold text-zinc-700">Amount</th>
                <th className="px-6 py-4 text-left font-semibold text-zinc-700">Order Status</th>
                <th className="px-6 py-4 text-left font-semibold text-zinc-700">Payment Status</th>
                <th className="px-6 py-4 text-left font-semibold text-zinc-700">Date</th>
                <th className="px-6 py-4 text-left font-semibold text-zinc-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-zinc-900">{order.orderId}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-zinc-900">{order.customerName}</p>
                        <p className="text-xs text-zinc-500">{order.customerEmail}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs bg-zinc-100 px-3 py-1 rounded">
                        {order.transactionId}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-zinc-900">{formatINR(order.totalAmount)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-zinc-600 text-xs">{formatDate(order.createdAt)}</td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/orders/${order._id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                      >
                        <Eye size={16} /> View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-10 text-center text-zinc-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function getStatusColor(status) {
  const colors = {
    'Pending': 'bg-yellow-100 text-yellow-700',
    'Processing': 'bg-blue-100 text-blue-700',
    'Shipped': 'bg-purple-100 text-purple-700',
    'Delivered': 'bg-green-100 text-green-700',
    'Cancelled': 'bg-red-100 text-red-700',
    'Returned': 'bg-orange-100 text-orange-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
}

function getPaymentStatusColor(status) {
  const colors = {
    'Pending': 'bg-yellow-100 text-yellow-700',
    'Completed': 'bg-green-100 text-green-700',
    'Failed': 'bg-red-100 text-red-700',
    'Refunded': 'bg-orange-100 text-orange-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
}

export default OrdersPage;
