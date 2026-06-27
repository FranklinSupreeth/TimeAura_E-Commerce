import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { cartCount } = useCart();
  const { isLoggedIn } = useAuth();

  return (
    <nav className="w-full bg-white border-b border-zinc-100 sticky top-0 z-[100]">
      {/* Top Thin Bar (Optional Luxury Touch) */}
      <div className="bg-zinc-900 text-white text-[9px] py-2 text-center uppercase tracking-[0.3em]">
        Complimentary Global Insured Shipping
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center h-20">
          
          {/* Left: Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <Menu size={20} strokeWidth={1.5} />
          </div>

          {/* Left: Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10 text-[11px] uppercase tracking-[0.2em] font-medium">
            <Link to="/shop" className="text-zinc-500 hover:text-black transition-all duration-300">Collections</Link>
            <Link to="/shop" className="text-zinc-500 hover:text-black transition-all duration-300">Men</Link>
            <Link to="/shop" className="text-zinc-500 hover:text-black transition-all duration-300">Women</Link>
          </div>

          {/* Center: Brand Identity */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link to="/" className="text-2xl md:text-3xl font-serif tracking-[0.4em] font-bold text-zinc-900">
              TIMEAURA
            </Link>
          </div>

          {/* Right: Icons & Actions */}
          <div className="flex items-center space-x-6 text-zinc-800">
            <Search size={18} strokeWidth={1.5} className="hidden sm:block cursor-pointer hover:text-zinc-400 transition-colors" />
            
            <Link to="/admin" className="hidden sm:block text-[10px] uppercase tracking-widest text-zinc-400 hover:text-zinc-900">
              Admin
            </Link>

            <Link to="/profile" className="hover:text-zinc-400 transition-colors">
              <User size={20} strokeWidth={1.5} />
            </Link>

            <Link to="/cart" className="relative group p-1">
              <ShoppingBag size={21} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-zinc-900 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-in fade-in zoom-in">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;