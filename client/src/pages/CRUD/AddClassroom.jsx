import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "../../components/common/Header";

const AddClassroom = () => {
    const [classrooms, setClassrooms] = useState([]);
    const [newClassroomTitle, setNewClassroomTitle] = useState('');


    const userId = user ? user.userId: null;


    useEffect(() => {
        fetch('http://localhost:5000/api/classrooms')
            .then(res => res.json())
            .then(data => setClassrooms(data));
    }, []);

    const handleAddClassroom = () => {
        fetch('http://localhost:5000/api/classrooms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newClassroomTitle })
        })
            .then(res => res.json())
            .then(newClassroom => setClassrooms([...classrooms, newClassroom]));
    };

    const handleDeleteClassroom = (id) => {
        fetch(`http://localhost:5000/api/classrooms/${id}`, { method: 'DELETE' })
            .then(() => setClassrooms(classrooms.filter(classroom => classroom._id !== id)));
    };

    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <Header title=' Add Classrooms Page' />
            
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