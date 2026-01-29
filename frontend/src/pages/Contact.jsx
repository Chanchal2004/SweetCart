import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await axios.post(`${API}/contact`, formData);
      toast.success('Thank you! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-darkChocolate mb-4">
            Get in Touch
          </h1>
          <p className="text-stone text-lg">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-heading font-bold text-darkChocolate mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-softPink rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-darkChocolate">Email</div>
                    <div className="text-stone">doracake@gmail.com</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-softPink rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-darkChocolate">Business Hours</div>
                    <div className="text-stone">Mon - Sat: 9:00 AM - 8:00 PM</div>
                    <div className="text-stone">Sunday: 10:00 AM - 6:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-softPink rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-darkChocolate mb-3">
                Why Choose Dora Cake?
              </h3>
              <ul className="space-y-2 text-stone">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Freshly Baked Daily
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Quality Ingredients
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  On-Time Delivery
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Secure Online Payments
                </li>
              </ul>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-soft">
              <h3 className="font-heading font-semibold text-darkChocolate text-xl mb-6">
                Send us a Message
              </h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-darkChocolate mb-2">
                    Your Name <span className="text-terracotta">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-border px-0 py-3 focus:border-terracotta focus:ring-0 focus:outline-none rounded-none placeholder:text-stone/50"
                    placeholder="John Doe"
                    required
                    data-testid="contact-name-input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-darkChocolate mb-2">
                    Email Address <span className="text-terracotta">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-border px-0 py-3 focus:border-terracotta focus:ring-0 focus:outline-none rounded-none placeholder:text-stone/50"
                    placeholder="john@example.com"
                    required
                    data-testid="contact-email-input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-darkChocolate mb-2">
                    Message <span className="text-terracotta">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full bg-transparent border border-border rounded-xl px-4 py-3 focus:border-terracotta focus:ring-0 focus:outline-none placeholder:text-stone/50 resize-none"
                    placeholder="How can we help you?"
                    required
                    data-testid="contact-message-input"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-6 bg-darkChocolate text-cream rounded-full px-8 py-4 hover:bg-terracotta transition-colors duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="contact-submit-btn"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};