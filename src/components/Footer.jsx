import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/new-releases" className="hover:text-blue-400 transition">New Releases</Link></li>
              <li><Link to="/best-sellers" className="hover:text-blue-400 transition">Best Sellers</Link></li>
              <li><Link to="/contact-us" className="hover:text-blue-400 transition">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Help & Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Help & Info</h3>
            <ul className="space-y-2">
              <li><Link to="/faqs" className="hover:text-blue-400 transition">FAQs</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-blue-400 transition">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-blue-400 transition">Returns & Refunds</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <address className="not-italic">
              <p>123 Book Street</p>
              <p>Reading, RD 12345</p>
              <p>Email: info@bookstore.com</p>
              <p>Phone: (252) 619-55-11-39</p>
            </address>
          </div>
          
          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-blue-400 transition"><FaFacebook /></a>
              <a href="#" className="text-2xl hover:text-blue-400 transition"><FaTwitter /></a>
              <a href="#" className="text-2xl hover:text-blue-400 transition"><FaInstagram /></a>
              <a href="#" className="text-2xl hover:text-blue-400 transition"><FaLinkedin /></a>
            </div>
            <div className="mt-6">
              <p className="text-sm">Subscribe to our newsletter</p>
              <div className="flex mt-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 text-gray-800 rounded-l focus:outline-none w-full"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} BookStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;