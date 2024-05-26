import React, { useEffect, useState } from 'react';
import { getUsers, blockUser, unblockUser } from '../data/repository';
import '../style/Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleBlockUser = async (user_id) => {
    try {
      await blockUser(user_id);
      const users = await getUsers();
      setUsers(users);
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const handleUnblockUser = async (user_id) => {
    try {
      await unblockUser(user_id);
      const users = await getUsers();
      setUsers(users);
    } catch (error) {
      console.error('Error unblocking user:', error);
    }
  };

  return (
    <div>
      <h2>User Block Management</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.blocked_status ? 'Blocked' : 'Active'}</td>
              <td>
                {user.blocked_status ? (
                  <button onClick={() => handleUnblockUser(user.user_id)}>Unblock</button>
                ) : (
                  <button onClick={() => handleBlockUser(user.user_id)}>Block</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
