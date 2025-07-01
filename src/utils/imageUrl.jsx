export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/images/placeholder.jpg';
  
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Use your Render backend URL
  return `https://online-book-backend.onrender.com${imagePath}`;
};