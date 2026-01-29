import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Home = () => {
  const [cakes, setCakes] = useState([]);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const response = await axios.get(`${API}/cakes`);
        setCakes(response.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching cakes:', error);
      }
    };
    fetchCakes();
  }, []);

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[90vh] flex items-center grain">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-20 w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-darkChocolate leading-tight tracking-tight">
                Fresh Cakes,
                <span className="block italic text-terracotta">Sweet Moments</span>
              </h1>
              
              <p className="text-lg md:text-xl text-stone leading-relaxed max-w-lg">
                Handcrafted with love and the finest ingredients. Every cake tells a story, every bite creates a memory.
              </p>
              
              <div className="flex gap-4">
                <Link
                  to="/cakes"
                  className="bg-darkChocolate text-cream rounded-full px-10 py-4 hover:bg-terracotta transition-colors duration-300 font-medium inline-block"
                  data-testid="hero-order-now-btn"
                >
                  Order Now
                </Link>
              </div>
              
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-darkChocolate">100%</div>
                  <div className="text-sm text-stone mt-1">Freshly Baked</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-darkChocolate">24/7</div>
                  <div className="text-sm text-stone mt-1">Order Online</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-darkChocolate">Safe</div>
                  <div className="text-sm text-stone mt-1">Secure Payments</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1681034970544-6dd762e18af1?crop=entropy&cs=srgb&fm=jpg&q=85"
                alt="Elegant strawberry cake"
                className="rounded-3xl w-full aspect-[4/5] object-cover shadow-soft"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-softPink grain">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-darkChocolate mb-4">
              Popular Favorites
            </h2>
            <p className="text-stone text-lg max-w-2xl mx-auto">
              Our most loved creations, baked fresh daily
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {cakes.map((cake) => (
              <div key={cake.id} className="group" data-testid={`featured-cake-${cake.id}`}>
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img
                    src={cake.image_url}
                    alt={cake.name}
                    className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-heading font-semibold text-darkChocolate mb-2">
                    {cake.name}
                  </h3>
                  <p className="text-stone text-sm mb-3">{cake.description}</p>
                  <div className="font-mono text-terracotta font-medium">₹{cake.price}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/cakes"
              className="border border-darkChocolate text-darkChocolate rounded-full px-8 py-4 hover:bg-softPink hover:border-terracotta hover:text-terracotta transition-all duration-300 inline-block"
              data-testid="view-all-cakes-btn"
            >
              View All Cakes
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-softPink rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold text-darkChocolate mb-3">
                Quality Ingredients
              </h3>
              <p className="text-stone leading-relaxed">
                We use only the finest ingredients to create cakes that taste as good as they look.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-softPink rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold text-darkChocolate mb-3">
                On-Time Delivery
              </h3>
              <p className="text-stone leading-relaxed">
                Your celebrations are important to us. We ensure timely delivery every time.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-softPink rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold text-darkChocolate mb-3">
                Secure Payments
              </h3>
              <p className="text-stone leading-relaxed">
                Shop with confidence. All transactions are encrypted and secure.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};