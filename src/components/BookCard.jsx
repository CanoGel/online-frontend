import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/imageUrl';

const BookCard = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/books/${book._id}`}>
        <img
          src={getImageUrl(book.image)}
          alt={book.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = '/images/placeholder.jpg';
          }}
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1 line-clamp-1">{book.title}</h3>
          <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
          <div className="flex justify-between items-center">
            <span className="font-bold">${book.price}</span>
            <span
              className={`text-xs px-2 py-1 rounded ${
                book.countInStock > 0
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {book.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;