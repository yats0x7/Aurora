import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const SignInPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPwd, setShowPwd] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (isLogin) {
        if (form.email && form.password) {
          localStorage.setItem(
            'aurora_user',
            JSON.stringify({ name: 'John Doe', email: form.email })
          );
          navigate('/');
        } else {
          setError('Please fill all fields');
        }
      } else {
        if (form.name && form.email && form.password && form.confirmPassword) {
          if (form.password !== form.confirmPassword) {
            setError('Passwords do not match');
          } else {
            localStorage.setItem(
              'aurora_user',
              JSON.stringify({ name: form.name, email: form.email })
            );
            navigate('/');
          }
        } else {
          setError('Please fill all fields');
        }
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            ✦ Aurora
          </h1>
          <p className="text-gray-600 dark:text-slate-400">
            {isLogin ? 'Welcome back!' : 'Join us today!'}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8">
          <div className="flex gap-2 mb-8 bg-gray-100 dark:bg-slate-700 p-1 rounded-lg">
            <button
              onClick={() => {
                setIsLogin(true);
                setError('');
              }}
              className={`flex-1 py-2 px-4 rounded-md font-semibold transition-colors ${
                isLogin
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow'
                  : 'text-gray-600 dark:text-slate-400'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError('');
              }}
              className={`flex-1 py-2 px-4 rounded-md font-semibold transition-colors ${
                !isLogin
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow'
                  : 'text-gray-600 dark:text-slate-400'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPwd ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showPwd ? 'text' : 'password'}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-blue-600" />
                  <span className="text-sm text-gray-700 dark:text-slate-300">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline bg-none border-none cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {isLogin ? 'Login' : 'Sign Up'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-400">
                or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="py-2 px-4 border border-gray-300 dark:border-slate-600 rounded-lg font-semibold text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
              Google
            </button>
            <button className="py-2 px-4 border border-gray-300 dark:border-slate-600 rounded-lg font-semibold text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
              GitHub
            </button>
          </div>

          <p className="mt-6 text-center text-gray-600 dark:text-slate-400">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-slate-400">
          <p>
            By continuing, you agree to our{' '}
            <button
              type="button"
              className="text-blue-600 dark:text-blue-400 hover:underline bg-none border-none cursor-pointer"
            >
              Terms of Service
            </button>
            {' '}
            and{' '}
            <button
              type="button"
              className="text-blue-600 dark:text-blue-400 hover:underline bg-none border-none cursor-pointer"
            >
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
