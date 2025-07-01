export function getImageUrl(image) {
  if (!image) return '/images/book-placeholder.jpg';
  if (image.startsWith('/images/')) return image;
  if (image.startsWith('http')) return image;
  // If image is a backend path, prepend backend URL
  return `https://online-book-backend.onrender.com${image}`;
}