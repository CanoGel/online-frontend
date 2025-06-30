import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Profile</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold">Name</label>
          <p className="mt-1 p-2 bg-gray-100 rounded">{user.name}</p>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Email</label>
          <p className="mt-1 p-2 bg-gray-100 rounded">{user.email}</p>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Role</label>
          <p className="mt-1 p-2 bg-gray-100 rounded">
            {user.isAdmin ? 'Admin' : 'User'}
          </p>
        </div>
        {/* Add more user info here if needed */}
      </div>
    </div>
  );
};

export default ProfilePage;