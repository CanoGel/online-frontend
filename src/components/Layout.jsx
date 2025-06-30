import Navbar from './Navbar';
import Footer from './Footer';
import LoadingOverlay from './LoadingOverlay';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { isLoading } = useAuth?.() || {};

  return (
    <div className="min-h-screen flex flex-col">
      {isLoading && <LoadingOverlay />}
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;