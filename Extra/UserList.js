import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/user/users'); // Adjust the API endpoint as needed
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await fetch(`http://localhost:5000/api/user/${userId}`, {
        method: 'DELETE',
      });
      // Remove the deleted user from the list
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <ul style={{ listStyle: 'none'}}>
        {users.map((user) => (
          <li key={user._id}>
            {user.email}
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
