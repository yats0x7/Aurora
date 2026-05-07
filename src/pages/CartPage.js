import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();

  const total = getTotalPrice();
  const items = cart.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = total > 500 ? 0 : 50;
  const tax = Math.round(total * 0.18);
  const grandTotal = total + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center py-12">
        <div className="text-center">
          <ShoppingBag
            size={64}
            className="mx-auto mb-4 text-gray-400 dark:text-slate-600"
          />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your cart is empty
          </h1>
          <p className="text-gray-600 dark:text-slate-400 mb-6">
            Add some items to get started!
          </p>
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const discount = Math.round(
                ((item.originalPrice - item.price) / item.originalPrice) * 100
              );
              const itemTotal = item.price * item.quantity;

              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-800 rounded-lg p-4 flex gap-4 hover:shadow-lg transition-shadow"
                >
                  <div className="w-24 h-24 flex-shrink-0 bg-gray-100 dark:bg-slate-700 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
                      {item.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        ₹{item.price.toLocaleString()}
                      </span>
                      {item.originalPrice > item.price && (
                        <>
                          <span className="text-gray-500 dark:text-slate-400 line-through">
                            ₹{item.originalPrice.toLocaleString()}
                          </span>
                          <span className="text-green-600 dark:text-green-400 text-sm font-bold">
                            -{discount}%
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-700 w-fit rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-slate-400">Subtotal</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ₹{itemTotal.toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Remove from cart"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 sticky top-20">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700 dark:text-slate-300">
                  <span>Items ({items})</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-gray-700 dark:text-slate-300">
                  <span>Delivery</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        Free
                      </span>
                    ) : (
                      <span>₹{shipping}</span>
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-gray-700 dark:text-slate-300">
                  <span>Taxes & Fees</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>

                <div className="border-t border-gray-200 dark:border-slate-700 pt-4 flex justify-between font-bold text-lg">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    ₹{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mb-6 space-y-2">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                />
                <button className="w-full px-4 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg font-semibold text-gray-900 dark:text-white transition-colors">
                  Apply Code
                </button>
              </div>

              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors mb-3">
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate('/products')}
                className="w-full py-3 border-2 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                Continue Shopping
              </button>

              <button
                onClick={clearCart}
                className="w-full mt-4 py-2 text-red-600 dark:text-red-400 font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                Clear Cart
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700 space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span className="text-gray-700 dark:text-slate-300">
                    Free shipping on orders above ₹500
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span className="text-gray-700 dark:text-slate-300">
                    30-day easy returns & refunds
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span className="text-gray-700 dark:text-slate-300">
                    Secure SSL encrypted checkout
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
