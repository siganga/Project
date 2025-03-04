import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

const ClassroomPage = () => {
    const [classrooms, setClassrooms] = useState([]);
    const user = useSelector((state) => state.auth.user) || "";
    const userId = user ? user.userId : null;

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:5000/api/classrooms?userId=${userId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(data => setClassrooms(data));
        }
    }, [userId]);

    
   

    return (
        <div className="flex-1 overflow-auto relative z-10 p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-semibold mb-2">Classrooms</h1>
                
            </div>

            <div className="mt-4">
                {classrooms.length > 0 ? (
                    <ul className="space-y-2">
                        {classrooms.map(classroom => (
                            <li
                                key={classroom._id}
                                className="border rounded p-3 flex items-center justify-between"
                            >
                                <span>{classroom.title}</span>
                                <div className="flex space-x-2">
                                   
                                    <Link to={`/unit/${classroom._id}`}>
                                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm">
                                             Units
                                        </button>
                                    </Link>
                                    <Link to={`/classrooms/${classroom._id}/share`}>
                                        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded text-sm">
                                            Share
                                        </button>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No classrooms available.</p>
                )}
            </div>
        </div>
    );
};

export default ClassroomPage;