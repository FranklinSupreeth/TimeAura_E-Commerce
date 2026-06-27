import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BarChart3, Package, ShoppingCart, LogOut, Menu, X } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import OrdersPage from './pages/OrdersPage';
import OrderDetail from './pages/OrderDetail';
import ProductsPage from './pages/ProductsPage';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-50 flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-zinc-900 text-white transition-all duration-300 flex flex-col shadow-lg`}>
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            {sidebarOpen && <h1 className="text-xl font-bold">TimeAura Admin</h1>}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <NavLink icon={<BarChart3 size={20} />} label="Dashboard" path="/" sidebarOpen={sidebarOpen} />
            <NavLink icon={<ShoppingCart size={20} />} label="Orders" path="/orders" sidebarOpen={sidebarOpen} />
            <NavLink icon={<Package size={20} />} label="Products" path="/products" sidebarOpen={sidebarOpen} />
          </nav>

          <div className="p-4 border-t border-zinc-800">
            <button className="w-full flex items-center gap-3 text-zinc-400 hover:text-white transition-colors">
              <LogOut size={20} />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/orders/:id" element={<OrderDetail />} />
              <Route path="/products" element={<ProductsPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

function NavLink({ icon, label, path, sidebarOpen }) {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive
          ? 'bg-white text-zinc-900 font-semibold'
          : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
      }`}
    >
      {icon}
      {sidebarOpen && <span>{label}</span>}
    </Link>
  );
}

export default App;
