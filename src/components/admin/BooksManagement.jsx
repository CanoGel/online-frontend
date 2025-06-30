import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { deleteBook } from '../../api/adminApi';
import BooksTable from './BooksTable';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import ExportButton from './ExportButton';

const BooksManagement = ({ books, refetchBooks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  // Filter books based on search term
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handleDeleteBook = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(bookId);
        toast.success('Book deleted successfully');
        refetchBooks();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-xl font-semibold">Books Management</h2>
        <div className="flex gap-3">
          <SearchBar 
            placeholder="Search books..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <Link
            to="/admin/books/new"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            Add New Book
          </Link>
          <ExportButton 
            data={filteredBooks} 
            filename="books"
            fields={['title', 'author', 'price', 'countInStock', 'category']}
          />
        </div>
      </div>

      <BooksTable 
        books={currentBooks} 
        onDelete={handleDeleteBook}
      />

      {filteredBooks.length > booksPerPage && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default BooksManagement;