import { Link } from 'react-router-dom';

export const PaymentFailure = () => {
  return (
    <div className="min-h-screen py-20" data-testid="payment-failure-page">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="bg-white rounded-3xl shadow-soft p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-darkChocolate mb-4">
            Payment Failed
          </h1>
          
          <p className="text-xl text-stone mb-8">
            We couldn't process your payment. Please try again.
          </p>
          
          <div className="bg-softPink rounded-2xl p-6 mb-8">
            <h3 className="font-heading font-semibold text-darkChocolate mb-3">
              What happened?
            </h3>
            <ul className="text-stone text-left space-y-2">
              <li>• Your payment might have been declined by your bank</li>
              <li>• There might have been a network issue</li>
              <li>• You may have cancelled the payment</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/cakes"
              className="bg-darkChocolate text-cream rounded-full px-8 py-4 hover:bg-terracotta transition-colors duration-300 font-medium inline-block"
              data-testid="retry-order-btn"
            >
              Try Again
            </Link>
            
            <Link
              to="/contact"
              className="border border-darkChocolate text-darkChocolate rounded-full px-8 py-4 hover:bg-softPink transition-colors duration-300 inline-block"
              data-testid="contact-support-btn"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};