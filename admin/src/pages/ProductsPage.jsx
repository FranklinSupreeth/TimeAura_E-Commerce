import React, { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { productService } from '../services/apiService';
import { formatINR } from '../utils/format';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productService.getAllProducts();
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(id);
        setProducts(products.filter(p => p._id !== id));
        alert('Product deleted successfully');
      } catch (err) {
        console.error('Error deleting product:', err);
        alert('Failed to delete product');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Products Management</h1>
          <p className="text-zinc-500 text-sm mt-2">Manage your watch collection</p>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-100">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-zinc-700">Product Name</th>
                <th className="px-6 py-4 text-left font-semibold text-zinc-700">Brand</th>
                <th className="px-6 py-4 text-left font-semibold text-zinc-700">Category</th>
                <th className="px-6 py-4 text-left font-semibold text-zinc-700">Price</th>
                <th className="px-6 py-4 text-left font-semibold text-zinc-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.image && (
                          <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
                        )}
                        <span className="font-medium text-zinc-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-600">{product.brand}</td>
                    <td className="px-6 py-4">
                      <span className="bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full text-xs font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-zinc-900">{formatINR(product.price)}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-zinc-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
