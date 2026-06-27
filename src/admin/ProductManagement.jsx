import React, { useState } from 'react';
import { Plus, Trash2, Edit3, X, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { formatINR } from '../utils/format';
import { useProducts } from '../context/ProductContext'; // Using Global Context

const ProductManagement = () => {
  const { products, addProduct, deleteProduct, loading } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: '',
    price: '',
    category: 'Men',
    description: '',
    image: ''
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Validation
      if (!newProduct.name || !newProduct.brand || !newProduct.price || !newProduct.category || !newProduct.description) {
        setError('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      const productToAdd = {
        ...newProduct,
        price: Number(newProduct.price),
        // Default image if field is empty
        image: newProduct.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80'
      };

      await addProduct(productToAdd);
      setIsModalOpen(false);
      
      // Reset form
      setNewProduct({ name: '', brand: '', price: '', category: 'Men', description: '', image: '' });
    } catch (err) {
      setError(err.message || 'Failed to add product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-serif text-zinc-900">Inventory Management</h1>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mt-2 font-bold">
            Curating the TimeAura Collection
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-zinc-900 text-white px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold flex items-center gap-3 hover:bg-black transition-all shadow-lg"
        >
          <Plus size={16} /> Add New Entry
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-zinc-100 rounded-sm shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-100">
              <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-zinc-400">Product Details</th>
              <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-zinc-400">Category</th>
              <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-zinc-400">Description</th>
              <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-zinc-400">Price</th>
              <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-zinc-400 text-right">Management</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-8 py-10 text-center text-zinc-500">
                  <p className="text-[10px] uppercase tracking-widest">Loading products...</p>
                </td>
              </tr>
            ) : products?.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="hover:bg-zinc-50/50 transition-colors group">
                  <td className="px-8 py-5 flex items-center gap-6">
                    <div className="w-12 h-16 bg-zinc-100 overflow-hidden flex-shrink-0 rounded">
                      <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-900 uppercase tracking-tight">{product.name}</p>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">{product.brand}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-[10px] uppercase tracking-widest px-3 py-1 bg-zinc-100 text-zinc-600 font-bold rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-[10px] text-zinc-600 max-w-xs truncate">{product.description}</p>
                  </td>
                  <td className="px-8 py-5 text-sm font-medium text-zinc-900">{formatINR(product.price)}</td>
                  <td className="px-8 py-5 text-right space-x-6">
                    <button className="text-zinc-300 hover:text-black transition-colors"><Edit3 size={18} /></button>
                    <button 
                      onClick={() => deleteProduct(product._id)} 
                      className="text-zinc-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-8 py-10 text-center text-zinc-500">
                  <p className="text-[10px] uppercase tracking-widest">No products yet. Add your first product!</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white w-full max-w-2xl relative p-12 rounded-sm shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-zinc-400 hover:text-black">
              <X size={24} />
            </button>
            <h2 className="text-3xl font-serif mb-2">New Timepiece</h2>
            <p className="text-zinc-400 text-[10px] uppercase tracking-widest mb-10">Add to global catalog</p>
            
            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3 items-start">
                <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleFormSubmit} className="space-y-8">
              <div className="grid grid-cols-2 gap-8">
                {/* Product Name */}
                <div className="col-span-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-400 block mb-3">Product Name *</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full border-b border-zinc-200 py-2 outline-none focus:border-black transition-colors bg-transparent placeholder-zinc-300"
                    placeholder="e.g. Royal Oak Jumbo"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  />
                </div>

                {/* Brand */}
                <div>
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-400 block mb-3">Brand *</label>
                  <input 
                    type="text" 
                    required
                    className="w-full border-b border-zinc-200 py-2 outline-none focus:border-black transition-colors bg-transparent placeholder-zinc-300"
                    placeholder="e.g. Audemars Piguet"
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-400 block mb-3">Price (INR) *</label>
                  <input 
                    type="number" 
                    required
                    className="w-full border-b border-zinc-200 py-2 outline-none focus:border-black transition-colors bg-transparent placeholder-zinc-300"
                    placeholder="850000"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-400 block mb-3">Category *</label>
                  <select 
                    required
                    className="w-full border-b border-zinc-200 py-2 outline-none focus:border-black transition-colors bg-transparent placeholder-zinc-300"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Sports">Sports</option>
                    <option value="Smartwatches">Smartwatches</option>
                    <option value="Wall-Decor">Wall-Decor</option>
                    <option value="Limited Edition">Limited Edition</option>
                    <option value="Anniversary">Anniversary Collection</option>
                    <option value="Birthday">Birthday Collection</option>
                  </select>
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-400 block mb-3">Description *</label>
                  <textarea 
                    required
                    className="w-full border border-zinc-200 p-3 outline-none focus:border-black transition-colors bg-transparent placeholder-zinc-300 rounded text-sm resize-none"
                    placeholder="Enter product description (specs, features, origin, etc.)"
                    rows="4"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  />
                </div>

                {/* Image URL */}
                <div className="col-span-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-400 block mb-3 flex items-center gap-2">
                    <ImageIcon size={12} /> Image URL
                  </label>
                  <input 
                    type="url" 
                    className="w-full border-b border-zinc-200 py-2 outline-none focus:border-black transition-colors bg-transparent text-xs placeholder-zinc-300"
                    placeholder="https://images.unsplash.com/... (Leave empty for default)"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-zinc-900 text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-black transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Adding to Inventory...' : 'Add to Inventory'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;