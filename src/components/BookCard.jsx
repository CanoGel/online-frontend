import { Link } from 'react-router-dom';

/**
 * @param {{ book: {
 *   _id: string,
 *   title: string,
 *   author: string,
 *   description: string,
 *   price: number,
 *   countInStock: number,
 *   image: string,
 *   category: string,
 *   user: string,
 *   createdAt: string,
 *   updatedAt: string
 * }}} props
 */
const BookCard = ({ book }) => {
  const imageUrl = book.image 
    ? book.image.startsWith('http') 
      ? book.image 
      : `http://localhost:5000${book.image}`
    : '/images/placeholder.jpg';
  return   (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/books/${book._id}`}>
        <img
          src={imageUrl}
          alt={book.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = '/images/placeholder.jpg'; // Fallback if image fails to load
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