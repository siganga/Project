import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const LessonPage = () => {
    const { unitId } = useParams();
    const [lessons, setLessons] = useState([]);
  
    const [unitTitle, setUnitTitle] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/api/lessons/unit/${unitId}`)
            .then(res => res.json())
            .then(data => setLessons(data));

        fetch(`http://localhost:5000/api/units/${unitId}`)
            .then(res => res.json())
            .then(unitData => setUnitTitle(unitData.title));
    }, [unitId]);

   const handleBack = () => {
        navigate(-1); // Navigate back one page in history
    };

    
    return (
        <div className="flex-1 overflow-auto relative z-10 p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-semibold mb-2"> Unit: {unitTitle} </h1>
                <h1 className="text-2xl font-semibold mb-2">Lessons</h1>
                
            </div>

            <div className="mt-4">
                {/*<h2 className="text-lg font-semibold mb-2">Lessons</h2>*/}
                {lessons.length > 0 ? (
                    <ul className="space-y-2">
                        {lessons.map(lesson => (
                            <li
                                key={lesson._id}
                                className="border rounded p-3 flex items-center justify-between"
                            >
                                <span>{lesson.title}</span>
                                <div className="flex space-x-2">
                                   
                                    <Link to={`/ans-questions/${lesson._id}`}>
                                        <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded text-sm">
                                            Start
                                        </button>
                                    </Link>
                                    
                                    <Link to={`/scores/${lesson._id}`}>
                                        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded text-sm">
                                            Leaderboard
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

export default LessonPage;