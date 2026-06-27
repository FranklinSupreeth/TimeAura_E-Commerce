import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { formatINR } from '../utils/format';
import { ArrowLeft, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL?.replace('/products', '') || 'http://localhost:5000/api';
const RAZORPAY_KEY_ID = 'rzp_test_ST8sFviXL3tXig';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Customer Info, 2: Shipping, 3: Payment, 4: Confirmation
  const [loading, setLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState(null);
  const [error, setError] = useState('');

  // Load Razorpay SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    phone: '',
    shippingAddress: '',
    city: '',
    postalCode: '',
    country: 'India',
    paymentMethod: 'Credit Card',
  });

  // Redirect to shop if cart is empty
  if (cart.length === 0 && !orderCreated) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 py-20">
        <AlertCircle size={48} className="text-red-400" />
        <h2 className="text-2xl font-serif">Your cart is empty</h2>
        <p className="text-zinc-500 text-sm tracking-widest uppercase">Add items to proceed to checkout</p>
        <Link to="/shop" className="bg-black text-white px-8 py-4 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-zinc-800 transition-all">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateStep = (currentStep) => {
    if (currentStep === 1) {
      if (!formData.customerName || !formData.customerEmail || !formData.phone) {
        setError('Please fill in all customer information');
        return false;
      }
      if (!formData.customerEmail.includes('@')) {
        setError('Please enter a valid email address');
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.shippingAddress || !formData.city || !formData.postalCode) {
        setError('Please fill in all shipping details');
        return false;
      }
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleCreateOrder = async () => {
    if (!validateStep(3)) return;

    setLoading(true);
    setError('');

    try {
      const totalAmount = cartTotal + (cartTotal * 0.15); // Include tax
      const fullAddress = `${formData.shippingAddress}, ${formData.city}, ${formData.postalCode}, ${formData.country}`;

      // Step 1: Create Razorpay order
      console.log('Creating Razorpay order for amount:', totalAmount);
      const razorpayResponse = await axios.post(`${API_BASE_URL}/payment/orders`, {
        amount: totalAmount,
      });

      const razorpayOrder = razorpayResponse.data;
      console.log('Razorpay order created:', razorpayOrder);

      // Step 2: Setup Razorpay payment options
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: totalAmount * 100, // Amount in paise
        currency: 'INR',
        order_id: razorpayOrder.id,
        name: 'TimeAura',
        description: `Order for ${formData.customerName}`,
        customer_notification: 1,
        handler: async (paymentResponse) => {
          try {
            console.log('Payment successful:', paymentResponse);

            // Step 3: Verify payment signature
            const verifyResponse = await axios.post(`${API_BASE_URL}/payment/verify`, {
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
            });

            console.log('Payment verified:', verifyResponse.data);

            // Step 4: Create local order after verification
            const transactionId = paymentResponse.razorpay_payment_id;
            const orderData = {
              customerName: formData.customerName,
              customerEmail: formData.customerEmail,
              phone: formData.phone,
              items: cart.map(item => ({
                productId: item._id || item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
                brand: item.brand || 'TimeAura',
              })),
              totalAmount: totalAmount,
              shippingAddress: fullAddress,
              paymentMethod: formData.paymentMethod,
              transactionId: transactionId,
              razorpayOrderId: razorpayOrder.id,
              paymentStatus: 'Completed',
              status: 'Processing',
            };

            const createOrderResponse = await axios.post(`${API_BASE_URL}/orders`, orderData);
            
            setOrderCreated({
              orderId: createOrderResponse.data._id || createOrderResponse.data.orderId,
              transactionId: transactionId,
              totalAmount: totalAmount,
            });

            // Clear cart after successful order
            clearCart();
            setStep(4);
            setLoading(false);
          } catch (verifyErr) {
            console.error('Payment verification or order creation failed:', verifyErr);
            setError('Payment verification failed. Please contact support.');
            setLoading(false);
          }
        },
        prefill: {
          name: formData.customerName,
          email: formData.customerEmail,
          contact: formData.phone,
        },
        theme: {
          color: '#000000',
        },
        modal: {
          ondismiss: () => {
            setError('Payment cancelled');
            setLoading(false);
          },
        },
      };

      // Step 5: Open Razorpay checkout
      if (window.Razorpay) {
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        setError('Razorpay SDK not loaded. Please refresh and try again.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error in payment process:', err);
      setError(err.response?.data?.message || 'Failed to process payment. Please try again.');
      setLoading(false);
    }
  };

  const tax = cartTotal * 0.15;
  const total = cartTotal + tax;

  return (
    <div className="min-h-screen bg-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <Link to="/cart" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-400 hover:text-black mb-8 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Cart
          </Link>
          <h1 className="text-4xl font-serif">Checkout</h1>
          <p className="text-zinc-500 text-sm mt-2 uppercase tracking-widest">Step {step} of 4</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3 items-start">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Form */}
          <div className="lg:col-span-2">
            {step === 4 ? (
              // Order Confirmation
              <div className="text-center py-20 space-y-6">
                <CheckCircle size={64} className="text-emerald-600 mx-auto" />
                <h2 className="text-3xl font-serif">Order Confirmed!</h2>
                <div className="space-y-2 text-zinc-600">
                  <p className="text-sm">Thank you for your purchase</p>
                  <p className="text-2xl font-bold text-zinc-900 my-4">{orderCreated?.orderId}</p>
                  <p className="text-xs uppercase tracking-widest">Transaction ID: {orderCreated?.transactionId}</p>
                </div>
                <div className="bg-zinc-50 p-6 rounded-lg border border-zinc-200 my-8">
                  <p className="text-xs uppercase tracking-widest text-zinc-600 mb-2">Order Total</p>
                  <p className="text-3xl font-serif">{formatINR(orderCreated?.totalAmount || 0)}</p>
                </div>
                <p className="text-sm text-zinc-600">A confirmation email has been sent to <strong>{formData.customerEmail}</strong></p>
                <div className="flex gap-4 pt-4 justify-center">
                  <Link to="/shop" className="bg-black text-white px-8 py-4 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-zinc-800 transition-all">
                    Continue Shopping
                  </Link>
                  <Link to="/" className="border border-black text-black px-8 py-4 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-black hover:text-white transition-all">
                    Return Home
                  </Link>
                </div>
              </div>
            ) : (
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                {/* Step 1: Customer Information */}
                {step === 1 && (
                  <div className="space-y-6 bg-zinc-50 p-8 rounded-lg border border-zinc-200">
                    <h2 className="text-xl font-serif">Billing Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="customerName"
                        placeholder="Full Name"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-zinc-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <input
                        type="email"
                        name="customerEmail"
                        placeholder="Email Address"
                        value={formData.customerEmail}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-zinc-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-zinc-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-black md:col-span-2"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Shipping Address */}
                {step === 2 && (
                  <div className="space-y-6 bg-zinc-50 p-8 rounded-lg border border-zinc-200">
                    <h2 className="text-xl font-serif">Shipping Address</h2>
                    
                    <textarea
                      name="shippingAddress"
                      placeholder="Street Address"
                      value={formData.shippingAddress}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full px-4 py-3 border border-zinc-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-zinc-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-zinc-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-zinc-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-black"
                      >
                        <option value="India">India</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment Method - Razorpay */}
                {step === 3 && (
                  <div className="space-y-6 bg-zinc-50 p-8 rounded-lg border border-zinc-200">
                    <h2 className="text-xl font-serif">Payment Method</h2>
                    
                    {/* Razorpay Badge */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-blue-600 font-bold mb-1">Secure Payment Gateway</p>
                          <p className="text-lg font-semibold text-zinc-900">Razorpay Checkout</p>
                          <p className="text-xs text-zinc-600 mt-2">Fast, secure, and trusted by millions</p>
                        </div>
                        <div className="text-right">
                          <img 
                            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 40'%3E%3Ctext x='10' y='25' font-size='20' font-weight='bold' fill='%233C52A0'%3ERazorpay%3C/text%3E%3C/svg%3E" 
                            alt="Razorpay" 
                            className="h-8"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Payment Methods Available */}
                    <div className="bg-white p-6 rounded-lg border border-zinc-200">
                      <p className="text-sm font-semibold mb-4 text-zinc-900">Accepted Payment Methods:</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex flex-col items-center p-3 border border-zinc-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all">
                          <div className="text-2xl mb-2">💳</div>
                          <p className="text-xs font-semibold text-zinc-700">Credit Card</p>
                        </div>
                        <div className="flex flex-col items-center p-3 border border-zinc-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all">
                          <div className="text-2xl mb-2">🏧</div>
                          <p className="text-xs font-semibold text-zinc-700">Debit Card</p>
                        </div>
                        <div className="flex flex-col items-center p-3 border border-zinc-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all">
                          <div className="text-2xl mb-2">📱</div>
                          <p className="text-xs font-semibold text-zinc-700">UPI</p>
                        </div>
                        <div className="flex flex-col items-center p-3 border border-zinc-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all">
                          <div className="text-2xl mb-2">🏦</div>
                          <p className="text-xs font-semibold text-zinc-700">Net Banking</p>
                        </div>
                      </div>
                    </div>

                    {/* Test Card Details */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                      <p className="text-sm font-semibold text-yellow-900 mb-4">🧪 Test Credentials (Demo Mode):</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <p className="text-yellow-800 font-mono font-bold">Card: 4111 1111 1111 1111</p>
                          <p className="text-yellow-700 text-[11px] mt-1">Expiry: 12/25 | CVV: 123</p>
                        </div>
                        <div>
                          <p className="text-yellow-800 font-semibold">All details should be:</p>
                          <p className="text-yellow-700 text-[11px]">Future expiry + Any CVV = Success</p>
                        </div>
                      </div>
                    </div>

                    {/* Security Info */}
                    <div className="flex gap-4 text-xs text-zinc-600 bg-white p-4 rounded-lg border border-zinc-200 items-start">
                      <div className="text-lg">🔒</div>
                      <div>
                        <p className="font-semibold text-zinc-900 mb-1">Your payment is secure</p>
                        <p>This checkout page is protected by bank-level encryption (256-bit SSL). Your card details are never stored on our servers.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 pt-8">
                  {step > 1 && (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="flex-1 border border-black text-black py-4 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-black hover:text-white transition-all rounded-sm"
                    >
                      Previous
                    </button>
                  )}
                  
                  {step < 3 ? (
                    <button
                      onClick={handleNextStep}
                      className="flex-1 bg-black text-white py-4 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-zinc-800 transition-all rounded-sm"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      onClick={handleCreateOrder}
                      disabled={loading}
                      className="flex-1 bg-blue-600 text-white py-4 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-blue-700 disabled:bg-zinc-400 transition-all rounded-sm flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader size={14} className="animate-spin" /> Processing...
                        </>
                      ) : (
                        '💳 Proceed to Razorpay'
                      )}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-50 p-8 sticky top-32 border border-zinc-200 rounded-lg">
              <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold mb-6">Order Summary</h3>

              {/* Items */}
              <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item._id || item.id} className="flex justify-between text-xs pb-2 border-b border-zinc-200">
                    <span className="text-zinc-600">
                      {item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name}
                      <span className="font-bold ml-1">× {item.quantity}</span>
                    </span>
                    <span className="text-zinc-900 font-medium">{formatINR(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t border-zinc-300 pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600">Subtotal</span>
                  <span className="text-zinc-900 font-medium">{formatINR(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600">Tax (15%)</span>
                  <span className="text-zinc-900 font-medium">{formatINR(tax)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600">Shipping</span>
                  <span className="text-emerald-600 text-xs uppercase font-bold">Complimentary</span>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-zinc-300">
                  <span className="text-xs uppercase tracking-widest font-bold">Total Due</span>
                  <span className="text-2xl font-serif text-zinc-900">{formatINR(total)}</span>
                </div>
              </div>

              {/* Info */}
              <div className="mt-8 pt-6 border-t border-zinc-200 space-y-3 text-xs text-zinc-600">
                <p>✓ Secure 256-bit SSL encryption</p>
                <p>✓ 30-day return policy</p>
                <p>✓ Lifetime warranty included</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
