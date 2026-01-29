import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const CakesMenu = () => {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const response = await axios.get(`${API}/cakes`);
        setCakes(response.data);
      } catch (error) {
        console.error('Error fetching cakes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCakes();
  }, []);

  const handleOrderCake = (cakeId) => {
    navigate(`/order/${cakeId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-stone">Loading cakes...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-darkChocolate mb-4">
            Our Cakes
          </h1>
          <p className="text-stone text-lg max-w-2xl mx-auto">
            Discover our delightful collection of handcrafted cakes, baked fresh daily with love
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8" data-testid="cakes-grid">
          {cakes.map((cake) => (
            <div 
              key={cake.id} 
              className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-xl transition-all duration-300"
              data-testid={`cake-card-${cake.id}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={cake.image_url}
                  alt={cake.name}
                  className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-darkChocolate text-cream px-3 py-1 rounded-full text-sm font-medium">
                  {cake.category}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold text-darkChocolate mb-2">
                  {cake.name}
                </h3>
                <p className="text-stone text-sm mb-4 line-clamp-2">
                  {cake.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="font-mono text-2xl font-bold text-terracotta">
                    ₹{cake.price}
                  </div>
                  <button
                    onClick={() => handleOrderCake(cake.id)}
                    className="bg-darkChocolate text-cream rounded-full px-6 py-2 hover:bg-terracotta transition-colors duration-300 text-sm font-medium"
                    data-testid={`order-cake-btn-${cake.id}`}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};