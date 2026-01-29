export const RefundPolicy = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24">
        <h1 className="text-5xl md:text-6xl font-heading font-bold text-darkChocolate mb-8">
          Refund Policy
        </h1>
        
        <div className="prose prose-stone max-w-none space-y-6 text-stone">
          <p className="text-lg">
            Last updated: January 2025
          </p>
          
          <section className="bg-white rounded-2xl p-6 shadow-soft">
            <h2 className="text-2xl font-heading font-bold text-darkChocolate mb-4">1. Refund Eligibility</h2>
            <p>
              We want you to be completely satisfied with your order. Refunds may be issued in the following cases:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The cake was significantly damaged during delivery</li>
              <li>Wrong cake was delivered</li>
              <li>The order was not delivered within the promised timeframe</li>
              <li>The cake did not meet our quality standards</li>
            </ul>
          </section>
          
          <section className="bg-white rounded-2xl p-6 shadow-soft">
            <h2 className="text-2xl font-heading font-bold text-darkChocolate mb-4">2. Non-Refundable Cases</h2>
            <p>
              Refunds will not be provided in the following situations:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Change of mind after order placement</li>
              <li>Incorrect delivery address provided by customer</li>
              <li>Customer not available to receive delivery</li>
              <li>Minor variations in appearance (as cakes are handmade)</li>
              <li>Taste preferences (subjective to individual taste)</li>
            </ul>
          </section>
          
          <section className="bg-white rounded-2xl p-6 shadow-soft">
            <h2 className="text-2xl font-heading font-bold text-darkChocolate mb-4">3. How to Request a Refund</h2>
            <p>
              To request a refund:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact us at doracake@gmail.com within 24 hours of delivery</li>
              <li>Provide your order ID and details of the issue</li>
              <li>Include photos of the product if applicable</li>
              <li>Our team will review your request and respond within 2-3 business days</li>
            </ul>
          </section>
          
          <section className="bg-white rounded-2xl p-6 shadow-soft">
            <h2 className="text-2xl font-heading font-bold text-darkChocolate mb-4">4. Refund Processing</h2>
            <p>
              If your refund is approved:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Refunds will be processed to the original payment method</li>
              <li>Processing time: 5-7 business days</li>
              <li>You will receive an email confirmation once the refund is initiated</li>
            </ul>
          </section>
          
          <section className="bg-white rounded-2xl p-6 shadow-soft">
            <h2 className="text-2xl font-heading font-bold text-darkChocolate mb-4">5. Partial Refunds</h2>
            <p>
              In some cases, we may offer a partial refund or replacement instead of a full refund, depending on the nature of the issue.
            </p>
          </section>
          
          <section className="bg-white rounded-2xl p-6 shadow-soft">
            <h2 className="text-2xl font-heading font-bold text-darkChocolate mb-4">6. Contact Us</h2>
            <p>
              For any questions about our Refund Policy or to request a refund, please contact us at:
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