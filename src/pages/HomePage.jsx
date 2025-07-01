import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBooks, getNewReleases, getBestSellers } from '../api/books';
import BookCard from '../components/BookCard';
import { FiAward, FiClock, FiTrendingUp, FiBookOpen, FiTruck, FiShield, FiChevronRight, FiUsers, FiStar, FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext'; // <-- Add this line

// Color palette
const colors = {
  primary: 'bg-gradient-to-r from-indigo-600 to-purple-600',
  secondary: 'bg-amber-500',
  accent: 'text-cyan-400',
  dark: 'bg-gray-900',
  light: 'bg-gray-50'
};

const HomePage = () => {
  const { isAuthenticated } = useAuth(); // <-- Add this line

  const { data: featuredBooks, isLoading: featuredLoading, isError: featuredError, error: featuredErrorObj } = useQuery({
    queryKey: ['featured-books'],
    queryFn: getBooks,
    select: (data) => data.slice(0, 4)
  });

  const { data: newReleases, isLoading: newLoading, isError: newError, error: newErrorObj } = useQuery({
    queryKey: ['new-releases'],
    queryFn: getNewReleases
  });

  const { data: bestSellers, isLoading: bestLoading, isError: bestError, error: bestErrorObj } = useQuery({
    queryKey: ['best-sellers'],
    queryFn: getBestSellers
  });

  return (
    <div className="space-y-16">
      {/* Enhanced Hero Section */}
      <section className="relative bg-blue-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-600 opacity-90"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Your Next <span className="text-yellow-300">Favorite Read</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Explore our handpicked collection of timeless classics and modern masterpieces
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/books"
              className="bg-white text-blue-800 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
            >
              Browse Collection
            </Link>
            {!isAuthenticated && (
              <Link
                to="/register"
                className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition transform hover:scale-105"
              >
                Join Our Community
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Value Propositions Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="text-blue-600 mb-4">
              <FiBookOpen className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-center">Curated Selection</h3>
            <p className="text-gray-600 text-center">
              Our experts handpick each title to ensure quality and diversity
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="text-blue-600 mb-4">
              <FiTruck className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-center">Fast Delivery</h3>
            <p className="text-gray-600 text-center">
              Get your books quickly with our reliable shipping
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="text-blue-600 mb-4">
              <FiShield className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-center">Secure Shopping</h3>
            <p className="text-gray-600 text-center">
              Your transactions are always protected
            </p>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Books</h2>
          <Link
            to="/books"
            className="text-blue-600 hover:underline font-medium"
          >
            View All
          </Link>
        </div>

        {featuredLoading ? (
          <div>Loading...</div>
        ) : featuredError ? (
          <div className="text-red-600">{featuredErrorObj?.message || "Error loading featured books"}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBooks?.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </section>

      {/* New Releases Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <FiClock className="text-blue-600" /> New Releases
            </h2>
            <Link
              to="/books?sort=newest"
              className="text-blue-600 hover:underline font-medium"
            >
              View All
            </Link>
          </div>

          {newLoading ? (
            <div>Loading...</div>
          ) : newError ? (
            <div className="text-red-600">{newErrorObj?.message || "Error loading new releases"}</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {newReleases?.slice(0, 4).map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bestsellers with Side Image */}
 
      <section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
      {/* Text Content */}
      <div className="lg:w-1/2 space-y-6">
        <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full">
          Editor's Pick
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          This Month's <span className="text-indigo-600">Bestseller</span>
        </h2>
        <p className="text-lg text-gray-600">
          The book everyone is talking about right now. Join thousands of readers who've made this their favorite read of the season.
        </p>
        
        {bestSellers && bestSellers[0] ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">{bestSellers[0].title}</h3>
              <p className="text-gray-500 mt-1">by {bestSellers[0].author}</p>
            </div>
            
            <div className="flex items-center">
              <div className="flex mr-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">1,240 reviews</span>
            </div>
            
            <p className="text-gray-700 mt-4 line-clamp-3">
              {bestSellers[0].description || "A captivating read that has captured the hearts of readers worldwide with its compelling narrative and unforgettable characters."}
            </p>
            
            <div className="pt-2">
              <Link
                to={`/books/${bestSellers[0]._id}`}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
              >
                Get Your Copy
                <FiChevronRight className="ml-2 -mr-1" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
            <div className="h-12 w-40 bg-gray-200 rounded-md mt-4"></div>
          </div>
        )}
      </div>

      {/* Book Display */}
      <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
        {bestSellers && bestSellers[0] ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative group max-w-xs w-full"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-all duration-300 -z-10"></div>
            <BookCard 
              book={bestSellers[0]} 
              className="relative transform group-hover:-translate-y-2 transition-all duration-300 shadow-xl hover:shadow-2xl"
              badge={
                <span className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md z-10">
                  #1 Bestseller
                </span>
              }
              showDescription={false}
            />
            <div className="absolute -bottom-4 -right-4 bg-white px-4 py-2 rounded-lg shadow-md border border-gray-100">
              <p className="text-sm font-medium text-gray-900">Only ${bestSellers[0].price?.toFixed(2) || "24.99"}</p>
              <p className="text-xs text-gray-500">Free shipping</p>
            </div>
          </motion.div>
        ) : (
          <div className="animate-pulse bg-gray-200 rounded-xl w-64 h-80"></div>
        )}
      </div>
    </div>
  </div>
</section>
      /* Testimonials Section */

        <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
        <span className="inline-block mb-4 text-sm font-semibold tracking-wider text-indigo-600 uppercase">
          Community Voices
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Readers <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Love Us</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join thousands of book lovers who've found their next favorite read with us
        </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            quote: "The book selection is incredible and the delivery was faster than expected. I've discovered so many new favorites here!",
            author: "Sarah Johnson",
            role: "Avid Reader",
            rating: 5,
            image: "/images/testimonial1.jpg"
          },
          {
            quote: "As a book club organizer, I appreciate their curated collections. Makes choosing our next read so much easier!",
            author: "Michael Thompson",
            role: "Book Club Leader",
            rating: 5,
            image: "/images/testimonial2.jpg"
          },
          {
            quote: "The customer service team went above and beyond when I had an issue with my order. Truly exceptional experience!",
            author: "Emma Kowalski",
            role: "Loyal Customer",
            rating: 5,
            image: "/images/Canogel.jpg"
          }
        ].map((testimonial, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
          >
            <div className="flex mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <svg 
              key={i}
              className="w-5 h-5 text-amber-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
            </div>
            <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed relative">
          <div className="absolute -top-6 -left-6 text-7xl text-indigo-50 font-serif z-0">"</div>
          <p className="relative z-10">{testimonial.quote}</p>
            </blockquote>
            <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-indigo-100">
            <img 
              src={testimonial.image} 
              alt={testimonial.author}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{testimonial.author}</p>
            <p className="text-sm text-gray-500">{testimonial.role}</p>
          </div>
            </div>
          </motion.div>
        ))}
          </div>

          {/* Trust indicators */}
    <div className="mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {[
          { 
            number: "10,000+", 
            label: "Happy Readers",
            icon: <FiUsers className="w-8 h-8 text-indigo-600 mb-4" />
          },
          { 
            number: "4.9/5", 
            label: "Average Rating",
            icon: <FiStar className="w-8 h-8 text-indigo-600 mb-4" />
          },
          { 
            number: "98%", 
            label: "Recommend Us",
            icon: <FiHeart className="w-8 h-8 text-indigo-600 mb-4" />
          }
        ].map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center"
          >
            {stat.icon}
            <p className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</p>
            <p className="text-gray-600 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>   

      {/* Final CTA */}
      <section className={`py-20 ${colors.primary} text-white`}>
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-6"
          >
            Ready to Begin Your <span className={`${colors.accent}`}>Reading Journey</span>?
          </motion.h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of passionate readers today
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link
              to="/register"
              className={`inline-block ${colors.secondary} text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-amber-600 transition-all transform hover:scale-105 shadow-lg`}
            >
              Get Started - It's Free
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;