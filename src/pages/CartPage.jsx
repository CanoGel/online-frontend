import React from 'react';
import { FiShoppingBag, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const checkoutHandler = () => {
    navigate('/placeorder');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <FiShoppingBag className="mr-2" /> Your Shopping Cart
      </h1>
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
            <FiShoppingBag className="w-full h-full" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Start adding some items to your cart</p>
          <Link 
            to="/books"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item._id} className="p-4 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden">
                        <img
                          src={item.image?.startsWith('http') ? item.image : `https://online-book-backend.onrender.com${item.image}`}
                          alt={item.title}
                          className="w-full h-full object-cover object-center"
                          onError={e => { e.target.src = '/images/book-placeholder.jpg'; }}
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                              {item.title}
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">by {item.author}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="ml-4 text-gray-400 hover:text-red-500"
                          >
                            <FiTrash2 className="h-5 w-5" />
                          </button>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <button 
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              className="p-1 text-gray-400 hover:text-gray-500"
                              disabled={item.quantity <= 1}
                            >
                              <FiMinus className="h-4 w-4" />
                            </button>
                            <span className="mx-2 text-gray-700">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              className="p-1 text-gray-400 hover:text-gray-500"
                              disabled={item.quantity >= item.countInStock}
                            >
                              <FiPlus className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900">Total</span>
                  <span className="text-lg font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={checkoutHandler}
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Place Order
                </button>
              </div>
              <div className="mt-4 text-center">
                <Link 
                  to="/books"
                  className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;