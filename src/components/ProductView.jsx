import React from 'react';
import { X, Shield, Clock, Award, ShoppingBag } from 'lucide-react';
import { formatINR } from '../utils/format';
import { useCart } from '../context/CartContext';

const ProductView = ({ product, onClose }) => {
  const { addToCart } = useCart();
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-10">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-md" onClick={onClose} />

      {/* Content Container */}
      <div className="relative bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto md:overflow-hidden shadow-2xl flex flex-col md:flex-row border border-zinc-100">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-6 right-6 z-10 hover:rotate-90 transition-transform duration-300">
          <X size={24} strokeWidth={1} />
        </button>

        {/* LEFT: Big Image Section */}
        <div className="w-full md:w-1/2 bg-zinc-50 flex items-center justify-center p-8">
          <img 
            src={product.image} 
            className="max-h-[70vh] w-full object-contain drop-shadow-2xl animate-in zoom-in-95 duration-500" 
            alt={product.name} 
          />
        </div>

        {/* RIGHT: Specification & Action */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-400 mb-4 font-bold">{product.brand || "Swiss Heritage"}</p>
          <h2 className="text-4xl md:text-5xl font-serif text-zinc-900 mb-4">{product.name}</h2>
          <p className="text-2xl font-light text-zinc-600 mb-8">{formatINR(product.price)}</p>

          <div className="space-y-6 mb-10">
            <p className="text-sm text-zinc-500 leading-relaxed italic">
              {product.description || "A masterpiece of horological engineering, blending traditional craftsmanship with contemporary design."}
            </p>
            
            {/* Technical Specs Table */}
            <div className="grid grid-cols-2 gap-y-4 pt-6 border-t border-zinc-100">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-zinc-400 mb-1">Movement</p>
                <p className="text-xs font-bold">Automatic Calibre</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-zinc-400 mb-1">Case Size</p>
                <p className="text-xs font-bold">41mm / Steel</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-zinc-400 mb-1">Water Resistance</p>
                <p className="text-xs font-bold">100 Meters</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-zinc-400 mb-1">Dial</p>
                <p className="text-xs font-bold">Sapphire Crystal</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => { addToCart(product); onClose(); }}
            className="w-full bg-black text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-3"
          >
            <ShoppingBag size={18} /> Add to Bag — {formatINR(product.price)}
          </button>

          {/* Trust Badges */}
          <div className="flex justify-between mt-12 opacity-50">
            <div className="flex flex-col items-center gap-2 text-[8px] uppercase tracking-widest font-bold">
              <Shield size={16} /> 2Y Warranty
            </div>
            <div className="flex flex-col items-center gap-2 text-[8px] uppercase tracking-widest font-bold">
              <Clock size={16} /> Express Delivery
            </div>
            <div className="flex flex-col items-center gap-2 text-[8px] uppercase tracking-widest font-bold">
              <Award size={16} /> Certified
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;