import React, { useState } from 'react';
import { formatINR } from '../utils/format';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { Filter, ChevronDown, ShoppingBag } from 'lucide-react';
import ProductView from '../components/ProductView';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [selectedProduct, setSelectedProduct] = useState(null); // State for Quick View
  const { addToCart } = useCart();
  const { products, loading, error } = useProducts();

  const categories = ['All', 'Men', 'Women', 'Luxury', 'Sports','Smartwatches','Wall-Decor','Limited Edition', 'Anniversary', 'Birthday'];

  // Filter Logic
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Loading state
  if (loading) {
    return (
      <div className="pt-10 pb-24 bg-white min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Visiting the Vault...</h2>
          <p className="text-zinc-500">Loading your exquisite collection...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="pt-10 pb-24 bg-white min-h-[80vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-serif mb-4 text-red-600">Vault Connection Failed</h2>
          <p className="text-zinc-500 mb-4">{error}</p>
          <p className="text-xs text-zinc-400">Please ensure the backend server is running on port 5000</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-10 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-zinc-100 pb-8">
          <div>
            <h1 className="text-4xl font-serif mb-2 uppercase tracking-tight text-zinc-900">The Collection</h1>
            <p className="text-zinc-500 text-xs uppercase tracking-[0.2em]">Showing {filteredProducts.length} exquisite timepieces</p>
          </div>
          
          <div className="flex items-center space-x-8 mt-6 md:mt-0">
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest cursor-pointer hover:text-zinc-400 transition-colors">
              <Filter size={14} />
              <span>Filters</span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest cursor-pointer hover:text-zinc-400 transition-colors">
              <span>Sort by: {sortBy}</span>
              <ChevronDown size={14} />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-48 flex-shrink-0">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-zinc-400">Categories</h3>
            <ul className="space-y-6">
              {categories.map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xs uppercase tracking-[0.2em] transition-all duration-300 relative pb-1 ${
                      activeCategory === cat 
                      ? 'text-black font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-black' 
                      : 'text-zinc-400 hover:text-black'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredProducts.map((product) => (
              <div key={product._id} className="group flex flex-col">
                
                {/* Clickable Image Container */}
                <div className={`relative aspect-[3/4] overflow-hidden mb-6 cursor-pointer transition-all duration-500 ${
                  product.category === 'Anniversary' 
                    ? 'bg-gradient-to-b from-amber-50 to-yellow-50 border-2 border-amber-400 shadow-lg' 
                    : product.category === 'Birthday'
                    ? 'bg-gradient-to-b from-rose-50 to-pink-50 border-2 border-rose-400 shadow-lg'
                    : 'bg-zinc-50'
                }`}>
                  {/* Anniversary Badge - Top Corner */}
                  {product.category === 'Anniversary' && (
                    <div className="absolute top-4 right-4 z-20 flex flex-col items-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-amber-400 blur-lg opacity-50"></div>
                        <div className="relative bg-gradient-to-br from-amber-300 to-amber-600 text-white px-3 py-2 rounded-full text-center shadow-xl transform rotate-12">
                          <p className="text-[18px]">💍</p>
                          <p className="text-[7px] font-bold uppercase tracking-widest whitespace-nowrap">Anniversary</p>
                        </div>
                      </div>
                      {/* Sparkle effect */}
                      <div className="absolute -top-2 -right-2 text-yellow-300 text-xl animate-pulse">✨</div>
                    </div>
                  )}

                  {/* Birthday Badge - Top Corner */}
                  {product.category === 'Birthday' && (
                    <div className="absolute top-4 right-4 z-20 flex flex-col items-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-rose-400 blur-lg opacity-50"></div>
                        <div className="relative bg-gradient-to-br from-rose-300 to-rose-600 text-white px-3 py-2 rounded-full text-center shadow-xl transform -rotate-12 animate-bounce">
                          <p className="text-[18px]">🎂</p>
                          <p className="text-[7px] font-bold uppercase tracking-widest whitespace-nowrap">Birthday</p>
                        </div>
                      </div>
                      {/* Confetti effect */}
                      <div className="absolute -top-2 -right-2 text-rose-300 text-xl animate-pulse">🎉</div>
                    </div>
                  )}
                  
                    <div onClick={() => setSelectedProduct(product)} className="w-full h-full">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-out ${
                        product.category === 'Anniversary' || product.category === 'Birthday'
                          ? 'group-hover:scale-105'
                          : 'group-hover:scale-110'
                      }`} 
                    />
                    <div className={`absolute inset-0 transition-colors duration-500 ${
                      product.category === 'Anniversary'
                        ? 'bg-amber-500/0 group-hover:bg-amber-500/10'
                        : product.category === 'Birthday'
                        ? 'bg-rose-500/0 group-hover:bg-rose-500/10'
                        : 'bg-black/0 group-hover:bg-black/5'
                    }`} />
                  </div>
                  
                  {/* Luxury "Add to Bag" Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className={`absolute bottom-0 w-full py-5 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out uppercase text-[10px] tracking-[0.4em] font-bold flex items-center justify-center gap-2 hover:brightness-110 z-10 ${
                      product.category === 'Anniversary'
                        ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white'
                        : product.category === 'Birthday'
                        ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white'
                        : 'bg-zinc-900 text-white hover:bg-black'
                    }`}
                  >
                    <ShoppingBag size={14} /> Add to Bag
                  </button>
                </div>
                
                {/* Clickable Product Info */}
                <div 
                  className={`text-center px-2 cursor-pointer py-3 rounded-lg transition-all ${
                    product.category === 'Anniversary'
                      ? 'bg-gradient-to-b from-amber-50 to-transparent'
                      : product.category === 'Birthday'
                      ? 'bg-gradient-to-b from-rose-50 to-transparent'
                      : ''
                  }`}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <p className={`text-[9px] uppercase tracking-[0.3em] font-semibold ${
                      product.category === 'Anniversary'
                        ? 'text-amber-700'
                        : product.category === 'Birthday'
                        ? 'text-rose-700'
                        : 'text-zinc-400'
                    }`}>
                      {product.brand || "TimeAura Heritage"}
                    </p>
                    {product.category === 'Anniversary' && (
                      <span className="text-amber-500 text-sm">💛</span>
                    )}
                    {product.category === 'Birthday' && (
                      <span className="text-rose-500 text-sm">🎁</span>
                    )}
                  </div>
                  <h3 className={`text-[13px] uppercase tracking-widest mb-2 font-medium ${
                    product.category === 'Anniversary'
                      ? 'text-amber-900'
                      : product.category === 'Birthday'
                      ? 'text-rose-900'
                      : 'text-zinc-900'
                  }`}>
                    {product.name}
                  </h3>
                  {product.category === 'Anniversary' && (
                    <p className="text-[8px] text-amber-600 uppercase tracking-widest mb-1 italic font-semibold">
                      ✨ Celebrate milestones in style ✨
                    </p>
                  )}
                  {product.category === 'Birthday' && (
                    <p className="text-[8px] text-rose-600 uppercase tracking-widest mb-1 italic font-semibold">
                      🎉 Make the day unforgettable 🎉
                    </p>
                  )}
                  <p className={`text-sm font-light tracking-wider ${
                    product.category === 'Anniversary'
                      ? 'text-amber-700 font-semibold'
                      : product.category === 'Birthday'
                      ? 'text-rose-700 font-semibold'
                      : 'text-zinc-600'
                  }`}>
                    {formatINR(product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Quick View Modal */}
      {selectedProduct && (
        <ProductView 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
      
    </div>
  );
};

export default Shop;