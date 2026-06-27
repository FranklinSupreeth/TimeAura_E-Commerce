const ProductCard = ({ product }) => (
  <div className="group cursor-pointer">
    <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      <button className="absolute bottom-0 w-full py-4 bg-black text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 uppercase text-xs tracking-widest">
        Add to Cart
      </button>
    </div>
    <div className="mt-4 text-center">
      <p className="text-xs text-zinc-400 uppercase tracking-tighter">{product.brand}</p>
      <h3 className="text-sm font-medium text-zinc-900">{product.name}</h3>
      <p className="text-sm text-zinc-600 mt-1">${product.price.toLocaleString()}</p>
    </div>
  </div>
);