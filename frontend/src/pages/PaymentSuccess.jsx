import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pollingAttempts, setPollingAttempts] = useState(0);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    const pollPaymentStatus = async () => {
      try {
        const statusResponse = await axios.get(`${API}/checkout/status/${sessionId}`);
        
        if (statusResponse.data.payment_status === 'paid') {
          const orderId = statusResponse.data.metadata.order_id;
          const orderResponse = await axios.get(`${API}/orders/${orderId}`);
          setOrder(orderResponse.data);
          setLoading(false);
        } else if (pollingAttempts < 5) {
          setTimeout(() => {
            setPollingAttempts(prev => prev + 1);
          }, 2000);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        setLoading(false);
      }
    };

    pollPaymentStatus();
  }, [sessionId, pollingAttempts]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="payment-loading">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-terracotta border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl text-stone">Verifying payment...</p>
        </div>
      </div>
    );
  }

  if (!sessionId || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-heading font-bold text-darkChocolate mb-4">
            No Order Found
          </h1>
          <p className="text-stone mb-8">We couldn't find your order details.</p>
          <Link
            to="/cakes"
            className="bg-darkChocolate text-cream rounded-full px-8 py-4 hover:bg-terracotta transition-colors duration-300 font-medium inline-block"
          >
            Browse Cakes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20" data-testid="payment-success-page">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="bg-white rounded-3xl shadow-soft p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-darkChocolate mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-xl text-stone mb-8">
            Thank you for ordering from Dora Cake!
          </p>
          
          <div className="bg-softPink rounded-2xl p-6 mb-8 text-left">
            <h2 className="font-heading font-semibold text-darkChocolate text-lg mb-4">
              Order Details
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-stone">Order ID</span>
                <span className="font-medium text-darkChocolate font-mono" data-testid="order-id-display">
                  {order.order_id}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-stone">Cake</span>
                <span className="font-medium text-darkChocolate">{order.cake_name}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-stone">Quantity</span>
                <span className="font-medium text-darkChocolate">{order.quantity}</span>
              </div>
              
              <div className="flex justify-between border-t border-border pt-3">
                <span className="font-heading font-semibold text-darkChocolate">Total Amount</span>
                <span className="font-mono text-xl font-bold text-terracotta">
                  ₹{order.total_amount}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-stone">Payment Status</span>
                <span className="text-success font-medium" data-testid="payment-status-display">Paid</span>
              </div>
            </div>
          </div>
          
          <div className="bg-cream rounded-2xl p-6 mb-8">
            <p className="text-stone">
              <strong className="text-darkChocolate">Estimated Delivery:</strong> 2-3 business days
            </p>
            <p className="text-stone mt-2">
              We've sent confirmation details to your registered contact information.
            </p>
          </div>
          
          <Link
            to="/cakes"
            className="bg-darkChocolate text-cream rounded-full px-8 py-4 hover:bg-terracotta transition-colors duration-300 font-medium inline-block"
            data-testid="order-more-cakes-btn"
          >
            Order More Cakes
          </Link>
        </div>
      </div>
    </div>
  );
};