export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24">
        <h1 className="text-5xl md:text-6xl font-heading font-bold text-darkChocolate mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose prose-stone max-w-none space-y-6 text-stone">
          <p className="text-lg">
            Last updated: January 2025
          </p>
          
          <section className="bg-white rounded-2xl p-6 shadow-soft">
            <h2 className="text-2xl font-heading font-bold text-darkChocolate mb-4">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when placing an order, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Full name</li>
              <li>Mobile number</li>
              <li>Email address (optional)</li>
              <li>Delivery address</li>
              <li>Order details and preferences</li>
            </ul>
          </section>
          
          <section className="bg-white rounded-2xl p-6 shadow-soft">
            <h2 className="text-2xl font-heading font-bold text-darkChocolate mb-4">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process and fulfill your cake orders</li>
              <li>Communicate with you about your orders</li>
              <li>Coordinate delivery to your specified address</li>
              <li>Send order confirmations and updates</li>
              <li>Improve our products and services</li>
            </ul>
          </section>
          
          <section className="bg-white rounded-2xl p-6 shadow-soft">
            <h2 className="text-2xl font-heading font-bold text-darkChocolate mb-4">3. Payment Information</h2>
            <p>
              All payment processing is handled securely through our payment gateway partner. We do not store your credit card information, UPI credentials, or other sensitive payment data on our servers. Payment information is encrypted and processed in compliance with industry standards.
            </p>
          </section>
          
          <section className="bg-white rounded-2xl p-6 shadow-soft">
            <h2 className="text-2xl font-heading font-bold text-darkChocolate mb-4">4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>
          
          <section className="bg-white rounded-2xl p-6 shadow-soft">
            <h2 className="text-2xl font-heading font-bold text-darkChocolate mb-4">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="font-medium text-darkChocolate">
              Email: doracake@gmail.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};