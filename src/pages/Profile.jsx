import React, { useState, useRef, useEffect } from 'react';
import { User, Mail, Shield, LogOut, ArrowRight, Camera, MapPin, Package, CreditCard, CheckCircle, Clock, Truck, AlertCircle, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { formatINR } from '../utils/format';
import axios from 'axios';
import watchBg from '../assets/watch_bg.jpg';

const API_BASE_URL = import.meta.env.VITE_API_URL?.replace('/products', '') || 'http://localhost:5000/api';

const Profile = () => {
  const { user: authUser, isLoggedIn, signup, login, logout, updateAddress, loading, error } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', address: '123 Luxury Lane, Bengaluru, KA'
  });

  const [editAddress, setEditAddress] = useState(authUser?.address || '123 Luxury Lane, Bengaluru, KA');

  // Fetch orders when user is logged in
  useEffect(() => {
    if (isLoggedIn && authUser?.email) {
      fetchOrders();
    }
  }, [isLoggedIn, authUser?.email]);

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);
      const response = await axios.get(`${API_BASE_URL}/orders/customer/${authUser.email}`);
      setOrders(response.data);
      console.log('Orders fetched:', response.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    if (authUser?.address) {
      setEditAddress(authUser.address);
    }
  }, [authUser?.address]);

  const handleSaveAddress = async () => {
    try {
      await updateAddress(authUser.id, editAddress);
      setIsEditingAddress(false);
    } catch (err) {
      console.error('Error updating address:', err.message);
      alert('Failed to update address');
    }
  };

  const handleCancelEdit = () => {
    setEditAddress(authUser?.address || '123 Luxury Lane, Bengaluru, KA');
    setIsEditingAddress(false);
  };

  // Random Luxury Avatars
  const avatars = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Aria",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe"
  ];
  const [currentAvatar, setCurrentAvatar] = useState(avatars[0]);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        // Sign up new user
        await signup(formData.name, formData.email, formData.password, formData.address);
      } else {
        // Login existing user
        await login(formData.email, formData.password);
      }
      // Form will be cleared after successful auth (user will be redirected)
      setFormData({ name: '', email: '', password: '', address: '123 Luxury Lane, Bengaluru, KA' });
    } catch (err) {
      console.error('Auth error:', err.message);
      alert(error || 'Authentication failed');
    }
  };

  const handleAvatarClick = () => fileInputRef.current.click();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-black">
        {/* Dynamic Watch Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${watchBg})`,
            animation: 'subtle-zoom 20s ease-in-out infinite'
          }}
        />
        
        {/* Dark Overlay for Better Text Contrast */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        
        {/* Hover Card Interaction */}
        <div className="group relative max-w-md w-full z-10">
          <div className="absolute -inset-1 bg-gradient-to-r from-zinc-200 to-zinc-100 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative bg-white border border-zinc-100 p-10 rounded-xl shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-serif tracking-tight mb-2">
                {isSignup ? 'Begin Your Legacy' : 'Private Entrance'}
              </h1>
              <p className="text-zinc-400 text-[9px] uppercase tracking-[0.4em]">TimeAura Vault Access</p>
            </div>

            <form onSubmit={handleAuth} className="space-y-6">
              {isSignup && (
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="w-full bg-zinc-50 border-none px-4 py-3 text-sm focus:ring-1 focus:ring-black transition-all" />
                </div>
              )}
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold">Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required className="w-full bg-zinc-50 border-none px-4 py-3 text-sm focus:ring-1 focus:ring-black transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold">Password</label>
                <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required className="w-full bg-zinc-50 border-none px-4 py-3 text-sm focus:ring-1 focus:ring-black transition-all" />
              </div>

              {error && <p className="text-red-500 text-[10px] text-center">{error}</p>}

              <button disabled={loading} className="w-full bg-zinc-900 text-white py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-black transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50">
                {loading ? 'Processing...' : (isSignup ? 'Create Account' : 'Authenticate')} <ArrowRight size={14} />
              </button>
            </form>

            <button onClick={() => setIsSignup(!isSignup)} className="w-full mt-8 text-[9px] uppercase tracking-widest text-zinc-400 hover:text-black transition-colors italic">
              {isSignup ? 'Already registered? Sign In' : 'New Collector? Create Account'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left: Profile Information */}
        <div className="lg:col-span-4 space-y-8">
          <div className="relative w-32 h-32 mx-auto lg:mx-0 group cursor-pointer" onClick={handleAvatarClick}>
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
              <Camera className="text-white" size={24} />
            </div>
            <img src={authUser?.avatar || currentAvatar} alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-zinc-50 shadow-xl" />
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-serif text-zinc-900">{authUser?.name}</h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-600 font-bold mt-1 flex items-center justify-center lg:justify-start gap-2">
              <Shield size={12} /> {authUser?.tier}
            </p>
          </div>

          <button onClick={() => setIsEditingAddress(true)} className="w-full flex items-center justify-center gap-2 p-3 text-[10px] uppercase tracking-widest font-bold text-zinc-900 bg-zinc-50 rounded-lg border border-zinc-200 hover:bg-zinc-100 transition-all"><MapPin size={16}/> Manage Address</button>

          <nav className="space-y-2 border-t border-zinc-100 pt-8">
            <button className="w-full flex items-center gap-4 p-3 text-[10px] uppercase tracking-widest font-bold text-zinc-900 bg-zinc-50 rounded-lg"><Package size={16}/> Orders</button>
            <button onClick={logout} className="w-full flex items-center gap-4 p-3 text-[10px] uppercase tracking-widest font-bold text-red-400 hover:bg-red-50 transition-all"><LogOut size={16}/> Logout</button>
          </nav>
        </div>

        {/* Right: Management Content */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Shipping Address Section */}
          <section>
            <div className="flex justify-between items-end mb-6">
              <h3 className="text-[11px] uppercase tracking-[0.4em] font-bold text-zinc-400">Shipping Destination</h3>
              {!isEditingAddress && (
                <button onClick={() => setIsEditingAddress(true)} className="text-[10px] uppercase tracking-widest underline underline-offset-4 font-bold">Edit Address</button>
              )}
            </div>
            
            {!isEditingAddress ? (
              <div className="p-8 border border-zinc-100 rounded-xl bg-white shadow-sm flex items-start gap-4">
                <MapPin className="text-zinc-300 mt-1" size={20} />
                <div>
                  <p className="text-sm font-medium text-zinc-900">Primary Residence</p>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed uppercase tracking-wider">{authUser?.address}</p>
                </div>
              </div>
            ) : (
              <div className="p-8 border border-zinc-100 rounded-xl bg-white shadow-sm space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold block mb-3">Edit Your Address</label>
                  <textarea 
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 text-sm focus:ring-1 focus:ring-black focus:border-transparent transition-all rounded-lg resize-none"
                    rows="3"
                    placeholder="Enter your shipping address"
                  />
                </div>
                <div className="flex gap-3 justify-end pt-4">
                  <button 
                    onClick={handleCancelEdit}
                    className="px-6 py-2 text-[10px] uppercase tracking-widest font-bold text-zinc-600 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveAddress}
                    className="px-6 py-2 text-[10px] uppercase tracking-widest font-bold text-white bg-zinc-900 rounded-lg hover:bg-black transition-all"
                  >
                    Save Address
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Order History Section */}
          <section>
            <h3 className="text-[11px] uppercase tracking-[0.4em] font-bold text-zinc-400 mb-6">Order History</h3>
            
            {ordersLoading ? (
              <div className="text-center py-10">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">Loading orders...</p>
              </div>
            ) : orders && orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="group flex items-center gap-6 p-4 border border-zinc-100 rounded-xl hover:border-zinc-300 transition-all">
                    {/* First Item Image */}
                    <div className="w-20 h-20 bg-zinc-50 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={order.items?.[0]?.image || 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80'} 
                        alt={order.items?.[0]?.name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1">Order #{order._id?.slice(-6).toUpperCase() || 'N/A'}</p>
                      <h4 className="text-sm font-bold uppercase tracking-widest truncate">
                        {order.items?.[0]?.name || 'Order'}
                        {order.items?.length > 1 && ` +${order.items.length - 1}`}
                      </h4>
                      <p className="text-xs text-zinc-500 mt-1">
                        {new Date(order.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-serif font-bold">{formatINR(order.totalAmount)}</p>
                      <div className="mt-2 flex flex-col gap-2">
                        <span className={`inline-block px-3 py-1 text-[8px] uppercase tracking-widest font-bold rounded-full ${
                          order.paymentStatus === 'Completed' 
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-yellow-50 text-yellow-600'
                        }`}>
                          {order.paymentStatus || 'Pending'}
                        </span>
                        <button 
                          onClick={() => setSelectedOrder(order)}
                          className="px-3 py-1 bg-black text-white text-[8px] uppercase tracking-widest font-bold rounded hover:bg-zinc-800 transition-all"
                        >
                          Check Status
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 border-2 border-dashed border-zinc-100 rounded-xl">
                <Package className="text-zinc-300 mx-auto mb-3" size={32} />
                <p className="text-[10px] uppercase tracking-widest text-zinc-300">No orders yet</p>
                <p className="text-[9px] text-zinc-400 mt-2">Complete a purchase to see your orders here</p>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Order Status Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-zinc-200 p-6 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-serif text-zinc-900">Order Details</h2>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">Order #{selectedOrder._id?.slice(-6).toUpperCase()}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-zinc-100 rounded transition-all"
              >
                <X size={20} className="text-zinc-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Order Status Timeline */}
              <div className="bg-zinc-50 p-6 rounded-lg border border-zinc-200">
                <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-zinc-900 mb-4">Delivery Status</h3>
                <div className="space-y-4">
                  {/* Payment Status */}
                  <div className="flex gap-4 items-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      selectedOrder.paymentStatus === 'Completed' 
                        ? 'bg-emerald-100' 
                        : 'bg-yellow-100'
                    }`}>
                      {selectedOrder.paymentStatus === 'Completed' ? (
                        <CheckCircle size={16} className="text-emerald-600" />
                      ) : (
                        <Clock size={16} className="text-yellow-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-zinc-900">Payment</p>
                      <p className="text-xs text-zinc-600">
                        {selectedOrder.paymentStatus === 'Completed' 
                          ? 'Payment received and confirmed' 
                          : 'Awaiting payment confirmation'}
                      </p>
                      <p className="text-[10px] text-zinc-500 mt-1">
                        {new Date(selectedOrder.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Processing Status */}
                  <div className="flex gap-4 items-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      selectedOrder.status === 'Processing' || selectedOrder.status === 'Shipped' || selectedOrder.status === 'Delivered' 
                        ? 'bg-blue-100' 
                        : 'bg-zinc-200'
                    }`}>
                      <AlertCircle size={16} className={`${
                        selectedOrder.status === 'Processing' || selectedOrder.status === 'Shipped' || selectedOrder.status === 'Delivered'
                          ? 'text-blue-600'
                          : 'text-zinc-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-zinc-900">Processing</p>
                      <p className="text-xs text-zinc-600">
                        {selectedOrder.status === 'Processing' 
                          ? 'Order is being prepared for shipment' 
                          : selectedOrder.status === 'Shipped' || selectedOrder.status === 'Delivered'
                          ? 'Order has been processed'
                          : 'Awaiting processing'}
                      </p>
                    </div>
                  </div>

                  {/* Shipping Status */}
                  <div className="flex gap-4 items-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      selectedOrder.status === 'Shipped' || selectedOrder.status === 'Delivered'
                        ? 'bg-blue-100' 
                        : 'bg-zinc-200'
                    }`}>
                      <Truck size={16} className={`${
                        selectedOrder.status === 'Shipped' || selectedOrder.status === 'Delivered'
                          ? 'text-blue-600'
                          : 'text-zinc-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-zinc-900">Shipping</p>
                      <p className="text-xs text-zinc-600">
                        {selectedOrder.status === 'Shipped' 
                          ? 'Order is on its way to you' 
                          : selectedOrder.status === 'Delivered'
                          ? 'Order has been delivered'
                          : 'Awaiting shipment'}
                      </p>
                      {selectedOrder.estimatedDelivery && (
                        <p className="text-[10px] text-zinc-500 mt-1">
                          Estimated delivery: {new Date(selectedOrder.estimatedDelivery).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric'
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Information */}
              <div className="bg-zinc-50 p-6 rounded-lg border border-zinc-200">
                <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-zinc-900 mb-4">Order Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Order ID</p>
                    <p className="font-mono text-zinc-900">{selectedOrder._id?.slice(-8)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Transaction</p>
                    <p className="font-mono text-zinc-900 truncate">{selectedOrder.transactionId?.slice(-8) || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Payment Method</p>
                    <p className="text-zinc-900">{selectedOrder.paymentMethod || 'Credit Card'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Order Total</p>
                    <p className="text-zinc-900 font-bold">{formatINR(selectedOrder.totalAmount)}</p>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="bg-zinc-50 p-6 rounded-lg border border-zinc-200">
                <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-zinc-900 mb-4">Items in Order</h3>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start p-3 bg-white rounded border border-zinc-100">
                      <div>
                        <p className="text-sm font-medium text-zinc-900">{item.name}</p>
                        <p className="text-xs text-zinc-500">{item.brand || 'TimeAura'}</p>
                        <p className="text-[10px] text-zinc-600 mt-1">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-zinc-900">{formatINR(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-zinc-50 p-6 rounded-lg border border-zinc-200">
                <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-zinc-900 mb-4">Shipping Address</h3>
                <div className="flex gap-4">
                  <MapPin className="text-zinc-400 flex-shrink-0 mt-1" size={18} />
                  <p className="text-sm text-zinc-700 leading-relaxed">{selectedOrder.shippingAddress || 'Address not provided'}</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-zinc-50 p-6 rounded-lg border border-zinc-200">
                <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-zinc-900 mb-4">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-zinc-400" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-zinc-600">Customer Name</p>
                      <p className="text-sm text-zinc-900">{selectedOrder.customerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-zinc-400" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-zinc-600">Email</p>
                      <p className="text-sm text-zinc-900">{selectedOrder.customerEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard size={16} className="text-zinc-400" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-zinc-600">Phone</p>
                      <p className="text-sm text-zinc-900">{selectedOrder.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 px-6 py-3 text-[10px] uppercase tracking-widest font-bold text-zinc-900 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;