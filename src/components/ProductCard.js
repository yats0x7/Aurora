import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Star } from 'lucide-react';

const ProductCard = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div
      onClick={onViewDetails}
      className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col"
    >
      <div className="relative bg-gray-100 dark:bg-slate-700 aspect-square overflow-hidden group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
            -{discount}%
          </div>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
            Only {product.stock} left
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-3 flex-1 flex flex-col">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2 flex-1">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300 dark:text-slate-600'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 dark:text-slate-400">
            ({product.reviews})
          </span>
        </div>

        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 dark:text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleAdd}
          disabled={product.stock === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 rounded-lg font-semibold text-sm transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
