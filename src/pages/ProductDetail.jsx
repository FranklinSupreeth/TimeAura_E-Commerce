import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { formatINR } from '../utils/format';
import { Shield, Truck, RotateCcw, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // 1. Fix: Ensure ID types match (String from URL vs Number in Data)
  const product = products.find((p) => String(p.id) === String(id));

  // 2. Fix: Scroll to top whenever the ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Handle missing product safely
  if (!product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-4">
        <h2 className="font-serif text-2xl">Timepiece not found</h2>
        <Link to="/shop" className="text-xs uppercase tracking-widest underline">Return to Shop</Link>
      </div>
    );
  }

  // Related Products Logic
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 animate-in fade-in duration-700">
      {/* Navigation */}
      <Link to="/shop" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-400 hover:text-black mb-12 transition-colors group">
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Collection
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/5] bg-zinc-50 overflow-hidden rounded-sm">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]" 
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
             <div className="aspect-square bg-zinc-100 border border-zinc-200">
                <img src={product.image} className="w-full h-full object-cover opacity-50" alt="view 1" />
             </div>
             <div className="aspect-square bg-zinc-100 border border-zinc-200 flex items-center justify-center text-[8px] uppercase tracking-tighter text-zinc-400 font-bold">Side View</div>
             <div className="aspect-square bg-zinc-100 border border-zinc-200 flex items-center justify-center text-[8px] uppercase tracking-tighter text-zinc-400 font-bold">Case Back</div>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col justify-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-amber-600 mb-4 font-bold">{product.brand || "TimeAura Heritage"}</p>
          <h1 className="text-4xl md:text-6xl font-serif text-zinc-900 mb-6 leading-tight">{product.name}</h1>
          <p className="text-3xl font-light text-zinc-900 mb-8">{formatINR(product.price)}</p>
          
          <div className="prose prose-sm text-zinc-500 mb-10 leading-relaxed max-w-md">
            <p>A masterpiece of horological engineering. This {product.category.toLowerCase()} timepiece features a high-precision movement housed in a hand-finished case, embodying the perfect balance of tradition and modernity.</p>
          </div>

          {/* Action Area */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <div className="flex items-center border border-zinc-200 px-6 py-4 justify-between sm:w-40">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="hover:text-amber-600 transition-colors"><Minus size={16} /></button>
              <span className="text-sm font-bold font-mono">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="hover:text-amber-600 transition-colors"><Plus size={16} /></button>
            </div>
            <button 
              onClick={() => addToCart({...product, quantity})}
              className="flex-1 bg-zinc-900 text-white py-4 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-black transition-all flex items-center justify-center gap-3"
            >
              <ShoppingBag size={16} /> Add to Bag
            </button>
          </div>

          {/* Luxury Perks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-zinc-100">
            <div className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left">
              <Shield size={20} className="text-zinc-900" />
              <span className="text-[9px] uppercase tracking-widest font-bold">Lifetime Warranty</span>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left">
              <Truck size={20} className="text-zinc-900" />
              <span className="text-[9px] uppercase tracking-widest font-bold">Complimentary Shipping</span>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left">
              <RotateCcw size={20} className="text-zinc-900" />
              <span className="text-[9px] uppercase tracking-widest font-bold">Authenticity Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-32 pt-20 border-t border-zinc-100">
          <div className="flex flex-col items-center mb-16">
            <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-400 mb-4 font-bold">The Curated Choice</p>
            <h2 className="text-4xl font-serif">Similar Timepieces</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {relatedProducts.map((rel) => (
              <Link key={rel.id} to={`/shop/${rel.id}`} className="group">
                <div className="aspect-[3/4] overflow-hidden bg-zinc-50 mb-6">
                  <img src={rel.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" alt={rel.name} />
                </div>
                <div className="text-center">
                  <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold mb-2">{rel.name}</h4>
                  <p className="text-zinc-500 text-xs">{formatINR(rel.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;