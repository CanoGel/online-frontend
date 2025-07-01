import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBooks, deleteBook } from '../api/books';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useState } from 'react';
import { useCart } from '../context/CartContext'; // <-- Add this import

const BookListPage = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToCart } = useCart(); // <-- Use CartContext

  // Fetch books query
  const { 
    data: books, 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  // Track which book is being deleted
  const [deletingId, setDeletingId] = useState(null);

  // Delete mutation
  const { mutate: handleDelete } = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      toast.success('Book deleted successfully');
      setDeletingId(null);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete book');
      setDeletingId(null);
    }
  });

  // Edit handler
  const handleEdit = (bookId) => {
    navigate(`/books/${bookId}/edit`);
  };

  // View details handler
  const handleViewDetails = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  // Add to cart handler using context
  const handleAddToCart = (book) => {
    addToCart(book, 1); // <-- Use context method
    toast.success('Added to cart');
  };

  if (isLoading) return <LoadingSpinner fullPage />;
  if (isError) return <ErrorMessage message={error.message} onRetry={() => queryClient.refetchQueries(['books'])} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Book Collection</h1>
      
      {isAdmin && (
        <div className="mb-6 text-right">
          <button
            onClick={() => navigate('/books/new')}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition"
          >
            Add New Book
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books?.map((book) => (
          <div key={book._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div 
              className="cursor-pointer" 
              onClick={() => handleViewDetails(book._id)}
            >
              <img 
                src={book.image?.startsWith('http') ? book.image : `https://online-book-backend.onrender.com${book.image}`}
                alt={book.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = '/images/book-placeholder.jpg';
                }}
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 line-clamp-1">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">${book.price.toFixed(2)}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    book.countInStock > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {book.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t flex justify-between items-center gap-2">
              <button
                onClick={() => handleAddToCart(book)}
                disabled={book.countInStock <= 0}
                className={`text-sm px-3 py-1 rounded transition font-medium ${
                  book.countInStock > 0
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Add to Cart
              </button>
              {isAdmin && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(book._id)}
                    className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this book?')) {
                        setDeletingId(book._id);
                        handleDelete(book._id);
                      }
                    }}
                    className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                    disabled={deletingId === book._id}
                  >
                    {deletingId === book._id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookListPage;