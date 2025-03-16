import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
//////////////////

const ClassroomUsersPage = () => {
    const { id } = useParams();
    const [sharedUsers, setSharedUsers] = useState([]);
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const userId = user ? user.userId : null;

     const [owner, setOwner] = useState([]);

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



         const fetchOwner = async () => {
            if (!userId) return;

            try {
                const response = await fetch(`http://localhost:5000/api/classrooms/${id}/owner?userId=${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setOwner(data);
                } else {
                    console.error('Failed to fetch shared users.');
                }
            } catch (error) {
                console.error('Error fetching shared users:', error);
            }
        };

        fetchSharedUsers();


   fetchOwner();



    }, [id, userId]);





    
    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="flex-1 overflow-auto relative z-10 p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Classroom Members</h2>
                <button
                    onClick={handleBack}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                    Back
                </button>
            </div>
          


          <div>
                <h3 className="text-lg font-semibold mb-2">Owner:</h3>
                {owner ? (
                    <p className="border rounded p-3">{owner.email}</p>
                ) : (
                    <p className="text-gray-500">Loading owner...</p>
                )}
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

export default ClassroomUsersPage