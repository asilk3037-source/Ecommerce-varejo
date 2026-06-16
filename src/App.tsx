import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AdminLayout } from './components/layout/AdminLayout';

import { Home } from './pages/shop/Home';
import { Login } from './pages/shop/Login';
import { Register } from './pages/shop/Register';
import { Products } from './pages/shop/Products';
import { ProductDetail } from './pages/shop/ProductDetail';
import { Cart } from './pages/shop/Cart';
import { Checkout } from './pages/shop/Checkout';
import { About } from './pages/shop/About';
import { Profile } from './pages/shop/Profile';

import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminInventory } from './pages/admin/AdminInventory';
import { AdminCustomers } from './pages/admin/AdminCustomers';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminReports } from './pages/admin/AdminReports';

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Shop routes */}
      <Route path="/" element={<ShopLayout><Home /></ShopLayout>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<ShopLayout><Products /></ShopLayout>} />
      <Route path="/products/:id" element={<ShopLayout><ProductDetail /></ShopLayout>} />
      <Route path="/cart" element={<ShopLayout><Cart /></ShopLayout>} />
      <Route path="/checkout" element={<ShopLayout><Checkout /></ShopLayout>} />
      <Route path="/about" element={<ShopLayout><About /></ShopLayout>} />
      <Route path="/profile" element={<ShopLayout><Profile /></ShopLayout>} />
      <Route path="/orders" element={<ShopLayout><Profile /></ShopLayout>} />

      {/* Admin routes */}
      <Route path="/admin" element={
        <AdminRoute>
          <AdminLayout><AdminDashboard /></AdminLayout>
        </AdminRoute>
      } />
      <Route path="/admin/products" element={
        <AdminRoute>
          <AdminLayout><AdminProducts /></AdminLayout>
        </AdminRoute>
      } />
      <Route path="/admin/inventory" element={
        <AdminRoute>
          <AdminLayout><AdminInventory /></AdminLayout>
        </AdminRoute>
      } />
      <Route path="/admin/customers" element={
        <AdminRoute>
          <AdminLayout><AdminCustomers /></AdminLayout>
        </AdminRoute>
      } />
      <Route path="/admin/orders" element={
        <AdminRoute>
          <AdminLayout><AdminOrders /></AdminLayout>
        </AdminRoute>
      } />
      <Route path="/admin/reports" element={
        <AdminRoute>
          <AdminLayout><AdminReports /></AdminLayout>
        </AdminRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
