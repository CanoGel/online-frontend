import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import { queryClient } from './lib/queryClient';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import CartPage from './pages/CartPage';
import PlaceOrderPage from './pages/PlaceOrder';
import OrderSuccessPage from './pages/OrderSuccessPage';

// Footer-related pages
import NewReleasesPage from './pages/NewReleasesPage';
import BestSellersPage from './pages/BestSellersPage';
import FAQsPage from './pages/FAQsPage';
import ReturnsPage from './pages/ReturnsPage';
import ContactUsPage from './pages/ContactUsPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-right" />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/books" element={<BookListPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/placeorder" element={<PlaceOrderPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/books/:id" element={<BookDetailPage />} />

              {/* Footer-related routes */}
              <Route path="/new-releases" element={<NewReleasesPage />} />
              <Route path="/best-sellers" element={<BestSellersPage />} />
              <Route path="/faqs" element={<FAQsPage />} />
              <Route path="/returns" element={<ReturnsPage />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route path="/shipping-policy" element={<ShippingPolicyPage />} />

              {/* Protected routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
              </Route>

              {/* Admin routes */}
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminPage />} />
              </Route>

              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;