import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBook, updateBook } from '../api/books';
import { toast } from 'react-hot-toast';

const BookForm = ({ book: initialBook, onSuccess, onCancel }) => {
  const [book, setBook] = useState(initialBook || {
    title: '',
    author: '',
    description: '',
    price: 0,
    countInStock: 0,
    category: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(
    initialBook?.image 
      ? `http://localhost:5000${initialBook.image}` 
      : null
  );
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: initialBook 
      ? (formData) => updateBook(initialBook._id, formData)
      : createBook,
    onSuccess: () => {
      toast.success(initialBook ? 'Book updated successfully!' : 'Book created successfully!');
      queryClient.invalidateQueries(['books']);
      onSuccess();
    },
    onError: (error) => {
      toast.error(error.message || 'An error occurred');
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'countInStock' ? Number(value) : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBook(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('description', book.description);
    formData.append('price', book.price.toString());
    formData.append('countInStock', book.countInStock.toString());
    formData.append('category', book.category);
    
    // Only append image if it's a new file or a new book
    if (book.image instanceof File) {
      formData.append('image', book.image);
    }

    mutation.mutate(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        {initialBook ? 'Edit Book' : 'Add New Book'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 mb-1">Title*</label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-gray-700 mb-1">Author*</label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 mb-1">Price*</label>
            <input
              type="number"
              name="price"
              value={book.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Stock Count */}
          <div>
            <label className="block text-gray-700 mb-1">Stock Count*</label>
            <input
              type="number"
              name="countInStock"
              value={book.countInStock}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 mb-1">Category*</label>
            <input
              type="text"
              name="category"
              value={book.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 mb-1">
              {initialBook ? 'Update Image' : 'Upload Image*'}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={mutation.isLoading}
            />
            {imagePreview && (
              <div className="mt-2">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="h-32 object-contain rounded border"
                />
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={book.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition-colors"
            disabled={mutation.isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-70"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {initialBook ? 'Updating...' : 'Creating...'}
              </span>
            ) : (
              initialBook ? 'Update Book' : 'Create Book'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;