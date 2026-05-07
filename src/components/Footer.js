import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About Aurora</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your one-stop destination for premium products, unbeatable prices, and exceptional customer service.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button className="text-gray-400 hover:text-white transition-colors bg-none border-none cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors bg-none border-none cursor-pointer">
                  Products
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors bg-none border-none cursor-pointer">
                  Categories
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors bg-none border-none cursor-pointer">
                  Deals
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button className="text-gray-400 hover:text-white transition-colors bg-none border-none cursor-pointer">
                  Contact Us
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors bg-none border-none cursor-pointer">
                  FAQ
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors bg-none border-none cursor-pointer">
                  Shipping Info
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors bg-none border-none cursor-pointer">
                  Returns
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button className="text-gray-400 hover:text-white transition-colors bg-none border-none cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors bg-none border-none cursor-pointer">
                  Terms of Service
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors bg-none border-none cursor-pointer">
                  Cookie Policy
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors bg-none border-none cursor-pointer">
                  Disclaimer
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 Aurora. All rights reserved.
            </p>
            <div className="flex gap-6">
              <button className="text-gray-400 hover:text-white transition-colors bg-none border-none cursor-pointer">
                Twitter
              </button>
              <button className="text-gray-400 hover:text-white transition-colors bg-none border-none cursor-pointer">
                Facebook
              </button>
              <button className="text-gray-400 hover:text-white transition-colors bg-none border-none cursor-pointer">
                Instagram
              </button>
              <button className="text-gray-400 hover:text-white transition-colors bg-none border-none cursor-pointer">
                LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
