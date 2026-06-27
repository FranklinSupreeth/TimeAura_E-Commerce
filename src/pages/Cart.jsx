import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/format';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, Truck, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();
  const [processingCheckout, setProcessingCheckout] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    setProcessingCheckout(true);
    // Navigate to checkout with cart summary
    navigate('/checkout');
    setProcessingCheckout(false);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 py-20">
        <ShoppingBag size={48} strokeWidth={1} className="text-zinc-300" />
        <h2 className="text-2xl font-serif">Your bag is empty</h2>
        <p className="text-zinc-500 text-sm tracking-widest uppercase">Start your legacy with a new timepiece</p>
        <Link to="/shop" className="bg-black text-white px-8 py-4 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-zinc-800 transition-all">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
      <h1 className="text-4xl font-serif mb-12">Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left: Item List */}
        <div className="lg:col-span-2 space-y-8">
          {cart.map((item) => (
            <div key={item._id || item.id} className="flex gap-6 pb-8 border-b border-zinc-100 items-start">
              <div className="w-24 h-32 bg-zinc-50 flex-shrink-0 rounded-sm overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-[11px] uppercase tracking-widest font-bold text-zinc-900">{item.name}</h3>
                  <p className="text-zinc-500 text-sm font-light mt-1">{item.brand || 'TimeAura'}</p>
                </div>

                <div className="flex items-center gap-6 mt-auto">
                  {/* Price per item */}
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400">Price</p>
                    <p className="text-sm font-medium text-zinc-900">{formatINR(item.price)}</p>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-zinc-200 rounded-sm overflow-hidden">
                    <button 
                      onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)} 
                      className="px-3 py-2 hover:bg-zinc-100 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 py-2 text-sm font-medium border-l border-r border-zinc-200">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)} 
                      className="px-3 py-2 hover:bg-zinc-100 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  
                  {/* Total for this item */}
                  <div className="ml-auto">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400">Total</p>
                    <p className="text-sm font-semibold text-zinc-900">{formatINR(item.price * item.quantity)}</p>
                  </div>

                  {/* Delete button */}
                  <button 
                    onClick={() => removeFromCart(item._id || item.id)} 
                    className="text-zinc-400 hover:text-red-500 transition-colors ml-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-50 p-8 sticky top-32 border border-zinc-100 rounded-sm">
            <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold mb-8">Order Summary</h3>
            
            {/* Items breakdown */}
            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {cart.map((item) => (
                <div key={item._id || item.id} className="flex justify-between text-xs">
                  <span className="text-zinc-600">{item.name} × {item.quantity}</span>
                  <span className="text-zinc-900 font-medium">{formatINR(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-8 border-t border-zinc-200 pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Subtotal</span>
                <span className="text-zinc-900 font-medium">{formatINR(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Insured Shipping</span>
                <span className="text-emerald-600 uppercase text-[10px] font-bold tracking-widest">Complimentary</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Tax</span>
                <span className="text-zinc-900 font-medium">{formatINR(cartTotal * 0.15)}</span>
              </div>
            </div>

            <div className="border-t border-zinc-200 pt-6 mb-8 flex justify-between items-end">
              <span className="text-xs uppercase tracking-widest font-bold">Total</span>
              <span className="text-2xl font-serif text-zinc-900">{formatINR(cartTotal + (cartTotal * 0.15))}</span>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={processingCheckout}
              className="w-full bg-black text-white py-4 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-zinc-800 transition-all disabled:bg-zinc-400 flex items-center justify-center gap-2 group rounded-sm mb-4"
            >
              Proceed to Checkout <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <Link 
              to="/shop" 
              className="block w-full text-center py-3 text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-700 hover:text-black border border-zinc-300 transition-colors rounded-sm"
            >
              Continue Shopping
            </Link>

            {/* Benefits */}
            <div className="mt-8 pt-8 border-t border-zinc-200 space-y-4 text-xs">
              <div className="flex gap-3 items-start">
                <Shield size={16} className="text-zinc-600 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-600">Lifetime Warranty on all watches</span>
              </div>
              <div className="flex gap-3 items-start">
                <Truck size={16} className="text-zinc-600 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-600">Free insured shipping worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;