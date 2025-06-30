import { useState } from 'react';
import { toast } from 'react-hot-toast';

const UsersTable = ({ users, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    isAdmin: false
  });

  const handleEditClick = (user) => {
    setEditingId(user._id);
    setEditForm({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  };

  const handleSave = async (userId) => {
    try {
      await onUpdate(userId, editForm);
      setEditingId(null);
      toast.success('User updated successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await onDelete(userId);
        toast.success('User deleted successfully');
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {(users || []).map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === user._id ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === user._id ? (
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === user._id ? (
                  <input
                    type="checkbox"
                    checked={editForm.isAdmin}
                    onChange={(e) => setEditForm({ ...editForm, isAdmin: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                ) : (
                  user.isAdmin ? 'Yes' : 'No'
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {editingId === user._id ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSave(user._id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;