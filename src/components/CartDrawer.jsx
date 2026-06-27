import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2 } from 'lucide-react';
import { formatINR } from '../utils/format';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, cartTotal } = useCart();

  return (
    <div className={`fixed inset-0 z-[200] ${isOpen ? 'visible' : 'invisible'}`}>
      {/* Dark Overlay */}
      <div className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      
      {/* Drawer */}
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-[12px] uppercase tracking-[0.3em] font-bold">Your Bag</h2>
            <button onClick={onClose}><X size={20} /></button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-8">
            {cart.length === 0 ? (
              <p className="text-zinc-400 text-sm italic">Your bag is currently empty.</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-6">
                  <div className="w-20 h-24 bg-zinc-100">
                    <img src={item.image} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="text-[10px] uppercase tracking-widest font-bold">{item.name}</h4>
                    <p className="text-zinc-500 text-xs">{item.quantity} × {formatINR(item.price)}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 pt-2"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-zinc-100 pt-8 mt-auto">
            <div className="flex justify-between mb-6">
              <span className="text-[10px] uppercase tracking-widest text-zinc-400">Total</span>
              <span className="font-serif text-xl">{formatINR(cartTotal)}</span>
            </div>
            <button className="w-full bg-black text-white py-5 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-zinc-800 transition-colors">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;