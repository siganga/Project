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
                setEmail(''); // Clear the input after successful share
                // Refetch shared users to update the list
                const sharedUsersResponse = await fetch(`http://localhost:5000/api/classrooms/${id}/sharedUsers?userId=${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if(sharedUsersResponse.ok){
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

    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <h2>Share Classroom</h2>
            <input
                type="email"
                placeholder="Enter user's email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleShare}>Share</button>

            <h3>Shared With:</h3>
            <ul>
                {sharedUsers.map((user) => (
                    <li key={user._id}>{user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default ShareClassroomPage;