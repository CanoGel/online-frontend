import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  getAdminStats,
  getAllUsers,
  getAllOrders,
  getAllBooks
} from '../../api/adminApi';
import DashboardOverview from '../../components/admin/DashboardOverview';
import UsersManagement from '../../components/admin/UsersManagement';
import OrdersManagement from '../../components/admin/OrdersManagement';
import BooksManagement from '../../components/admin/BooksManagement';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Fetch all data
  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery(
    ['adminStats'],
    getAdminStats
  );

  const { 
    data: users, 
    isLoading: usersLoading, 
    error: usersError,
    refetch: refetchUsers 
  } = useQuery(['adminUsers'], getAllUsers);

  const { 
    data: orders, 
    isLoading: ordersLoading, 
    error: ordersError,
    refetch: refetchOrders 
  } = useQuery(['adminOrders'], getAllOrders);

  const { 
    data: books, 
    isLoading: booksLoading, 
    error: booksError,
    refetch: refetchBooks 
  } = useQuery(['adminBooks'], getAllBooks);

  if (statsLoading || usersLoading || ordersLoading || booksLoading) {
    return <LoadingSpinner fullPage />;
  }

  if (statsError || usersError || ordersError || booksError) {
    const error = statsError || usersError || ordersError || booksError;
    return <ErrorMessage message={error.message} fullPage />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Navigation Tabs */}
      <div className="flex mb-6 border-b border-gray-200">
        {['dashboard', 'users', 'orders', 'books'].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 font-medium capitalize ${
              activeTab === tab 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'dashboard' && (
          <DashboardOverview 
            stats={stats} 
            users={users.slice(0, 5)} 
            orders={orders.slice(0, 5)} 
            books={books.slice(0, 5)}
          />
        )}

        {activeTab === 'users' && (
          <UsersManagement 
            users={users} 
            refetchUsers={refetchUsers} 
          />
        )}

        {activeTab === 'orders' && (
          <OrdersManagement 
            orders={orders} 
            refetchOrders={refetchOrders} 
          />
        )}

        {activeTab === 'books' && (
          <BooksManagement 
            books={books} 
            refetchBooks={refetchBooks} 
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;