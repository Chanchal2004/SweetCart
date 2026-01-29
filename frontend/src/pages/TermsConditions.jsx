export const TermsConditions = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24">
        <h1 className="text-5xl md:text-6xl font-heading font-bold text-darkChocolate mb-8">
          Terms & Conditions
        </h1>
        
        <div className="prose prose-stone max-w-none space-y-6 text-stone">
          <p className="text-lg">
            Last updated: January 2025
          </p>
          
          <section className="bg-white rounded-2xl p-6 shadow-soft">
            <h2 className="text-2xl font-heading font-bold text-darkChocolate mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Dora Cake website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
            </p>
          </section>
          
          <section className="bg-white rounded-2xl p-6 shadow-soft">
            <h2 className="text-2xl font-heading font-bold text-darkChocolate mb-4">2. Order Placement</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All orders are subject to availability and confirmation</li>
              <li>We reserve the right to refuse or cancel any order</li>
              <li>Prices are subject to change without notice</li>
              <li>You must provide accurate delivery information</li>
            </ul>
          </section>
          
          <section className="bg-white rounded-2xl p-6 shadow-soft">
            <h2 className="text-2xl font-heading font-bold text-darkChocolate mb-4">3. Payment</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Payment must be completed at the time of order</li>
              <li>We accept payments through our secure payment gateway</li>
              <li>All prices are in Indian Rupees (INR)</li>
              <li>Payment confirmation is required before order processing</li>
            </ul>
          </section>
          
          <section className="bg-white rounded-2xl p-6 shadow-soft">
            <h2 className="text-2xl font-heading font-bold text-darkChocolate mb-4">4. Delivery</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Estimated delivery time is 2-3 business days</li>
              <li>Delivery times may vary based on location and circumstances</li>
              <li>You must provide a complete and accurate delivery address</li>
              <li>Someone must be available to receive the delivery</li>
            </ul>
          </section>
          
          <section className="bg-white rounded-2xl p-6 shadow-soft">
            <h2 className="text-2xl font-heading font-bold text-darkChocolate mb-4">5. Product Quality</h2>
            <p>
              All our cakes are made with fresh, quality ingredients. We take pride in our products and ensure they meet our high standards before delivery.
            </p>
          </section>
          
          <section className="bg-white rounded-2xl p-6 shadow-soft">
            <h2 className="text-2xl font-heading font-bold text-darkChocolate mb-4">6. Limitation of Liability</h2>
            <p>
              Dora Cake shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or products.
            </p>
          </section>
          
          <section className="bg-white rounded-2xl p-6 shadow-soft">
            <h2 className="text-2xl font-heading font-bold text-darkChocolate mb-4">7. Contact Information</h2>
            <p>
              For questions regarding these Terms & Conditions, please contact us at:
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