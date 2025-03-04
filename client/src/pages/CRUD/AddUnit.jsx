import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const AddUnit = () => {
    const [units, setUnits] = useState([]);
    const [newUnitTitle, setNewUnitTitle] = useState('');
    const { classroomId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/api/units?classroom=${classroomId}`)
            .then(res => res.json())
            .then(data => setUnits(data));
    }, [classroomId]);

    const handleAddUnit = () => {
        fetch('http://localhost:5000/api/units', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newUnitTitle, classroomId: classroomId })
        })
            .then(res => res.json())
            .then(newUnit => setUnits([...units, newUnit]));
        setNewUnitTitle('');
    };

    const handleDeleteUnit = (id) => {
        fetch(`http://localhost:5000/api/units/${id}`, { method: 'DELETE' })
            .then(() => setUnits(units.filter(unit => unit._id !== id)));
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="flex-1 overflow-auto relative z-10 p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Units (Classroom: {classroomId})</h1>
                
            </div>
            <div className="mb-4">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={newUnitTitle}
                        onChange={e => setNewUnitTitle(e.target.value)}
                        placeholder="Unit Title"
                        className="border rounded p-2 flex-grow"
                    />
                    <button
                        onClick={handleAddUnit}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Unit
                    </button>
                </div>
            </div>

            <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">Units</h2>
                {units.length > 0 ? (
                    <ul className="space-y-2">
                        {units.map(unit => (
                            <li
                                key={unit._id}
                                className="border rounded p-3 flex items-center justify-between"
                            >
                                <span>{unit.title}</span>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleDeleteUnit(unit._id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                                    >
                                        Delete
                                    </button>
                                    <Link to={`/add-lesson/${unit._id}`}>
                                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm">
                                            Add Lesson
                                        </button>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No units available.</p>
                )}
            </div>
            <button
                    onClick={handleBack}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4  mt-4 rounded"
                >
                    Back
                </button>
        </div>
    );
};

export default AddUnit;