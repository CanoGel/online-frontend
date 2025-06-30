import { Link } from 'react-router-dom';
import StatCard from './StatCard';
import UsersTable from './UsersTable';
import OrdersTable from './OrdersTable';
import BooksTable from './BooksTable';

const DashboardOverview = ({ stats, users, orders, books }) => {
  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Users" 
          value={stats.usersCount} 
          icon="👥"
          trend="up"
          change="5% from last month"
        />
        <StatCard 
          title="Total Books" 
          value={stats.booksCount} 
          icon="📚"
          trend="up"
          change="12 new this month"
        />
        <StatCard 
          title="Total Orders" 
          value={stats.ordersCount} 
          icon="🛒"
          trend="up"
          change="8% from last month"
        />
        <StatCard 
          title="Total Revenue" 
          value={`$${stats.totalSales.toFixed(2)}`} 
          icon="💰"
          trend="up"
          change="15% from last month"
        />
      </div>

      {/* Recent Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Users</h2>
            <Link to="/admin/users" className="text-blue-600 hover:underline text-sm">
              View All
            </Link>
          </div>
          <UsersTable users={users} compact />
        </div>

        <div className="lg:col-span-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <Link to="/admin/orders" className="text-blue-600 hover:underline text-sm">
              View All
            </Link>
          </div>
          <OrdersTable orders={orders} compact />
        </div>

        <div className="lg:col-span-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Books</h2>
            <Link to="/admin/books" className="text-blue-600 hover:underline text-sm">
              View All
            </Link>
          </div>
          <BooksTable books={books} compact />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;