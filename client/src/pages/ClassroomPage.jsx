import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "../components/common/Header";

const ClassroomPage = () => {
    const [classrooms, setClassrooms] = useState([]);
    const [newClassroomTitle, setNewClassroomTitle] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/classrooms') // Fetch classrooms
            .then(res => res.json())
            .then(data => setClassrooms(data));
    }, []);

    const handleAddClassroom = () => {
        fetch('http://localhost:5000/api/classrooms', { // Create a new classroom
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newClassroomTitle })
        })
            .then(res => res.json())
            .then(newClassroom => setClassrooms([...classrooms, newClassroom]));
    };

    const handleDeleteClassroom = (id) => {
        fetch(`http://localhost:5000/api/classrooms/${id}`, { method: 'DELETE' }) // Delete a classroom
            .then(() => setClassrooms(classrooms.filter(classroom => classroom._id !== id)));
    };

    //<Header title='Classrooms Page' />

    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <Header  />
            <p>Classrooms Page</p>

            <input type="text" value={newClassroomTitle} onChange={e => setNewClassroomTitle(e.target.value)} />
            <button onClick={handleAddClassroom}>Add Classroom</button>

            <h2>Classrooms</h2>
            <ul>
                {classrooms.map(classroom => (
                    <li key={classroom._id}>
                        {classroom.title}
                        <button onClick={() => handleDeleteClassroom(classroom._id)}>Delete</button>
                        <Link to={`/unit/${classroom._id}`}> <button>Add Unit</button></Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClassroomPage;