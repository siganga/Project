import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AddClassroom = () => {
    const [classrooms, setClassrooms] = useState([]);
    const [newClassroomTitle, setNewClassroomTitle] = useState('');
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

    const handleAddClassroom = () => {
        if (!userId) {
            console.error("User ID not available.");
            return;
        }

        fetch(`http://localhost:5000/api/classrooms?userId=${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ title: newClassroomTitle })
        })
        .then(res => res.json())
        .then(newClassroom => setClassrooms([...classrooms, newClassroom]));

        setNewClassroomTitle('');
    };

    const handleDeleteClassroom = (id) => {
        if (!userId) {
            console.error("User ID not available.");
            return;
        }

        fetch(`http://localhost:5000/api/classrooms/${id}?userId=${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(() => setClassrooms(classrooms.filter(classroom => classroom._id !== id)));
    };

    return (
        <div className="flex-1 overflow-auto relative z-10 p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-semibold mb-2">Classrooms</h1>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={newClassroomTitle}
                        onChange={e => setNewClassroomTitle(e.target.value)}
                        placeholder="Classroom Title"
                        className="border rounded p-2 flex-grow"
                    />
                    <button
                        onClick={handleAddClassroom}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Classroom
                    </button>
                </div>
            </div>

            <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">Classrooms</h2>
                {classrooms.length > 0 ? (
                    <ul className="space-y-2">
                        {classrooms.map(classroom => (
                            <li
                                key={classroom._id}
                                className="border rounded p-3 flex items-center justify-between"
                            >
                                <span>{classroom.title}</span>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleDeleteClassroom(classroom._id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                                    >
                                        Delete
                                    </button>
                                    <Link to={`/add-unit/${classroom._id}`}>
                                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm">
                                            Add Unit
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

export default AddClassroom;