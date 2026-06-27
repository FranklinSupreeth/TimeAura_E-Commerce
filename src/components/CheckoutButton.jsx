import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; // Assuming you have a CartContext

const CheckoutButton = () => {
  const { user } = useAuth();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const totalAmount = getTotalPrice();

  const handleCheckout = async () => {
    if (!user) {
      alert("Please login to complete your purchase.");
      return;
    }

    setLoading(true);

    try {
      // STEP 1: Create Order on your Node.js Backend
      const { data: order } = await axios.post('http://localhost:5000/api/payment/orders', {
        amount: totalAmount, 
      });

      // STEP 2: Configuration for Razorpay Modal
      const options = {
        key: "rzp_test_YOUR_KEY_ID", // Replace with your actual Test Key ID
        amount: order.amount,
        currency: order.currency,
        name: "TimeAura Luxury",
        description: `Purchase of ${cartItems.length} Timepieces`,
        image: "https://your-logo-url.com/logo.png", // Optional: Your Brand Logo
        order_id: order.id,
        
        // This function runs after successful payment
        handler: async (response) => {
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderDetails: {
              userId: user._id,
              items: cartItems,
              totalAmount: totalAmount,
              shippingAddress: user.address || "Default Address"
            }
          };

          try {
            // STEP 3: Verify Payment on Backend & Save Order
            const verifyRes = await axios.post('http://localhost:5000/api/payment/verify', paymentData);
            
            if (verifyRes.status === 200) {
              clearCart();
              window.location.href = "/profile"; // Redirect to orders page
              alert("Transaction Successful. Your timepiece is being prepared.");
            }
          } catch (err) {
            console.error("Verification Failed", err);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: "9999999999" // Optional
        },
        theme: {
          color: "#18181b" // Zinc-900 to match your luxury theme
        },
      };

      // STEP 4: Open the Razorpay Modal
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Could not initialize checkout. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading || cartItems.length === 0}
      className="w-full bg-zinc-900 text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-black transition-all disabled:bg-zinc-300 flex items-center justify-center gap-2"
    >
      {loading ? "Securing Connection..." : "Proceed to Secure Checkout"}
    </button>
  );
};

export default CheckoutButton;