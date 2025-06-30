import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBooks, deleteBook } from '../api/books';
import BookForm from '../components/BookForm';
import BookCard from '../components/BookCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { toast } from 'react-hot-toast';

const AdminPage = () => {
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: books,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      toast.success('Book deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : 'Add New Book'}
        </button>
      </div>

      {showForm && (
        <BookForm
          onSuccess={() => {
            setShowForm(false);
            queryClient.invalidateQueries(['books']);
          }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {books?.map((book) => (
          <div key={book._id} className="relative">
            <BookCard book={book} />
            <div className="mt-2 flex space-x-2">
              <button className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                Edit
              </button>
              <button
                onClick={() => handleDelete(book._id)}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                disabled={deleteMutation.isLoading}
              >
                {deleteMutation.isLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;