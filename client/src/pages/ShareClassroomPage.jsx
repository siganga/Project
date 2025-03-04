import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ShareClassroomPage = () => {
    const { id } = useParams();
    const [email, setEmail] = useState('');
    const [sharedUsers, setSharedUsers] = useState([]);
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const userId = user ? user.userId : null;

    useEffect(() => {
        const fetchSharedUsers = async () => {
            if (!userId) return;

            try {
                const response = await fetch(`http://localhost:5000/api/classrooms/${id}/sharedUsers?userId=${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setSharedUsers(data);
                } else {
                    console.error('Failed to fetch shared users.');
                }
            } catch (error) {
                console.error('Error fetching shared users:', error);
            }
        };

        fetchSharedUsers();
    }, [id, userId]);

    const handleShare = async () => {
        if (!userId) {
            console.error("User ID not available.");
            alert("User ID not available. Please log in.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/classrooms/${id}/share?userId=${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                alert('Classroom shared successfully!');
                setEmail('');
                const sharedUsersResponse = await fetch(`http://localhost:5000/api/classrooms/${id}/sharedUsers?userId=${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (sharedUsersResponse.ok) {
                    const newData = await sharedUsersResponse.json();
                    setSharedUsers(newData);
                }
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Failed to share classroom'}`);
            }
        } catch (error) {
            console.error('Error sharing classroom:', error);
            alert('An error occurred while sharing the classroom.');
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="flex-1 overflow-auto relative z-10 p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Share Classroom</h2>
                <button
                    onClick={handleBack}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                    Back
                </button>
            </div>
            <div className="mb-4">
                <input
                    type="email"
                    placeholder="Enter user's email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded p-2 w-full"
                />
                <button
                    onClick={handleShare}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-2"
                >
                    Share
                </button>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Shared With:</h3>
                {sharedUsers.length > 0 ? (
                    <ul className="space-y-2">
                        {sharedUsers.map((user) => (
                            <li key={user._id} className="border rounded p-3">
                                {user.email}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No users shared yet.</p>
                )}
            </div>
        </div>
    );
};

export default ShareClassroomPage;