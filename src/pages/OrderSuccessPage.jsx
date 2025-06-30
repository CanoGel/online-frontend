import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import { getOrderDetails } from '../api/orders';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const id = state?.orderId;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setError('');
        setLoading(true);
        if (!id) throw new Error('Order ID is missing');
        const data = await getOrderDetails(id);
        setOrder(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="mt-3 text-xl font-medium text-gray-900">Error loading order</h1>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={() => navigate('/orders')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            View Your Orders
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
            <svg
              className="h-6 w-6 text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="mt-3 text-xl font-medium text-gray-900">Order not found</h1>
          <p className="mt-2 text-gray-600">We couldn't find the order you're looking for.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Order Confirmation Header */}
        <div className="text-center mb-10">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <FiCheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h1 className="mt-3 text-3xl font-extrabold text-gray-900">Order Confirmed!</h1>
          <p className="mt-2 text-lg text-gray-600">
            Thank you for your purchase. Your order #{order._id} has been received.
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {order.user?.email && <>We've sent a confirmation email to {order.user.email}.</>}
          </p>
        </div>

        {/* Order Items */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Order Items</h2>
          </div>
          <div className="px-6 py-5">
            <div className="space-y-4">
              {order.orderItems && order.orderItems.length > 0 ? (
                order.orderItems.map((item, idx) => (
                  <div key={item._id || idx} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                        <img
                          src={
                            item.image?.startsWith('http')
                              ? item.image
                              : `http://localhost:5000${item.image}`
                          }
                          alt={item.title}
                          className="w-full h-full object-cover object-center"
                          onError={e => { e.target.src = '/images/book-placeholder.jpg'; }}
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))
              ) : (
                <div>No items found in this order.</div>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
          </div>
          <div className="px-6 py-5 space-y-2">
            <div className="flex justify-between text-sm font-medium text-gray-600">
              <span>Items</span>
              <span>${order.itemsPrice?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-600">
              <span>Shipping</span>
              <span>${order.shippingPrice?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-600">
              <span>Tax</span>
              <span>${order.taxPrice?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t pt-2 mt-2 font-bold text-lg">
              <span>Total</span>
              <span>${order.totalPrice?.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Shipping Address</h2>
          </div>
          <div className="px-6 py-5 text-gray-700">
            <div>{order.shippingAddress?.address}</div>
            <div>
              {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Link
            to="/books"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
          >
            View Order History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;