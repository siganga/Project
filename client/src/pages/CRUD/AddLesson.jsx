import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const AddLesson = () => {
    const { unitId } = useParams();
    const [lessons, setLessons] = useState([]);
    const [newLessonTitle, setNewLessonTitle] = useState('');
    const [unitTitle, setUnitTitle] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate


    useEffect(() => {
        fetch(`http://localhost:5000/api/lessons/unit/${unitId}`)
            .then(res => res.json())
            .then(data => setLessons(data));

        fetch(`http://localhost:5000/api/units/${unitId}`)
            .then(res => res.json())
            .then(unitData => setUnitTitle(unitData.title));
    }, [unitId]);

    const handleAddLesson = () => {
        fetch('http://localhost:5000/api/lessons', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newLessonTitle, unitId })
        })
            .then(res => res.json())
            .then(newLesson => setLessons([...lessons, newLesson]));
        setNewLessonTitle("");
    };

    const handleDeleteLesson = (id) => {
        fetch(`http://localhost:5000/api/lessons/${id}`, { method: 'DELETE' })
            .then(() => setLessons(lessons.filter(lesson => lesson._id !== id)));
    };

    const handleBack = () => {
        navigate(-1); // Navigate back one page in history
    };


    return (
        <div className="flex-1 overflow-auto relative z-10 p-6">
            <div className="mb-4">
                  <h1 className="text-2xl font-semibold mb-2"> Unit: {unitTitle} </h1>
                <h1 className="text-2xl font-semibold mb-2">Lessons</h1>
                
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={newLessonTitle}
                        onChange={e => setNewLessonTitle(e.target.value)}
                        placeholder="Lesson Title"
                        className="border rounded p-2 flex-grow"
                    />
                    <button
                        onClick={handleAddLesson}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Lesson
                    </button>
                </div>
            </div>

            <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">Lessons</h2>
                {lessons.length > 0 ? (
                    <ul className="space-y-2">
                        {lessons.map(lesson => (
                            <li
                                key={lesson._id}
                                className="border rounded p-3 flex items-center justify-between"
                            >
                                <span>{lesson.title}</span>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleDeleteLesson(lesson._id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                                    >
                                        Delete
                                    </button>
                                    <Link to={`/add-question/${lesson._id}`}>
                                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm">
                                            Add Question
                                        </button>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No lessons available.</p>
                )}
            </div>

            <div className="mt-4">
                 <button
                    onClick={handleBack} // Use the handleBack function
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default AddLesson;