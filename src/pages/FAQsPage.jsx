import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  {
    question: "How do I place an order?",
    answer: "You can place an order by browsing our collection, adding items to your cart, and proceeding to checkout. You'll need to create an account or checkout as a guest."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 3-5 business days. Expedited shipping options are available at checkout."
  },
  {
    question: "Can I return or exchange a book?",
    answer: "Yes, we accept returns within 30 days of purchase. The book must be in its original condition. Please see our Returns Policy for more details."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by destination."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships, you'll receive a tracking number via email. You can use this to track your package on our website or the carrier's site."
  },
  {
    question: "Are there any discounts for bulk orders?",
    answer: "Yes, we offer discounts for bulk orders. Please contact our customer service team for more information."
  }
];

const FAQsPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h1>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-6 bg-gray-50 hover:bg-gray-100 transition"
                onClick={() => toggleFAQ(index)}
              >
                <h2 className="text-lg font-semibold text-left">{faq.question}</h2>
                {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              
              {activeIndex === index && (
                <div className="p-6 bg-white">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-blue-50 p-8 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
          <p className="mb-6">We're here to help! Contact our customer support team for assistance.</p>
          <a 
            href="/contact-us" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQsPage;