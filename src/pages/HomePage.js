import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Skeleton from '../components/Skeleton';
import { PRODUCTS, CATEGORIES } from '../utils/products';
import { ChevronRight } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const heroes = [
    'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&h=400&fit=crop',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=400&fit=crop',
    'https://img.freepik.com/free-psd/retro-e-commerce-instagram-posts_23-2149919270.jpg?semt=ais_hybrid&w=740&q=80',
  ];

  const deals = PRODUCTS.slice(0, 4);
  const featured = PRODUCTS.slice(4, 10);
  const topRated = [...PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="relative h-80 md:h-96 bg-gray-200 dark:bg-slate-800 overflow-hidden group">
        <img
          src={heroes[heroIndex]}
          alt="Hero"
          className="w-full h-full object-cover transition-opacity duration-1000"
        />

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {heroes.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === heroIndex ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setHeroIndex((prev) => (prev - 1 + heroes.length) % heroes.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
        >
          ❮
        </button>
        <button
          onClick={() => setHeroIndex((prev) => (prev + 1) % heroes.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
        >
          ❯
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/products?category=${cat.name}`)}
                className="p-4 bg-white dark:bg-slate-800 rounded-lg hover:shadow-lg transition-shadow text-center space-y-2 group cursor-pointer"
              >
                <div className="text-3xl group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <p className="text-xs md:text-sm font-medium text-gray-700 dark:text-slate-300">
                  {cat.name}
                </p>
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Flash Deals
              </h2>
              <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">
                Limited Time
              </span>
            </div>
            <button
              onClick={() => navigate('/products')}
              className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 font-semibold"
            >
              See All <ChevronRight size={18} />
            </button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Skeleton count={4} type="card" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {deals.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={() => navigate(`/product/${product.id}`)}
                />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Featured Products
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Skeleton count={6} type="card" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {featured.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={() => navigate(`/product/${product.id}`)}
                />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Top Rated
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Skeleton count={6} type="card" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {topRated.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={() => navigate(`/product/${product.id}`)}
                />
              ))}
            </div>
          )}
        </section>

        <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Exclusive Membership</h2>
          <p className="text-lg mb-6 opacity-90">
            Join our loyalty program for exclusive deals, early access, and free shipping on all orders.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            Learn More
          </button>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
