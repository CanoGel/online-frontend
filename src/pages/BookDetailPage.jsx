import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getBookById, updateBook } from '../api/books';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import BookForm from '../components/BookForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { toast } from 'react-hot-toast';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const { isAdmin } = useAuth();
  const { addToCart } = useCart();

  // Fetch book details
  const { 
    data: book, 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['book', id],
    queryFn: () => getBookById(id),
  });

  // Update mutation
  const { mutate: handleUpdate, isPending: isUpdating } = useMutation({
    mutationFn: (formData) => updateBook(id, formData),
    onSuccess: () => {
      toast.success('Book updated successfully');
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update book');
    }
  });

  const handleAddToCart = () => {
    addToCart({
      _id: book._id,
      title: book.title,
      price: book.price,
      image: book.image,
      countInStock: book.countInStock
    });
    toast.success('Added to cart');
  };

  if (isLoading) return <LoadingSpinner fullPage />;
  if (isError) return <ErrorMessage message={error.message} />;
  if (!book) return <ErrorMessage message="Book not found" />;

  if (isEditing) {
    return (
      <BookForm 
        book={book}
        onSubmit={handleUpdate}
        onCancel={() => setIsEditing(false)}
        isSubmitting={isUpdating}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 p-4">
            <img
              src={book.image?.startsWith('http') ? book.image : `http://localhost:5000${book.image}`}
              alt={book.title}
              className="w-full h-auto object-cover rounded-lg"
              onError={(e) => {
                e.target.src = '/images/book-placeholder.jpg';
              }}
            />
          </div>
          
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
                <h2 className="text-lg text-gray-600 mb-4">by {book.author}</h2>
              </div>
              {isAdmin && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
              )}
            </div>

            <div className="mb-4">
              <span className="text-xl font-bold">${book.price.toFixed(2)}</span>
              <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
                book.countInStock > 0 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {book.countInStock > 0 ? `${book.countInStock} in stock` : 'Out of stock'}
              </span>
            </div>

            <div className="mb-4">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {book.category}
              </span>
            </div>

            <p className="text-gray-700 mb-6">{book.description}</p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAddToCart}
                disabled={book.countInStock <= 0}
                className={`px-4 py-2 rounded font-medium ${
                  book.countInStock > 0
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {book.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>

              <button
                onClick={() => navigate('/books')}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Back to Books
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;