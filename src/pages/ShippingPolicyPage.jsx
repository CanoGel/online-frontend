const ShippingPolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Shipping Policy</h1>
        
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Shipping Options</h2>
            <p>We offer several shipping options to meet your needs:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Standard Shipping:</strong> 3-5 business days - $4.99</li>
              <li><strong>Expedited Shipping:</strong> 2 business days - $9.99</li>
              <li><strong>Overnight Shipping:</strong> Next business day - $14.99 (Order must be placed before 2 PM EST)</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Processing Time</h2>
            <p>All orders are processed within 1-2 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">International Shipping</h2>
            <p>We offer international shipping to most countries. Delivery times vary by destination and typically take 7-21 business days. Additional customs fees, taxes, or duties may apply upon delivery, which are the responsibility of the customer.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Order Tracking</h2>
            <p>Once your order has shipped, you will receive an email with a tracking number. You can track your order using our website or the carrier's website.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Shipping Restrictions</h2>
            <p>We currently do not ship to PO Boxes or APO/FPO addresses. For international orders, we may be restricted from shipping certain items to your country.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Undeliverable Packages</h2>
            <p>If a package is returned to us as undeliverable, we will contact you to arrange reshipment. Additional shipping fees may apply.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>If you have any questions about our shipping policy, please contact our customer service team at shipping@bookstore.com or call us at (123) 456-7890.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;