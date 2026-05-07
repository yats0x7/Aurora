import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../utils/products';
import { ShoppingCart, Heart, Share2, Check, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = useMemo(() => PRODUCTS.find((p) => p.id === parseInt(id)), [id]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Product Not Found
          </h1>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleQty = (value) => {
    if (value >= 1 && value <= product.stock) {
      setQuantity(value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 mb-6 font-semibold"
        >
          <ChevronLeft size={18} />
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative bg-white dark:bg-slate-800 rounded-lg overflow-hidden aspect-square flex items-center justify-center group">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain"
              />

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === 0 ? product.images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === product.images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === idx
                        ? 'border-blue-600'
                        : 'border-gray-200 dark:border-slate-700'
                    }`}
                  >
                    <img src={img} alt={`Product ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300 dark:text-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-slate-400">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div>
                {product.stock > 10 ? (
                  <span className="text-green-600 dark:text-green-400 font-semibold">
                    ✓ In Stock
                  </span>
                ) : product.stock > 0 ? (
                  <span className="text-orange-600 dark:text-orange-400 font-semibold">
                    Only {product.stock} left
                  </span>
                ) : (
                  <span className="text-red-600 dark:text-red-400 font-semibold">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-xl text-gray-500 dark:text-slate-400 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                  {discount}% off
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-slate-400">
                Inclusive of all taxes
              </p>
            </div>

            <div className="flex items-center gap-4">
              <label className="font-semibold text-gray-900 dark:text-white">
                Quantity:
              </label>
              <div className="flex items-center border border-gray-300 dark:border-slate-600 rounded-lg">
                <button
                  onClick={() => handleQty(quantity - 1)}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQty(parseInt(e.target.value) || 1)}
                  className="w-16 text-center outline-none bg-transparent text-gray-900 dark:text-white"
                  min="1"
                  max={product.stock}
                />
                <button
                  onClick={() => handleQty(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleAdd}
                disabled={product.stock === 0}
                className={`w-full py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-all ${
                  added
                    ? 'bg-green-600'
                    : product.stock === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {added ? (
                  <>
                    <Check size={20} />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Add to Cart
                  </>
                )}
              </button>

              <div className="flex gap-3">
                <button className="flex-1 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-lg font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                  <Heart size={20} />
                  Wishlist
                </button>
                <button className="flex-1 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-lg font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                  <Share2 size={20} />
                  Share
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 space-y-4 border border-gray-200 dark:border-slate-700">
              <div className="flex gap-3">
                <Truck className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Free Shipping</p>
                  <p className="text-sm text-gray-600 dark:text-slate-400">
                    On orders above ₹500
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Shield className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Secure Payment</p>
                  <p className="text-sm text-gray-600 dark:text-slate-400">
                    100% secure transactions
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <RotateCcw className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Easy Returns</p>
                  <p className="text-sm text-gray-600 dark:text-slate-400">
                    30-day money back guarantee
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Description</h3>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Specifications</h3>
                <div className="space-y-2">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600 dark:text-slate-400">{key}:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
