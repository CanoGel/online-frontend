import React, { useEffect, useState } from 'react';
import UsersTable from './UsersTable.jsx';
import { getUsers, updateUser, deleteUser } from '../../api/adminApi.jsx';
import { toast } from 'react-hot-toast';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from backend
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch users');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle update
  const handleUpdate = async (userId, userData) => {
    try {
      await updateUser(userId, userData);
      toast.success('User updated');
      fetchUsers();
    } catch (error) {
      toast.error(error.message || 'Update failed');
    }
  };

  // Handle delete
  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      toast.success('User deleted');
      fetchUsers();
    } catch (error) {
      toast.error(error.message || 'Delete failed');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Users Management</h2>
      <UsersTable users={users} onUpdate={handleUpdate} onDelete={handleDelete} />
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default UsersManagement;