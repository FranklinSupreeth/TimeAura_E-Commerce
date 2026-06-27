import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { TrendingUp, Users, ShoppingCart, DollarSign, BadgeIndianRupee , AlertCircle } from 'lucide-react';

// Mock Data for Analytics
const salesData = [
  { name: 'Mon', sales: 4000, orders: 24 },
  { name: 'Tue', sales: 3000, orders: 18 },
  { name: 'Wed', sales: 5000, orders: 29 },
  { name: 'Thu', sales: 2780, orders: 15 },
  { name: 'Fri', sales: 6890, orders: 42 },
  { name: 'Sat', sales: 8390, orders: 50 },
  { name: 'Sun', sales: 7490, orders: 45 },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* 1. Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-800">Executive Overview</h1>
        <p className="text-zinc-500 text-sm">Welcome back, Administrator. Here is what's happening today.</p>
      </div>

      {/* 2. Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="₹45,231" grow="+12.5%" icon={<BadgeIndianRupee className="text-emerald-600" />} />
        <StatCard title="Active Orders" value="12" grow="+3" icon={<ShoppingCart className="text-blue-600" />} />
        <StatCard title="Total Users" value="1,240" grow="+180" icon={<Users className="text-purple-600" />} />
        <StatCard title="Low Stock" value="4" grow="Critical" icon={<AlertCircle className="text-red-600" />} isAlert />
      </div>

      {/* 3. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Bar Chart */}
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-zinc-700">Weekly Revenue</h3>
            <TrendingUp size={18} className="text-zinc-400" />
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="sales" fill="#18181b" radius={[4, 4, 0, 0]} barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Volume Line Chart */}
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <h3 className="font-semibold text-zinc-700 mb-6">Order Volume</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                <Line type="monotone" dataKey="orders" stroke="#6366f1" strokeWidth={3} dot={{r: 4, fill: '#6366f1'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. Recent Activity / Orders Table */}
      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-100">
          <h3 className="font-semibold text-zinc-700">Recent Transactions</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 text-zinc-500 uppercase text-[10px] tracking-widest">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {[
              { id: '#ORD-7721', user: 'Alex Rivera', status: 'Delivered', price: '₹12,500' },
              { id: '#ORD-7722', user: 'Sarah Chen', status: 'Processing', price: '₹8,400' },
              { id: '#ORD-7723', user: 'Michael Scott', status: 'Shipped', price: '₹5,400' },
            ].map((order, i) => (
              <tr key={i} className="hover:bg-zinc-50 transition-colors">
                <td className="px-6 py-4 font-medium text-zinc-900">{order.id}</td>
                <td className="px-6 py-4 text-zinc-600">{order.user}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : 
                    order.status === 'Processing' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-zinc-900 font-semibold">{order.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ title, value, grow, icon, isAlert }) => (
  <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">{title}</p>
      <h2 className="text-2xl font-bold text-zinc-900">{value}</h2>
      <p className={`text-xs mt-2 ${isAlert ? 'text-red-500 font-bold' : 'text-emerald-500'}`}>
        {grow} <span className="text-zinc-400 font-normal ml-1">vs last month</span>
      </p>
    </div>
    <div className="p-3 bg-zinc-50 rounded-lg">
      {icon}
    </div>
  </div>
);

export default Dashboard;