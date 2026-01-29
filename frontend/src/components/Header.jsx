import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-cream/80 border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" data-testid="home-link">
            <div className="text-3xl font-heading font-bold text-darkChocolate tracking-tight">
              Dora Cake
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="text-darkChocolate hover:text-terracotta transition-colors duration-300 font-medium"
              data-testid="nav-home"
            >
              Home
            </Link>
            <Link 
              to="/cakes" 
              className="text-darkChocolate hover:text-terracotta transition-colors duration-300 font-medium"
              data-testid="nav-cakes"
            >
              Our Cakes
            </Link>
            <Link 
              to="/contact" 
              className="text-darkChocolate hover:text-terracotta transition-colors duration-300 font-medium"
              data-testid="nav-contact"
            >
              Contact
            </Link>
          </div>

          <Link 
            to="/cakes" 
            className="bg-darkChocolate text-cream rounded-full px-8 py-3 hover:bg-terracotta transition-colors duration-300 font-medium"
            data-testid="order-now-header-btn"
          >
            Order Now
          </Link>
        </div>
      </nav>
    </header>
  );
};