import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { getNewReleases } from '../api/books';

const NewReleasesPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        const data = await getNewReleases();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching new releases:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNewReleases();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">New Releases</h1>
      
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map(book => (
            <Link to={`/books/${book._id}`} key={book._id}>
              <BookCard book={book} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewReleasesPage;