import React, { useEffect, useState } from 'react';
import { TrendingUp, ShoppingCart, DollarSign, AlertCircle } from 'lucide-react';
import { orderService } from '../services/apiService';
import { formatINR } from '../utils/format';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeOrders: 0,
    totalOrders: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderService.getAllOrders();
      const allOrders = response.data;
      setOrders(allOrders);

      // Calculate stats
      const totalRevenue = allOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      const activeOrders = allOrders.filter(o => !['Delivered', 'Cancelled'].includes(o.status)).length;
      const pendingOrders = allOrders.filter(o => o.status === 'Pending').length;

      setStats({
        totalRevenue,
        activeOrders,
        totalOrders: allOrders.length,
        pendingOrders,
      });
      setLoading(false);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Dashboard</h1>
        <p className="text-zinc-500 text-sm mt-2">Welcome back, Administrator. Here's your business overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={formatINR(stats.totalRevenue)}
          icon={<DollarSign className="text-emerald-600" size={24} />}
          trend="+12.5%"
        />
        <StatCard
          title="Active Orders"
          value={stats.activeOrders}
          icon={<ShoppingCart className="text-blue-600" size={24} />}
          trend={`+${stats.activeOrders}`}
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={<TrendingUp className="text-purple-600" size={24} />}
        />
        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon={<AlertCircle className="text-red-600" size={24} />}
          isAlert={stats.pendingOrders > 0}
        />
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-100">
          <h2 className="text-lg font-semibold text-zinc-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-100">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-zinc-700">Order ID</th>
                <th className="px-6 py-4 text-left font-semibold text-zinc-700">Customer</th>
                <th className="px-6 py-4 text-left font-semibold text-zinc-700">Amount</th>
                <th className="px-6 py-4 text-left font-semibold text-zinc-700">Status</th>
                <th className="px-6 py-4 text-left font-semibold text-zinc-700">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {orders.slice(0, 5).map((order) => (
                <tr key={order._id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-zinc-900">{order.orderId}</td>
                  <td className="px-6 py-4 text-zinc-600">{order.customerName}</td>
                  <td className="px-6 py-4 font-medium">{formatINR(order.totalAmount)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getPaymentBadgeClass(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function StatCard({ title, value, icon, trend, isAlert }) {
  return (
    <div className={`bg-white p-6 rounded-lg border border-zinc-200 shadow-sm ${isAlert ? 'border-red-200' : ''}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-zinc-500 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-zinc-900 mt-2">{value}</p>
          {trend && <p className={`text-xs mt-2 ${isAlert ? 'text-red-600' : 'text-emerald-600'} font-semibold`}>{trend}</p>}
        </div>
        <div className="p-3 bg-zinc-50 rounded-lg">{icon}</div>
      </div>
    </div>
  );
}

function getStatusBadgeClass(status) {
  const classes = {
    'Pending': 'bg-yellow-100 text-yellow-700',
    'Processing': 'bg-blue-100 text-blue-700',
    'Shipped': 'bg-purple-100 text-purple-700',
    'Delivered': 'bg-green-100 text-green-700',
    'Cancelled': 'bg-red-100 text-red-700',
    'Returned': 'bg-orange-100 text-orange-700',
  };
  return classes[status] || 'bg-gray-100 text-gray-700';
}

function getPaymentBadgeClass(status) {
  const classes = {
    'Pending': 'bg-yellow-100 text-yellow-700',
    'Completed': 'bg-green-100 text-green-700',
    'Failed': 'bg-red-100 text-red-700',
    'Refunded': 'bg-orange-100 text-orange-700',
  };
  return classes[status] || 'bg-gray-100 text-gray-700';
}

export default Dashboard;
