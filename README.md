# Aurora E-Commerce Frontend

A modern, production-level e-commerce frontend built with React, Tailwind CSS, and React Router. Inspired by Amazon, Flipkart, and Myntra.

## 🚀 Features

### Core Features
- ✨ **Modern UI/UX** - Clean, responsive design with dark mode support
- 🛒 **Shopping Cart** - Full cart management with persistent storage
- 🔍 **Product Search & Filtering** - Advanced filters for category, price, and rating
- 📱 **Responsive Design** - Mobile-first approach, works on all devices
- 🌓 **Dark Mode** - Toggle between light and dark themes
- ⚡ **Performance Optimized** - Lazy loading, skeleton screens, smooth animations
- 🏠 **Multi-Page Navigation** - Seamless routing with React Router
- 💾 **State Persistence** - Cart and preferences saved in localStorage

### Components
- **Navbar** - Sticky navigation with search, cart, and user menu
- **Product Cards** - Interactive product display with rating and stock status
- **Filters** - Category, price range, and rating filters
- **Shopping Cart** - Full checkout interface with order summary
- **Product Gallery** - Image carousel with thumbnail selection
- **Skeleton Loaders** - Better UX during loading states
- **Footer** - Comprehensive footer with links and information

### Pages
- **Home** - Hero carousel, categories, flash deals, featured & top-rated products
- **Products** - Advanced product listing with filters and sorting
- **Product Detail** - Full product view with specs, gallery, and reviews
- **Cart** - Complete cart management and checkout interface
- **Sign In/Sign Up** - Authentication pages with form validation

## 📋 Project Structure

```
Aurora/
├── src/
│   ├── components/
│   │   ├── Navbar.js          # Navigation bar component
│   │   ├── Footer.js          # Footer component
│   │   ├── ProductCard.js     # Product card component
│   │   ├── Skeleton.js        # Loading skeleton component
│   │   └── Modal.js           # Modal dialog component
│   ├── pages/
│   │   ├── HomePage.js        # Home page with hero and products
│   │   ├── ProductListPage.js # Product listing with filters
│   │   ├── ProductDetailPage.js # Product details page
│   │   ├── CartPage.js        # Shopping cart page
│   │   └── SignInPage.js      # Sign in/up page
│   ├── context/
│   │   └── CartContext.js     # Global cart state management
│   ├── utils/
│   │   └── products.js        # Product data and constants
│   ├── hooks/                 # Custom React hooks (extensible)
│   ├── App.js                 # Main app component with routing
│   ├── index.js               # React DOM render
│   └── index.css              # Global styles with Tailwind
├── public/
│   └── index.html             # HTML template
├── package.json               # Dependencies
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
└── README.md                  # This file
```

## 🛠 Tech Stack

- **Frontend Framework**: React 19.2.5
- **Routing**: React Router v6.20.0
- **Styling**: Tailwind CSS 3.3.0
- **Icons**: Lucide React 1.14.0
- **HTTP Client**: Axios 1.16.0
- **Build Tool**: Create React App 5.0.1
- **CSS Processing**: PostCSS + Autoprefixer

## 📦 Installation

### Prerequisites
- Node.js 14+ and npm/yarn

### Setup Instructions

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

The application will open at `http://localhost:3000`

## 🎯 Key Components Overview

### CartContext (State Management)
Manages global app state:
- Cart items and operations (add, remove, update)
- Theme management (light/dark mode)
- Persistent storage (localStorage)

```javascript
const { cart, addToCart, removeFromCart, updateQuantity, theme, toggleTheme } = useCart();
```

### Product Data Structure
```javascript
{
  id: number,
  name: string,
  price: number,
  originalPrice: number,
  rating: number,
  reviews: number,
  category: string,
  image: string,
  images: string[],
  description: string,
  specs: object,
  stock: number
}
```

## 🎨 Styling & Design

### Color Scheme
- **Primary**: Blue (`#6a82f6`)
- **Success**: Green (`#10b981`)
- **Warning**: Orange (`#f59e0b`)
- **Error**: Red (`#ef4444`)
- **Dark Mode**: Slate palette

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: 1024px+

### Typography
- Font Family: System fonts (SF Pro, Segoe UI, Roboto)
- Sizes: Scalable rem-based sizing
- Line Heights: Optimized for readability

## 💡 Usage Examples

### Add to Cart
```javascript
const { addToCart } = useCart();

// Add product with quantity
addToCart(product, quantity);
```

### Toggle Theme
```javascript
const { theme, toggleTheme } = useCart();

<button onClick={toggleTheme}>
  {theme === 'light' ? '🌙' : '☀️'}
</button>
```

### Navigate to Product Details
```javascript
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate(`/product/${productId}`);
```

## 📱 Responsive Features

- **Mobile-First Design**: Built for mobile, enhanced for desktop
- **Flexible Grid**: Adapts from 1-4 columns based on screen size
- **Touch-Friendly**: Large buttons and tap targets
- **Optimized Images**: Lazy loading and responsive sizes
- **Readable Text**: Font sizes scale appropriately
- **Hamburger Menu**: Mobile navigation menu

## 🔒 Security & Best Practices

- ✅ XSS Prevention: React's built-in escaping
- ✅ CSRF Protection: Ready for token-based auth
- ✅ Secure Storage: Sensitive data handled carefully
- ✅ Input Validation: Form validation on client-side
- ✅ Error Boundaries: Graceful error handling (extensible)

## 🚀 Performance Optimizations

- **Lazy Loading**: Images and components load on demand
- **Code Splitting**: Route-based code splitting (extensible)
- **Skeleton Screens**: Better loading UX than spinners
- **Memoization**: Optimized re-renders with useMemo
- **Debouncing**: Filter and search optimization (extensible)
- **Caching**: LocalStorage for cart and preferences

## 🔄 State Management Architecture

### CartContext Flow
```
User Action → Dispatch Action → Update State → LocalStorage → Re-render
```

### Example: Adding to Cart
```javascript
// Component
const { addToCart } = useCart();
addToCart(product, 1);

// Context
setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);

// Effect
useEffect(() => {
  localStorage.setItem('aurora_cart', JSON.stringify(cart));
}, [cart]);
```

## 🧪 Testing & Validation

### To Extend with Testing
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

### Example Test
```javascript
import { render, screen } from '@testing-library/react';
import ProductCard from '../ProductCard';

test('renders product card', () => {
  render(<ProductCard product={mockProduct} />);
  expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
});
```

## 🔧 Configuration

### Environment Variables
Create `.env` file (optional for future API integration):
```
REACT_APP_API_BASE_URL=https://api.example.com
REACT_APP_ENV=development
```

### Build Configuration
- Development: `npm start` (hot reload)
- Production: `npm run build` (optimized bundle)
- Eject: `npm run eject` (advanced configuration)

## 📈 Scalability Features

### Easy to Extend
- **Component Structure**: New components fit seamlessly
- **Page Structure**: Add new pages easily with routing
- **Hooks**: Custom hooks for shared logic
- **Context**: Extensible context system
- **Utils**: Centralized utilities and constants

### Integration Ready
- **API Integration**: Easy axios setup for backend
- **Authentication**: Ready for auth tokens
- **Form Handling**: Validation and submission ready
- **Analytics**: Easy to add tracking
- **Payment Gateway**: Cart structure supports it

## 🚨 Known Limitations & Future Enhancements

### Current
- Mock data used (no backend API)
- localStorage only (no server sync)
- Basic authentication placeholder

### Future Enhancements
- [ ] Backend API integration
- [ ] User authentication with JWT
- [ ] Order history and tracking
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Admin dashboard
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Advanced search with autocomplete
- [ ] Social sharing features

## 📚 Learning Resources

### React
- [React Hooks Documentation](https://react.dev/reference/react)
- [React Router Docs](https://reactrouter.com)
- [React Context API](https://react.dev/reference/react/useContext)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com)
- [Tailwind Colors](https://tailwindcss.com/docs/customizing-colors)

### Tools
- [Lucide Icons](https://lucide.dev)
- [VS Code Extensions](https://marketplace.visualstudio.com)

## 🤝 Contributing

1. Clone the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💼 Author

Created as a modern e-commerce frontend solution for Aurora platform.

## 📞 Support

For issues, questions, or suggestions, please create an issue in the repository.

---

**Happy Coding! 🎉**
