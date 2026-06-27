import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Profile from './pages/Profile';
import AdminDashboard from './admin/Dashboard';
import ProductManagement from './admin/ProductManagement';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { ProductProvider } from './context/ProductContext';
import Contact from './pages/Contact';



function App() {
  return (
    <AuthProvider>
      <ProductProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* PUBLIC STOREFRONT */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="profile" element={<Profile />} />
              <Route path="shop/:id" element={<ProductDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* PROTECTED ADMIN PANEL */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<ProductManagement />} />
            </Route>
          </Routes>
        </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;