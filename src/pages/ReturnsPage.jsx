const ReturnsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Returns & Refunds Policy</h1>
        
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Return Policy</h2>
            <p>We want you to be completely satisfied with your purchase. If you're not happy with your order, you may return most items within 30 days of delivery for a full refund or exchange.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Eligibility for Returns</h2>
            <p>To be eligible for a return:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>The item must be in its original condition (unopened, unused, undamaged)</li>
              <li>The item must be in its original packaging</li>
              <li>You must have the original receipt or proof of purchase</li>
            </ul>
            <p className="mt-4">Certain items are not eligible for return, including digital products, gift cards, and personalized items.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Initiate a Return</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Contact our customer service team at returns@bookstore.com to request a Return Authorization (RA) number</li>
              <li>Package the item securely in its original packaging</li>
              <li>Include the RA number clearly on the outside of the package</li>
              <li>Ship the package to the address provided with your RA number</li>
            </ol>
            <p className="mt-4">We recommend using a trackable shipping service as we cannot be responsible for lost return shipments.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Refund Processing</h2>
            <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
            <p className="mt-2">If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-10 business days.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Return Shipping Costs</h2>
            <p>Customers are responsible for return shipping costs unless the return is due to our error (e.g., you received an incorrect or defective item).</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Exchanges</h2>
            <p>If you need to exchange an item for the same item in a different format (e.g., hardcover for paperback), please contact us at exchanges@bookstore.com. You will be responsible for any price difference and additional shipping costs.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Damaged or Defective Items</h2>
            <p>If you receive a damaged or defective item, please contact us immediately at support@bookstore.com with photos of the damage. We will arrange for a replacement or refund at no additional cost to you.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;