import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  ShoppingCart,
  Moon,
  Sun,
  Search,
  User,
  Menu,
  X,
  Home,
  Package,
} from 'lucide-react';

const Navbar = () => {
  const { getTotalItems, theme, toggleTheme } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');

  const cartCount = getTotalItems();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search for:', search);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center justify-between h-16 gap-8">
          <Link
            to="/"
            className="flex-shrink-0 font-bold text-2xl text-blue-900 dark:text-blue-400 hover:text-blue-700 transition-colors"
          >
            ✦ Aurora
          </Link>

          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-2xl flex items-center bg-gray-100 dark:bg-slate-800 rounded-lg"
          >
            <input
              type="text"
              placeholder="Search for products, brands, and more..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent px-4 py-2 outline-none text-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-slate-400"
            />
            <button
              type="submit"
              className="px-4 py-2 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
            >
              <Search size={20} />
            </button>
          </form>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon size={20} className="text-gray-700" />
              ) : (
                <Sun size={20} className="text-yellow-400" />
              )}
            </button>

            <Link
              to="/signin"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <User size={20} className="text-gray-700 dark:text-slate-300" />
              <span className="text-sm font-medium text-gray-700 dark:text-slate-300">
                Account
              </span>
            </Link>

            <Link
              to="/cart"
              className="relative flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ShoppingCart size={20} className="text-gray-700 dark:text-slate-300" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
              <span className="text-sm font-medium text-gray-700 dark:text-slate-300">
                Cart
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center justify-between h-16">
          <Link
            to="/"
            className="font-bold text-xl text-blue-600 dark:text-blue-400"
          >
            Aurora
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              {theme === 'light' ? (
                <Moon size={20} />
              ) : (
                <Sun size={20} className="text-yellow-400" />
              )}
            </button>

            <Link to="/cart" className="relative p-2">
              <ShoppingCart size={20} className="text-gray-700 dark:text-slate-300" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-slate-700 py-4 space-y-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-gray-100 dark:bg-slate-800 px-3 py-2 rounded-lg outline-none text-gray-700 dark:text-white"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-blue-600 text-white rounded-lg"
              >
                <Search size={18} />
              </button>
            </form>

            <div className="space-y-2">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
                onClick={() => setMenuOpen(false)}
              >
                <Home size={18} />
                Home
              </Link>
              <Link
                to="/products"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
                onClick={() => setMenuOpen(false)}
              >
                <Package size={18} />
                Products
              </Link>
              <Link
                to="/signin"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
                onClick={() => setMenuOpen(false)}
              >
                <User size={18} />
                Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
