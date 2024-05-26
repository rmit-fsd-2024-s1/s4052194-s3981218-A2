import React, { useEffect, useState } from 'react';
import client from '../services/graphqlClient';
import { gql } from 'graphql-request';
import '../style/Users.css';

const GET_USERS = gql`
  query {
    users {
      user_id
      username
      email
      blocked_status
    }
  }
`;

const BLOCK_USER = gql`
  mutation blockUser($user_id: Int!) {
    blockUser(user_id: $user_id) {
      user_id
      blocked_status
    }
  }
`;

const UNBLOCK_USER = gql`
  mutation unblockUser($user_id: Int!) {
    unblockUser(user_id: $user_id) {
      user_id
      blocked_status
    }
  }
`;

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await client.request(GET_USERS);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleBlockUser = async (user_id) => {
    try {
      await client.request(BLOCK_USER, { user_id });
      const data = await client.request(GET_USERS);
      setUsers(data.users);
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const handleUnblockUser = async (user_id) => {
    try {
      await client.request(UNBLOCK_USER, { user_id });
      const data = await client.request(GET_USERS);
      setUsers(data.users);
    } catch (error) {
      console.error('Error unblocking user:', error);
    }
  };

  return (
    <div className="admin-container">
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
                  <button className="unblock" onClick={() => handleUnblockUser(user.user_id)}>Unblock</button>
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
