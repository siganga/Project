import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

const ShareClassroomPage = () => {
    const { id } = useParams(); // Get classroom ID from URL
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const userId = user ? user.userId : null;


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
                navigate('/classrooms');
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
        <div  className='flex-1 overflow-auto relative z-10'>
            <h2>Share Classroom</h2>
            <input
                type="email"
                placeholder="Enter user's email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleShare}>Share</button>
        </div>
    );
};

export default ShareClassroomPage;