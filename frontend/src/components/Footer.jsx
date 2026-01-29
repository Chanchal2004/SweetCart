import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-softPink border-t border-border mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-heading font-bold text-darkChocolate mb-4">
              Dora Cake
            </h3>
            <p className="text-stone text-sm leading-relaxed">
              Fresh Cakes, Sweet Moments. Handcrafted with love and the finest ingredients.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-darkChocolate mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-stone hover:text-terracotta transition-colors" data-testid="footer-home">
                Home
              </Link>
              <Link to="/cakes" className="text-stone hover:text-terracotta transition-colors" data-testid="footer-cakes">
                Our Cakes
              </Link>
              <Link to="/contact" className="text-stone hover:text-terracotta transition-colors" data-testid="footer-contact">
                Contact Us
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-darkChocolate mb-4">Legal</h4>
            <div className="flex flex-col gap-2">
              <Link to="/privacy-policy" className="text-stone hover:text-terracotta transition-colors" data-testid="footer-privacy">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-stone hover:text-terracotta transition-colors" data-testid="footer-terms">
                Terms & Conditions
              </Link>
              <Link to="/refund-policy" className="text-stone hover:text-terracotta transition-colors" data-testid="footer-refund">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone text-sm">© 2025 Dora Cake. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-sm text-stone">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Secure Payments
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};