import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user); // Get user from Redux state

    const [allUsers, setAllUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [errorUsers, setErrorUsers] = useState(null);

    // Effect to check if the user is an admin and fetch users
    useEffect(() => {
        // Redirect if not logged in or not an admin
        if (!user || user.role !== 'admin') {
            navigate('/login'); // Or a more appropriate unauthorized page
            return;
        }

        // Fetch all users if the user is an admin
        const fetchAllUsers = async () => {
            setLoadingUsers(true);
            setErrorUsers(null);
            try {
                // Assuming your backend route for getting all users is /api/user/users
                const response = await fetch('http://localhost:5000/api/user/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // IMPORTANT: In a real app, you would send the JWT token here
                        // 'Authorization': `Bearer ${user.token}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch users.');
                }

                const data = await response.json();
                setAllUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setErrorUsers(error.message);
            } finally {
                setLoadingUsers(false);
            }
        };

        fetchAllUsers();
    }, [user, navigate]); // Depend on 'user' and 'navigate' to re-run if they change


    // --- User Action Handlers ---

    const handleSuspendUnsuspend = async (userId, suspendStatus) => {
        if (!window.confirm(`Are you sure you want to ${suspendStatus ? 'suspend' : 'unsuspend'} this user?`)) {
            return;
        }

        try {
            const endpoint = suspendStatus ? `/api/user/${userId}/suspend` : `/api/user/${userId}/unsuspend`;
            const response = await fetch(`http://localhost:5000${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${user.token}` // Again, send token in real app
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update user status.');
            }

            // Update the local state to reflect the change without refetching all users
            setAllUsers(prevUsers =>
                prevUsers.map(u =>
                    u._id === userId ? { ...u, suspended: suspendStatus } : u
                )
            );
            alert(`User successfully ${suspendStatus ? 'suspended' : 'unsuspended'}.`);

        } catch (error) {
            console.error('Error suspending/unsuspending user:', error);
            alert(`Error: ${error.message}`);
        }
    };

    const handleDeleteUser = async (userId, userName) => {
        if (!window.confirm(`Are you sure you want to delete ${userName}'s account? This action cannot be undone.`)) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${user.token}` // Send token in real app
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete user.');
            }

            // Remove the user from the local state
            setAllUsers(prevUsers => prevUsers.filter(u => u._id !== userId));
            alert(`${userName}'s account successfully deleted.`);

        } catch (error) {
            console.error('Error deleting user:', error);
            alert(`Error: ${error.message}`);
        }
    };

    // If user is not logged in or not admin, the useEffect will redirect before render
    if (!user || user.role !== 'admin') {
        return null; // Or a loading spinner, as redirect is happening
    }

    return (
        <div className="flex-1 overflow-auto relative z-10 p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>

                <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-800 rounded">
                    <h3 className="text-xl font-semibold mb-2">Welcome, {user.name} ({user.email})!</h3>
                    <p>You have full administrative privileges.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Quick Actions Card */}
                    <div className="bg-green-50 p-6 rounded-lg shadow">
                        <h4 className="text-lg font-semibold text-green-800 mb-3">Admin Actions</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/signup/admin"
                                    className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                                >
                                    Create New Admin Account
                                </Link>
                            </li>
                            {/* Add more general admin specific actions here */}
                        </ul>
                    </div>

                    {/* Asset Management Card (NEW SECTION) */}
                    <div className="bg-blue-50 p-6 rounded-lg shadow">
                        <h4 className="text-lg font-semibold text-blue-800 mb-3">Asset Management</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/assets" // Link to the asset list page
                                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                                >
                                    Asset List
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/upload-asset" // Link to the upload asset page
                                    className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                                >
                                    Upload Asset
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4">User Management</h3>

                {loadingUsers && <p className="text-center text-gray-600">Loading users...</p>}
                {errorUsers && <p className="text-center text-red-500">Error: {errorUsers}</p>}

                {!loadingUsers && !errorUsers && allUsers.length === 0 && (
                    <p className="text-center text-gray-600">No users found.</p>
                )}

                {!loadingUsers && !errorUsers && allUsers.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                            <thead>
                                <tr className="bg-gray-100 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                    <th className="py-3 px-4 border-b">Name</th>
                                    <th className="py-3 px-4 border-b">Email</th>
                                    <th className="py-3 px-4 border-b">Role</th>
                                    <th className="py-3 px-4 border-b">Suspended</th>
                                    <th className="py-3 px-4 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUsers.map((u) => (
                                    <tr key={u._id} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="py-3 px-4 text-sm text-gray-700">{u.name}</td>
                                        <td className="py-3 px-4 text-sm text-gray-700">{u.email}</td>
                                        <td className="py-3 px-4 text-sm text-gray-700">{u.role}</td>
                                        <td className="py-3 px-4 text-sm text-gray-700">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${u.suspended ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                                {u.suspended ? 'Yes' : 'No'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-700 space-x-2">
                                            {u.suspended ? (
                                                <button
                                                    onClick={() => handleSuspendUnsuspend(u._id, false)}
                                                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-xs"
                                                >
                                                    Unsuspend
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleSuspendUnsuspend(u._id, true)}
                                                    className="bg-orange-500 hover:bg-orange-600 text-white py-1 px-3 rounded text-xs"
                                                >
                                                    Suspend
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDeleteUser(u._id, u.name)}
                                                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-xs"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;