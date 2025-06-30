import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiCheckCircle, FiCreditCard, FiTruck, FiShoppingBag, FiLock, FiArrowLeft } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { saveShippingAddress, savePaymentMethod } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

// Test credit card data
const TEST_CARDS = {
  visa: {
    number: '4242424242424242',
    expiry: '12/34',
    cvc: '123',
    name: 'Test User'
  },
  mastercard: {
    number: '5555555555554444',
    expiry: '12/34',
    cvc: '123',
    name: 'Test User'
  },
  amex: {
    number: '378282246310005',
    expiry: '12/34',
    cvc: '1234',
    name: 'Test User'
  },
  declined: {
    number: '4000000000000002',
    expiry: '12/34',
    cvc: '123',
    name: 'Test User'
  }
};

const PlaceOrderPage = () => {
  const [activeStep, setActiveStep] = useState('shipping');
  const [selectedTestCard, setSelectedTestCard] = useState('visa');
  const { cartItems, shippingAddress } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      address: shippingAddress.address || '',
      city: shippingAddress.city || '',
      postalCode: shippingAddress.postalCode || '',
      country: shippingAddress.country || '',
      paymentMethod: 'paypal',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
      cardName: '',
    },
  });

  const paymentMethod = watch('paymentMethod');

  // Auto-fill test card details when Stripe is selected
  const handlePaymentMethodChange = (method) => {
    setValue('paymentMethod', method);
    if (method === 'stripe') {
      setValue('cardNumber', TEST_CARDS[selectedTestCard].number);
      setValue('cardExpiry', TEST_CARDS[selectedTestCard].expiry);
      setValue('cardCvc', TEST_CARDS[selectedTestCard].cvc);
      setValue('cardName', TEST_CARDS[selectedTestCard].name);
    }
  };

  // Update test card details when user selects a different test card
  const handleTestCardChange = (cardType) => {
    setSelectedTestCard(cardType);
    if (paymentMethod === 'stripe') {
      setValue('cardNumber', TEST_CARDS[cardType].number);
      setValue('cardExpiry', TEST_CARDS[cardType].expiry);
      setValue('cardCvc', TEST_CARDS[cardType].cvc);
      setValue('cardName', TEST_CARDS[cardType].name);
    }
  };

  const onSubmit = (data) => {
    if (activeStep === 'shipping') {
      dispatch(saveShippingAddress(data));
      setActiveStep('payment');
    } else if (activeStep === 'payment') {
      dispatch(savePaymentMethod(data.paymentMethod));
      setActiveStep('review');
    }
  };

  const PaymentHandler = () => {
    // In a real app, you would process the payment here
    // For demo purposes, we'll just navigate to success page
    navigate('/order-success');
  };

  // Calculate order totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.15;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-indigo-600 hover:text-indigo-800 mr-4"
          >
            <FiArrowLeft className="mr-1" /> Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Order</h1>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Progress Steps */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between">
                <div
                  className={`flex flex-col items-center ${activeStep === 'shipping' ? 'text-indigo-600' : 'text-gray-500'}`}
                >
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${
                      activeStep === 'shipping'
                        ? 'bg-indigo-100 border-indigo-600'
                        : activeStep === 'payment' || activeStep === 'review'
                        ? 'bg-indigo-100 border-indigo-600'
                        : 'bg-gray-100 border-gray-300'
                    }`}
                  >
                    {activeStep === 'shipping' ? (
                      <span className="font-medium">1</span>
                    ) : (
                      <FiCheckCircle className="w-5 h-5 text-indigo-600" />
                    )}
                  </div>
                  <span className="mt-2 text-sm font-medium">Shipping</span>
                </div>

                <div
                  className={`flex-1 h-1 mx-2 ${
                    activeStep === 'payment' || activeStep === 'review' ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                ></div>

                <div
                  className={`flex flex-col items-center ${
                    activeStep === 'payment' ? 'text-indigo-600' : activeStep === 'review' ? 'text-indigo-600' : 'text-gray-500'
                  }`}
                >
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${
                      activeStep === 'payment'
                        ? 'bg-indigo-100 border-indigo-600'
                        : activeStep === 'review'
                        ? 'bg-indigo-100 border-indigo-600'
                        : 'bg-gray-100 border-gray-300'
                    }`}
                  >
                    {activeStep === 'payment' ? (
                      <span className="font-medium">2</span>
                    ) : activeStep === 'review' ? (
                      <FiCheckCircle className="w-5 h-5 text-indigo-600" />
                    ) : (
                      <span className="font-medium text-gray-400">2</span>
                    )}
                  </div>
                  <span className="mt-2 text-sm font-medium">Payment</span>
                </div>

                <div className={`flex-1 h-1 mx-2 ${activeStep === 'review' ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>

                <div
                  className={`flex flex-col items-center ${activeStep === 'review' ? 'text-indigo-600' : 'text-gray-500'}`}
                >
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${
                      activeStep === 'review' ? 'bg-indigo-100 border-indigo-600' : 'bg-gray-100 border-gray-300'
                    }`}
                  >
                    {activeStep === 'review' ? (
                      <span className="font-medium">3</span>
                    ) : (
                      <span className="font-medium text-gray-400">3</span>
                    )}
                  </div>
                  <span className="mt-2 text-sm font-medium">Review</span>
                </div>
              </div>
            </div>

            {/* Form Sections */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Shipping Information */}
              {activeStep === 'shipping' && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Shipping Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        {...register('address', { required: 'Address is required' })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                          errors.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="123 Main St"
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          {...register('city', { required: 'City is required' })}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                            errors.city ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="New York"
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP/Postal Code
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          {...register('postalCode', { required: 'Postal code is required' })}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                            errors.postalCode ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="10001"
                        />
                        {errors.postalCode && (
                          <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <select
                        id="country"
                        {...register('country', { required: 'Country is required' })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                          errors.country ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                      </select>
                      {errors.country && (
                        <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-150 ease-in-out"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {/* Payment Information */}
              {activeStep === 'payment' && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Payment Method</h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="paypal"
                          value="paypal"
                          checked={paymentMethod === 'paypal'}
                          onChange={() => handlePaymentMethodChange('paypal')}
                          className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <label htmlFor="paypal" className="flex items-center text-sm font-medium text-gray-700">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                            alt="PayPal"
                            className="h-6 ml-2"
                          />
                        </label>
                      </div>

                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="stripe"
                          value="stripe"
                          checked={paymentMethod === 'stripe'}
                          onChange={() => handlePaymentMethodChange('stripe')}
                          className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <label htmlFor="stripe" className="flex items-center text-sm font-medium text-gray-700">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                            alt="Stripe"
                            className="h-6 ml-2"
                          />
                        </label>
                      </div>
                    </div>

                    {paymentMethod === 'stripe' && (
                      <>
                        {/* Test Card Selector */}
                        <div className="bg-indigo-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-indigo-800 mb-2">Developer Note:</h4>
                          <p className="text-xs text-indigo-700 mb-3">
                            You're using test mode. Select a test card to simulate different scenarios:
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => handleTestCardChange('visa')}
                              className={`text-xs py-1 px-2 rounded ${selectedTestCard === 'visa' ? 'bg-indigo-600 text-white' : 'bg-white border border-indigo-200 text-indigo-700'}`}
                            >
                              Visa (Success)
                            </button>
                            <button
                              type="button"
                              onClick={() => handleTestCardChange('mastercard')}
                              className={`text-xs py-1 px-2 rounded ${selectedTestCard === 'mastercard' ? 'bg-indigo-600 text-white' : 'bg-white border border-indigo-200 text-indigo-700'}`}
                            >
                              Mastercard
                            </button>
                            <button
                              type="button"
                              onClick={() => handleTestCardChange('amex')}
                              className={`text-xs py-1 px-2 rounded ${selectedTestCard === 'amex' ? 'bg-indigo-600 text-white' : 'bg-white border border-indigo-200 text-indigo-700'}`}
                            >
                              Amex
                            </button>
                            <button
                              type="button"
                              onClick={() => handleTestCardChange('declined')}
                              className={`text-xs py-1 px-2 rounded ${selectedTestCard === 'declined' ? 'bg-indigo-600 text-white' : 'bg-white border border-indigo-200 text-indigo-700'}`}
                            >
                              Declined
                            </button>
                          </div>
                        </div>

                        {/* Credit Card Form */}
                        <div className="border-t pt-6 mt-6">
                          <h3 className="text-lg font-medium text-gray-800 mb-4">Credit Card Details</h3>
                          
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                                Name on Card
                              </label>
                              <input
                                type="text"
                                id="cardName"
                                {...register('cardName', {
                                  required: paymentMethod === 'stripe' ? 'Card name is required' : false,
                                })}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                                  errors.cardName ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="John Smith"
                              />
                              {errors.cardName && (
                                <p className="mt-1 text-sm text-red-600">{errors.cardName.message}</p>
                              )}
                            </div>

                            <div>
                              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                Card Number
                              </label>
                              <input
                                type="text"
                                id="cardNumber"
                                {...register('cardNumber', {
                                  required: paymentMethod === 'stripe' ? 'Card number is required' : false,
                                  pattern: {
                                    value: /^[0-9\s]{13,19}$/,
                                    message: 'Invalid card number',
                                  },
                                })}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                                  errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="4242 4242 4242 4242"
                              />
                              {errors.cardNumber && (
                                <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                                  Expiry Date
                                </label>
                                <input
                                  type="text"
                                  id="cardExpiry"
                                  {...register('cardExpiry', {
                                    required: paymentMethod === 'stripe' ? 'Expiry date is required' : false,
                                    pattern: {
                                      value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                                      message: 'Invalid expiry date (MM/YY)',
                                    },
                                  })}
                                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                                    errors.cardExpiry ? 'border-red-500' : 'border-gray-300'
                                  }`}
                                  placeholder="MM/YY"
                                />
                                {errors.cardExpiry && (
                                  <p className="mt-1 text-sm text-red-600">{errors.cardExpiry.message}</p>
                                )}
                              </div>

                              <div>
                                <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-1">
                                  CVC
                                </label>
                                <input
                                  type="text"
                                  id="cardCvc"
                                  {...register('cardCvc', {
                                    required: paymentMethod === 'stripe' ? 'CVC is required' : false,
                                    pattern: {
                                      value: /^[0-9]{3,4}$/,
                                      message: 'Invalid CVC',
                                    },
                                  })}
                                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                                    errors.cardCvc ? 'border-red-500' : 'border-gray-300'
                                  }`}
                                  placeholder="123"
                                />
                                {errors.cardCvc && (
                                  <p className="mt-1 text-sm text-red-600">{errors.cardCvc.message}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveStep('shipping')}
                      className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150 ease-in-out"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-150 ease-in-out"
                    >
                      Continue to Review
                    </button>
                  </div>
                </div>
              )}

              {/* Order Review */}
              {activeStep === 'review' && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Review Your Order</h2>
                  
                  <div className="space-y-8">
                    {/* Shipping Info Review */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-800">Shipping Information</h3>
                        <button
                          type="button"
                          onClick={() => setActiveStep('shipping')}
                          className="text-sm text-indigo-600 hover:text-indigo-800"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700">{shippingAddress.address}</p>
                        <p className="text-gray-700">
                          {shippingAddress.city}, {shippingAddress.postalCode}
                        </p>
                        <p className="text-gray-700">{shippingAddress.country}</p>
                      </div>
                    </div>

                    {/* Payment Info Review */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-800">Payment Method</h3>
                        <button
                          type="button"
                          onClick={() => setActiveStep('payment')}
                          className="text-sm text-indigo-600 hover:text-indigo-800"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center">
                          {paymentMethod === 'paypal' ? (
                            <>
                              <img
                                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                                alt="PayPal"
                                className="h-6 mr-2"
                              />
                              <span className="text-gray-700">PayPal</span>
                            </>
                          ) : (
                            <>
                              <img
                                src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                                alt="Stripe"
                                className="h-6 mr-2"
                              />
                              <span className="text-gray-700">Credit Card ending in •••• 4242</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Order Items Review */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Order Items</h3>
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <div
                            key={item._id}
                            className="flex items-center justify-between border-b pb-4"
                          >
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-full object-cover object-center"
                                />
                              </div>
                              <div className="ml-4">
                                <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <p className="text-sm font-medium text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          name="terms"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-medium text-gray-700">
                          I agree to the{' '}
                          <a href="#" className="text-indigo-600 hover:text-indigo-500">
                            Terms and Conditions
                          </a>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveStep('payment')}
                      className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150 ease-in-out"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={PaymentHandler}
                      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-150 ease-in-out flex items-center"
                    >
                      <FiLock className="mr-2" />
                      Payment
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 mr-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{item.title}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-3 mt-3">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-bold text-indigo-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center text-sm text-gray-500">
                <FiLock className="mr-2" />
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;