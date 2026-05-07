import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES, PRICE_RANGES, RATING_FILTERS } from '../utils/products';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ProductListPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [cats, setCats] = useState(
    searchParams.get('category') ? [searchParams.get('category')] : []
  );
  const [prices, setPrices] = useState([]);
  const [rating, setRating] = useState(null);
  const [sortBy, setSortBy] = useState('relevance');
  const [expandedFilters, setExpandedFilters] = useState({
    category: true,
    price: true,
    rating: true,
  });

  const filtered = useMemo(() => {
    let result = [...PRODUCTS];

    if (cats.length > 0) {
      result = result.filter((p) => cats.includes(p.category));
    }

    if (prices.length > 0) {
      result = result.filter((p) =>
        prices.some((r) => p.price >= r.min && p.price <= r.max)
      );
    }

    if (rating) {
      result = result.filter((p) => p.rating >= rating);
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return result;
  }, [cats, prices, rating, sortBy]);

  const toggleCat = (cat) => {
    setCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const togglePrice = (range) => {
    setPrices((prev) =>
      prev.find((r) => r.id === range.id)
        ? prev.filter((r) => r.id !== range.id)
        : [...prev, range]
    );
  };

  const toggleExpand = (filter) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const clearFilters = () => {
    setCats([]);
    setPrices([]);
    setRating(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Products
          </h1>
          <p className="text-gray-600 dark:text-slate-400">
            Showing {filtered.length} results
          </p>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <aside className="w-64 hidden lg:block">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 space-y-6 sticky top-20">
              <button
                onClick={clearFilters}
                disabled={cats.length === 0 && prices.length === 0 && !rating}
                className="w-full py-2 px-4 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg font-semibold hover:bg-blue-100 dark:hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Clear Filters
              </button>

              {/* Category Filter */}
              <div>
                <button
                  onClick={() => toggleExpand('category')}
                  className="w-full flex items-center justify-between font-semibold text-gray-900 dark:text-white mb-3"
                >
                  Category
                  {expandedFilters.category ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {expandedFilters.category && (
                  <div className="space-y-2">
                    {CATEGORIES.map((cat) => (
                      <label key={cat.id} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cats.includes(cat.name)}
                          onChange={() => toggleCat(cat.name)}
                          className="w-4 h-4 rounded accent-blue-600"
                        />
                        <span className="text-gray-700 dark:text-slate-300">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Filter */}
              <div>
                <button
                  onClick={() => toggleExpand('price')}
                  className="w-full flex items-center justify-between font-semibold text-gray-900 dark:text-white mb-3"
                >
                  Price
                  {expandedFilters.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {expandedFilters.price && (
                  <div className="space-y-2">
                    {PRICE_RANGES.map((range) => (
                      <label key={range.id} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={prices.some((r) => r.id === range.id)}
                          onChange={() => togglePrice(range)}
                          className="w-4 h-4 rounded accent-blue-600"
                        />
                        <span className="text-gray-700 dark:text-slate-300">{range.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Rating Filter */}
              <div>
                <button
                  onClick={() => toggleExpand('rating')}
                  className="w-full flex items-center justify-between font-semibold text-gray-900 dark:text-white mb-3"
                >
                  Rating
                  {expandedFilters.rating ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {expandedFilters.rating && (
                  <div className="space-y-2">
                    {RATING_FILTERS.map((filter) => (
                      <label key={filter.id} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          checked={rating === filter.value}
                          onChange={() => setRating(filter.value)}
                          className="w-4 h-4 accent-blue-600"
                        />
                        <span className="text-gray-700 dark:text-slate-300">{filter.label}</span>
                      </label>
                    ))}
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={rating === null}
                        onChange={() => setRating(null)}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span className="text-gray-700 dark:text-slate-300">All Ratings</span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-gray-600 dark:text-slate-400 font-medium">Sort by:</p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rating</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={() => navigate(`/product/${product.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-2xl font-semibold text-gray-600 dark:text-slate-400 mb-4">
                  No products found
                </p>
                <p className="text-gray-500 dark:text-slate-500 mb-6">
                  Try adjusting your filters
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
