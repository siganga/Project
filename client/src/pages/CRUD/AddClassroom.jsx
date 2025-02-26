import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const AddClassroom = () => {
    const [classrooms, setClassrooms] = useState([]);
    const [newClassroomTitle, setNewClassroomTitle] = useState('');



     const user = useSelector((state) => state.auth.user) || "";
     const userId = user ? user.userId: null;

    useEffect(() => {
        if (userId) { // Only fetch if userId is available
            fetch(`http://localhost:5000/api/classrooms?userId=${userId}`, { // Send userId as a query parameter
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

        fetch(`http://localhost:5000/api/classrooms?userId=${userId}`, { // Include userId in the URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ title: newClassroomTitle })
        })
        .then(res => res.json())
        .then(newClassroom => setClassrooms([...classrooms, newClassroom]));

        setNewClassroomTitle('')
    };

   const handleDeleteClassroom = (id) => {
        if (!userId) {
            console.error("User ID not available.");
            return;
        }

        fetch(`http://localhost:5000/api/classrooms/${id}?userId=${userId}`, { // Include userId in the URL
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(() => setClassrooms(classrooms.filter(classroom => classroom._id !== id)));
    };

    return (
        <div className='flex-1 overflow-auto relative z-10'>
        <div> {userId} </div>
            <p>Classrooms Page</p>

            <input type="text" value={newClassroomTitle} onChange={e => setNewClassroomTitle(e.target.value)} />
            <button onClick={handleAddClassroom}>Add Classroom</button>


            <h2>Classrooms</h2>
            {classrooms.length > 0 ? ( // Check if classrooms array is not empty
                <ul>
                    {classrooms.map(classroom => (
                        <li key={classroom._id}>
                            {classroom.title}
                            <button onClick={() => handleDeleteClassroom(classroom._id)}>Delete</button>
                            <Link to={`/add-unit/${classroom._id}`}> <button>Add Unit</button></Link>
                            <Link to={`/classrooms/${classroom._id}/share`}> <button>Share</button> </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No classrooms available.</p> // Render this if classrooms array is empty
            )}
        </div>
    );
};

export default AddClassroom;