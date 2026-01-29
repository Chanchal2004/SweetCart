import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const OrderDetails = () => {
  const { cakeId } = useParams();
  const navigate = useNavigate();

  const [cake, setCake] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_mobile: '',
    customer_email: '',
    delivery_address: ''
  });

  // ---------------- FETCH CAKE ----------------
  useEffect(() => {
    if (!cakeId) return;

    const fetchCake = async () => {
      try {
        const response = await axios.get(`${API}/cakes/${cakeId}`);
        setCake(response.data);
      } catch (error) {
        console.error('Error fetching cake:', error);
        toast.error('Failed to load cake details');
      } finally {
        setLoading(false);
      }
    };

    fetchCake();
  }, [cakeId]);

  // ---------------- FORM HANDLERS ----------------
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  // ---------------- SUBMIT ORDER ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customer_name || !formData.customer_mobile || !formData.delivery_address) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.customer_mobile.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    setSubmitting(true);

    try {
      // 1️⃣ CREATE ORDER
      const orderResponse = await axios.post(`${API}/orders`, {
        cake_id: cakeId,
        quantity: quantity,
        ...formData
      });

      const orderId = orderResponse.data.order_id;

      // 2️⃣ CREATE RAZORPAY ORDER
      const checkoutResponse = await axios.post(`${API}/checkout/session`, {
        order_id: orderId
      });

      const { key, razorpay_order_id, amount, currency } = checkoutResponse.data;

      // 3️⃣ OPEN RAZORPAY POPUP (❌ NO REDIRECT)
      const options = {
        key,
        amount,
        currency,
        name: 'Dora Cakes',
        description: 'Cake Order Payment',
        order_id: razorpay_order_id,
        handler: function (response) {
          toast.success('Payment successful 🎉');
          navigate('/'); // success ke baad home
        },
        prefill: {
          name: formData.customer_name,
          email: formData.customer_email,
          contact: formData.customer_mobile,
        },
        theme: {
          color: '#3b1f14',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setSubmitting(false);

    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to process order. Please try again.');
      setSubmitting(false);
    }
  };

  // ---------------- UI STATES ----------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-stone">Loading...</div>
      </div>
    );
  }

  if (!cake) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-stone">Cake not found</div>
      </div>
    );
  }

  const totalAmount = (cake.price * quantity).toFixed(2);

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-darkChocolate mb-12 text-center">
          Order Details
        </h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl overflow-hidden shadow-soft">
              <img
                src={cake.image_url}
                alt={cake.name}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-heading font-bold text-darkChocolate mb-2">
                  {cake.name}
                </h2>
                <p className="text-stone mb-4">{cake.description}</p>
                <div className="font-mono text-3xl font-bold text-terracotta">
                  ₹{cake.price}
                </div>
              </div>
            </div>

            <div className="bg-softPink rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-darkChocolate mb-4">
                Order Summary
              </h3>

              <div className="flex items-center justify-between mb-4">
                <span className="text-stone">Quantity</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-8 h-8 rounded-full bg-white border border-border"
                  >
                    -
                  </button>
                  <span className="font-bold text-darkChocolate w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-8 h-8 rounded-full bg-white border border-border"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-heading font-semibold text-darkChocolate">
                    Total Amount
                  </span>
                  <span className="font-mono text-2xl font-bold text-terracotta">
                    ₹{totalAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-soft">
                <h3 className="font-heading font-semibold text-darkChocolate text-xl mb-6">
                  Customer Details
                </h3>

                <div className="space-y-5">
                  <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    required
                    className="w-full border-b py-2"
                  />

                  <input
                    type="tel"
                    name="customer_mobile"
                    value={formData.customer_mobile}
                    onChange={handleInputChange}
                    placeholder="Mobile Number"
                    maxLength="10"
                    required
                    className="w-full border-b py-2"
                  />

                  <input
                    type="email"
                    name="customer_email"
                    value={formData.customer_email}
                    onChange={handleInputChange}
                    placeholder="Email (optional)"
                    className="w-full border-b py-2"
                  />

                  <textarea
                    name="delivery_address"
                    value={formData.delivery_address}
                    onChange={handleInputChange}
                    placeholder="Delivery Address"
                    rows="3"
                    required
                    className="w-full border rounded-lg p-3"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-darkChocolate text-cream rounded-full py-4 disabled:opacity-50"
              >
                {submitting ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
