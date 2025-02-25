import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const AddUnit = () => {
    const [units, setUnits] = useState([]);
    const [newUnitTitle, setNewUnitTitle] = useState('');
    const { classroomId } = useParams(); // Get classroomId from URL parameters

    useEffect(() => {
        // Fetch units for the specific classroom
        fetch(`http://localhost:5000/api/units?classroom=${classroomId}`)
            .then(res => res.json())
            .then(data => setUnits(data));
    }, [classroomId]); // Re-fetch when classroomId changes

    const handleAddUnit = () => {
        // Send classroomId when creating a unit
        fetch('http://localhost:5000/api/units', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newUnitTitle, classroomId: classroomId })
        })
            .then(res => res.json())
            .then(newUnit => setUnits([...units, newUnit]));
    };

    const handleDeleteUnit = (id) => {
        fetch(`http://localhost:5000/api/units/${id}`, { method: 'DELETE' })
            .then(() => setUnits(units.filter(unit => unit._id !== id)));
    };

    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <p>Units Page (Classroom: {classroomId})</p>

            <input type="text" value={newUnitTitle} onChange={e => setNewUnitTitle(e.target.value)} />
            <button onClick={handleAddUnit}>Add Unit</button>

            <h2>Units</h2>
            <ul>
                {units.map(unit => (
                    <li key={unit._id}>
                        {unit.title}
                        <button onClick={() => handleDeleteUnit(unit._id)}>Delete</button>
                        <Link to={`/add-lesson/${unit._id}`}> <button>Add Lesson</button></Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddUnit;