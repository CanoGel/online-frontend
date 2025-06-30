import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { updateOrderToDelivered } from '../../api/adminApi';
import OrdersTable from './OrdersTable';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import ExportButton from './ExportButton';
import OrderStatusFilter from './OrderStatusFilter';

const OrdersManagement = ({ orders, refetchOrders }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order._id.includes(searchTerm) ||
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'paid' && order.isPaid) ||
      (statusFilter === 'delivered' && order.isDelivered) ||
      (statusFilter === 'pending' && !order.isPaid);

    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleMarkDelivered = async (orderId) => {
    try {
      await updateOrderToDelivered(orderId);
      toast.success('Order marked as delivered');
      refetchOrders();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-xl font-semibold">Orders Management</h2>
        <div className="flex gap-3">
          <OrderStatusFilter 
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          />
          <SearchBar 
            placeholder="Search orders..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <ExportButton 
            data={filteredOrders} 
            filename="orders"
            fields={['_id', 'user.name', 'totalPrice', 'isPaid', 'isDelivered', 'createdAt']}
          />
        </div>
      </div>

      <OrdersTable 
        orders={currentOrders} 
        onMarkDelivered={handleMarkDelivered}
      />

      {filteredOrders.length > ordersPerPage && (
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

export default OrdersManagement;