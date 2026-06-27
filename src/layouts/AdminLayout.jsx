import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Watch, ShoppingCart, Users, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-zinc-50">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-white border-r border-zinc-200 p-6 flex flex-col">
        <h2 className="text-xl font-serif font-bold tracking-tighter mb-10 text-zinc-800">
          TimeAura <span className="text-[10px] block font-sans tracking-widest text-zinc-400">ADMIN PANEL</span>
        </h2>
        
        <nav className="space-y-2 flex-1">
          <Link to="/admin" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-zinc-100 text-zinc-600 transition-colors">
            <LayoutDashboard size={18} /> <span>Overview</span>
          </Link>
          <Link to="/admin/products" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-zinc-100 text-zinc-600 transition-colors">
            <Watch size={18} /> <span>Products</span>
          </Link>
          <Link to="/admin/orders" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-zinc-100 text-zinc-600 transition-colors">
            <ShoppingCart size={18} /> <span>Orders</span>
          </Link>
        </nav>

        <button 
          onClick={() => navigate('/')}
          className="flex items-center space-x-3 p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-auto"
        >
          <LogOut size={18} /> <span>Exit Admin</span>
        </button>
      </aside>

      {/* Admin Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;